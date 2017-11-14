import React, {
  Component
} from 'react';

import {
  AlertIOS, //unneeded?
  Alert,
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
} from 'react-native';

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

  navigate(route){
    this.props.navigator.push({
      name: route
    })
  }

  joinHouse(){
    console.log(this.props);
    var url = 'https://housemom-api.herokuapp.com/new_house/' + this.props.user + "/" + this.state.houseName;
    console.log("url:" + url);
    return fetch(url)
      .then((response) => {console.log(response);})
      .then(() => {
          //
      })
      .catch((error) => {
        console.error(error);
      });
  }
  createHouse(){
    console.log("starting crash");
    Crashlytics.setUserName('megaman');

Crashlytics.setUserEmail('user@email.com');

Crashlytics.setUserIdentifier('1234');

Crashlytics.setBool('has_posted', true);

Crashlytics.setString('organization', 'Acme. Corp');

// Forces a native crash for testing
Crashlytics.crash();

    console.log(this.state.houseName);
    var url = 'https://housemom-api.herokuapp.com/new_house/' + this.props.user + "/" + this.state.houseName;
    console.log("url:" + url);
    return fetch(url)
      .then((response) => {console.log(response);})
      .then(() => {
          //
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return(
      <View>

        <TextInput onChangeText={(houseName) => this.setState({houseName})}> Enter House Name to Join </TextInput>
        <Button title="Join House" onPress={this.joinHouse}>  </Button>
        <TextInput onChangeText={(houseName) => this.setState({houseName})}> Enter New House Name </TextInput>
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