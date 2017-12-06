import React, {
  Component
} from 'react';

import {
  AlertIOS, //unneeded?
  AppRegistry,
  Button,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  FlatList,
  Picker,
  TextInput,
  Switch, //change to checkbox if you can update react-native to .49
  Alert
} from 'react-native';

var BASEURL = 'https://housemom-api.herokuapp.com/'//'https://8677390d.ngrok.io/';
import { StackNavigator } from 'react-navigation'

//need to update this to get 'checked' value from db
class CreateHouse extends Component {
  constructor(props){
    super(props);
    this.state = {
      houseName:"", 
      passcode:""
    };
    //this.navigate = this.navigate.bind(this);
    this.navigate = this.props.navigation.navigate
    this.joinHouse = this.joinHouse.bind(this);
    this.createHouse = this.createHouse.bind(this);
    console.log("In constructor for CreateHouse")
  }

  // navigate(route, props){
  //   this.props.navigator.push({
  //     name: route,
  //     passProps: {
  //       name: props
  //     }
  //   })
  // }


  joinHouse(){
      var myUsername = this.props.navigation.state.params.username;
    var url = BASEURL + 'new_house_user';  
    var data_ = new FormData();
    data_.append('json', JSON.stringify({
            'houseName': this.state.houseName,
            'userName': myUsername,
            'housePassword': this.state.passcode,
    }));
    console.log(url)
    console.log(data_)
    console.log("Pinging url: " + url);
    return fetch(url, {
        method: 'POST',
        body: data_
      }) 
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("error is " + responseJson['error']);
        if (responseJson['error'] != 'None'){
          Alert.alert(responseJson['error']);
        }
        else{
          this.navigate('Dashboard', {'username':myUsername});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  createHouse(){
    // console.log("Going to create a house");
    // console.log("Name should be " + this.props.name);
    // console.log("starting crash");
//     Crashlytics.setUserName('megaman');

// Crashlytics.setUserEmail('user@email.com');

// Crashlytics.setUserIdentifier('1234');

// Crashlytics.setBool('has_posted', true);

// Crashlytics.setString('organization', 'Acme. Corp');

// // Forces a native crash for testing
// Crashlytics.crash();
    console.log(this.props)
    var myUsername = this.props.navigation.state.params.username;
    console.log()
    console.log("House name is " + this.state.houseName);
    var url = BASEURL + 'new_house';
    var data_ = new FormData();
    data_.append('json', JSON.stringify({
            'houseName': this.state.houseName,
            'userName': myUsername,
            'housePassword': this.state.passcode,
    }));

    console.log("Pinging url: " + url);
    return fetch(url, {
        method: 'POST',
        body: data_
      }) 
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("error is " + responseJson['error']);
        if (responseJson['error'] != 'None'){
          Alert.alert(responseJson['error']);
        }
        else{
          this.navigate('Dashboard', {'username':myUsername});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    // console.log("CreateHouse render");
    // console.log(this.props)
    return(
      <View>
        <Text style={styles.heading}> Either Join an Existing House </Text>
          <TextInput placeholder = "Existing House Name" placeholderTextColor = "#808080" onChangeText={(houseName) => this.setState({houseName})}/>
          <TextInput placeholder = "Passcode" placeholderTextColor = "#808080" onChangeText={(passcode) => this.setState({passcode})}/>
          <Button title="Join House" onPress={this.joinHouse}>  </Button>
        <Text style={styles.heading}> Or Create a New House </Text> 
          <TextInput placeholder = "New House Name" placeholderTextColor = "#808080" onChangeText={(houseName) => this.setState({houseName})}/>
          <TextInput placeholder = "Enter a Passcode for Your House" placeholderTextColor = "#808080" onChangeText={(passcode) => this.setState({passcode})}/>
          <Text style={{textAlign: 'center', marginLeft:5, marginRight:5}}> Give this passcode to your housemates so they can join your house! </Text>
          <Button title="Create House" onPress={this.createHouse}>  </Button>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  choreRow: {
    flex: 1,
    flexDirection: 'row',
    flexShrink: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    margin: 10,
  },
  choreName: {
    fontWeight: 'bold',
    fontSize: 25,
    padding: 10,
  },
  choreDetails: {
    flexDirection: 'column',
  },
  choreTitle: {
    fontSize: 20,
  },
  choreDeadline: {
    fontSize: 15,
  },
  choreItem: {
    fontWeight: 'bold',
    fontSize: 25,
    padding: 10,
  },
  button: {
    marginRight:20,
    marginLeft:20,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#68a0cf',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  buttonText: {
    marginLeft: 20, 
    marginRight: 20, 
    color: 'white'
  },
  heading:{
    textAlign: 'center',
    fontSize: 20,
    marginTop: 16
  }
});

export default CreateHouse