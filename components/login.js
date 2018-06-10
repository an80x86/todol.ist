import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ListView
} from 'react-native';

import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';

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


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      email: '',
      password: ''
    })
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        alert('Login olunmuş!\n' + user);
      }
    })
  }

  signUpUser = (email, password) => {
    try {
      if (this.state.password.length<6) {
        alert('Please enter at least 6 characters by password');
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email,password);
    }
    catch(error) {
      alert(error.toString());
    }
  }

  loginUser = (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
        alert(user);
      })
    }
    catch(error) {
      alert(error.toString());
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input 
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({email})}
            />
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(password) => this.setState({password})}
            />
          </Item>

          <Button style={{marginTop: 10}}
            full
            rounded
            success
            onPress={() => this.loginUser(this.state.email, this.state.password)}
          >
            <Text style={{ color: 'white'}}> Login</Text>
          </Button>

                    <Button style={{marginTop: 10}}
            full
            rounded
            primary
            onPress={() => this.signUpUser(this.state.email, this.state.password)}
          >
            <Text style={{ color: 'white'}}> Sing Up</Text>
          </Button>

        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default login;
