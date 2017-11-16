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

var BASEURL = 'https://housemom-api.herokuapp.com/';

//need to update this to get 'checked' value from db
class CreateHouse extends Component {
  constructor(props){
    super(props);
    this.state = {
      houseName:""
    };
    this.navigate = this.navigate.bind(this);
    this.joinHouse = this.joinHouse.bind(this);
    this.createHouse = this.createHouse.bind(this);
  }

  navigate(route, props){
    this.props.navigator.push({
      name: route,
      passProps: {
        name: props
      }
    })
  }


  joinHouse(){
    console.log("joinHouse Function");
    console.log(this.props.name);
    console.log(this.state.houseName)
    var url = BASEURL + 'new_house_user/' + this.props.name + "/" + this.state.houseName;
    console.log("Pinging url: " + url);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("error is " + responseJson['error']);
        if (responseJson['error'] != 'None'){
          Alert.alert(responseJson['error']);
        }
        else{
          this.navigate('dashboard', this.props.name);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  createHouse(){
    console.log("Going to create a house");
    console.log("Name should be " + this.props.name);
    // console.log("starting crash");
//     Crashlytics.setUserName('megaman');

// Crashlytics.setUserEmail('user@email.com');

// Crashlytics.setUserIdentifier('1234');

// Crashlytics.setBool('has_posted', true);

// Crashlytics.setString('organization', 'Acme. Corp');

// // Forces a native crash for testing
// Crashlytics.crash();

    console.log("House name is " + this.state.houseName);
    var url = BASEURL + 'new_house/'  + this.state.houseName + "/" + this.props.name;
    console.log("Pinging url: " + url);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("error is " + responseJson['error']);
        if (responseJson['error'] != 'None'){
          Alert.alert(responseJson['error']);
        }
        else{
          this.navigate('dashboard', this.props.name);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    console.log("CreateHouse render");
    console.log(this.props)
    return(
      <View>

        <TextInput placeholder = "Existing House Name" placeholderTextColor = "#808080" onChangeText={(houseName) => this.setState({houseName})}/>
        <Button title="Join House" onPress={this.joinHouse}>  </Button>
        <TextInput placeholder = "New House Name" placeholderTextColor = "#808080" onChangeText={(houseName) => this.setState({houseName})}/>
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
});

export default CreateHouse