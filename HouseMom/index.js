import React, {
  Component
} from 'react';

import {
  AlertIOS,
  AppRegistry,
  Platform,
  StyleSheet,
  Text
} from 'react-native';

import { Navigator } from 'react-native-deprecated-custom-components'


import Home from './components/Home'
import Dashboard from './components/Dashboard'
import CreateHouse from './components/CreateHouse'


class HouseMom extends Component {

  constructor() {
    super();

    //this.renderScene = this.renderScene.bind(this);
  }

  renderScene(route, navigator){
   // _navigator = navigator;
    switch(route.name){
      case 'homePage':
        return (<Home navigator={navigator} {...route.passProps} />);
      case 'dashboard':
        return (<Dashboard navigator={navigator} {...route.passProps} />);
      case 'createHouse':
        return (<CreateHouse navigator={navigator}  {...route.passProps}/>);

    }
  }


  render() {
    return(
      <Navigator
        initialRoute={{name: 'homePage'}}
        renderScene={this.renderScene}
      />

      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  }
});

AppRegistry.registerComponent('HouseMom', () => HouseMom);
