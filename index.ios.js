/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK;

export default class HouseMom extends Component {

  // _handleLogin(){
  //   // Attempt a login using the Facebook login dialog asking for default permissions.
  //   LoginManager.logInWithReadPermissions(['public_profile']).then(
  //     function(result) {
  //       if (result.isCancelled) {
  //         alert('Login cancelled');
  //       } else {
  //         alert('Login success with permissions: '
  //           +result.grantedPermissions.toString());
  //       }
  //     },
  //     function(error) {
  //       alert('Login fail with error: ' + error);
  //     }
  //   );
  // }
  _funcTest(){
    alert("This works");
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
        <Text>
        Login With Facebook
        </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._funcTest}>
        <Text>
        Check Press Function
        </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('HouseMom', () => HouseMom);
