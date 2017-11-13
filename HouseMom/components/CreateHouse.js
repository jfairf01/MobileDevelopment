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

  navigate(route, props){
    //this.state.volume = 0;
    this.props.navigator.push({
      name: route,
      passProps: {
        name: props
      }
    })
  }


  joinHouse(){
    console.log(this.props.name);
    console.log(this.state.houseName)
    var url = 'https://housemom-api.herokuapp.com/new_house_user/' + this.props.name + "/" + this.state.houseName;
    console.log("url:" + url);
    return fetch(url)
      .then((response) => {console.log(response);})
      .then(() => {
         this.navigate('dashboard', this.props.name) 
      })
      .catch((error) => {
        console.error(error);
      });
  }
  createHouse(){
    console.log(this.state.houseName);
    var url = 'https://housemom-api.herokuapp.com/new_house/'  + this.state.houseName + "/" + this.props.name;
    console.log("url:" + url);
    return fetch(url)
      .then((response) => {console.log(response);})
      .then(() => {
          this.navigate('dashboard', this.props.name) 
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    console.log(this.props)
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