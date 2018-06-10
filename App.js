/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ListView
} from 'react-native';

import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem, Rows } from 'native-base';

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCMIMeI5KzNVLr7zQYlaIZYudhChiW4uU0",
  authDomain: "hesapci-6e9c0.firebaseapp.com",
  databaseURL: "https://hesapci-6e9c0.firebaseio.com",
  projectId: "hesapci-6e9c0",
  storageBucket: "hesapci-6e9c0.appspot.com",
  messagingSenderId: "353952758700"
};

firebase.initializeApp(firebaseConfig);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listViewData: [],
      newContact: '',
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  componentDidMount() {
    var that = this;

    firebase.database().ref('/contacts').on('child_added', function(data) {
      
      var newData = [...that.state.listViewData]
      newData.push(data);
      that.setState({listViewData: newData});
    })
  }

  addRow(data) {
    if (data !=='') {
      var key = firebase.database().ref('/contacts').push().key;
      firebase.database().ref('/contacts').child(key).set({name: data})
    }
    this.setState({newContact : ''})
  }

  async deleteRow(secId, rowId, rowMap, data) {
    await firebase.database().ref('contacts/'+data.key).set(null);
    
    rowMap[`${secId}${rowId}`].props.closeRow();
    var newData = [...this.state.listViewData];
    newData.splice(rowId,1);
    this.setState({ listViewData: newData});
  }

  showInformation() {

  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{marginTop: StatusBar.currentHeight}}>
          <Content>
            <Item style={{marginTop: 2}}>
              <Input
                onChangeText={(newContact)=>this.setState({newContact})}
                placeholder="Add name"
                value={this.state.newContact}
                />
              <Button onPress={() => this.addRow(this.state.newContact)}>
                <Icon name="add" />
              </Button>
            </Item>
          </Content>
        </Header>

        <Content>
          <List 
            enableEmptySections
            dataSource={this.state.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
                <ListItem>
                  <Text> {data.val().name}</Text>
                </ListItem>
            }
            renderLeftHiddenRow={data =>
              <Button full onPress={() => this.addRow(data)}>
                <Icon name='information-circle' />
              </Button>
            }
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={()=>this.deleteRow(secId, rowId, rowMap, data)}>
                <Icon name="trash" />
              </Button>
            }

            leftOpenValue={-75}
            rightOpenValue={-75}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
