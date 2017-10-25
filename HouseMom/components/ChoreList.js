import React, {
  Component
} from 'react';

import {
  AlertIOS, //unneeded?
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch, //change to checkbox if you can update react-native to .49
  FlatList,
} from 'react-native';

import Chore from './Chore.js'

class ChoreList extends Component {
  constructor(props){
    super(props);
    this.state = {
      usersChores: []
    };
  }

    componentWillMount(){
    console.log("heyyy");
    this.getUsersChores();
  }

  getUsersChores() {
    return fetch('https://housemom-api.herokuapp.com/users')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({usersChores: responseJson.filter(function(user){
          return (user["Chores"].length > 0);})})})
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return(
        <View>
          <FlatList
            keyExtractor={item => item["First Name"]}
            data={this.state.usersChores}
            renderItem={({item}) => <Chore housemate={item["First Name"]} title={item["Chores"][0]} deadline="Thursday"></Chore>}
          ></FlatList>
        </View>
      );
  }

}

export default ChoreList