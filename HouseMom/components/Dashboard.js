import React, {
  Component
} from 'react';

import {
  AlertIOS,
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  CheckBox,
  FlatList
} from 'react-native';

import Chore from './Chore.js';
import ChoreList from './ChoreList.js';
import ChorePicker from './ChorePicker.js'

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.navigate = this.navigate.bind(this);
    this.state = {
      editMode: false,
      users: [],
      modalVisible: false
    };
    //this.getUsersChores();
  }

  componentWillMount(){
    console.log("heyyy");
    this.getHousemates();
  }

  navigate(route){
    this.props.navigator.push({
      name: route
    })
  }

getUsersChores() {
    return fetch('https://housemom-api.herokuapp.com/users')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({users: responseJson})})
      .catch((error) => {
        console.error(error);
      });
  }

getHousemates() {
    return fetch('https://housemom-api.herokuapp.com/users')
      .then((response) => response.json())
      .then((responseJson) => {
        var housemates = responseJson.filter(function(user){
          return (user["Houses"][0] == "Burrow"); //change this to be dynamic
        });
        //var housemates = myhouse[0]["Inhabitants"];
        this.setState({users: housemates});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  toggleEdit(editing) {
    this.setState({editMode: !editing});
  }

  // .filter(function(user){
  //         return (user["Chores"].length > 0);
  //       })

  render() {
    console.log(this.state.users);

    const editMode = this.state.editMode;

    let choreList = null;
    
    if (editMode) {
      choreList = <View>
                    <FlatList style={styles.choreList}
                      keyExtractor={(item, index) => index}
                      data={this.state.users}
                      renderItem={({item}) => <Chore housemate={item["First Name"]} username={item["Username"]} title={item["Chores"][0]} deadline="Thursday" edit={this.state.editMode}></Chore>}
                    ></FlatList>
                  </View>;
    } else {

      const usersWithChores = this.state.users.filter(function(user){
          return (user["Chores"].length > 0);
        });

      choreList = <View>
                    <FlatList
                      keyExtractor={(item, index) => index}
                      data={this.state.users}
                      renderItem={({item}) => <Chore housemate={item["First Name"]} username={item["Username"]} title={item["Chores"][0]} deadline="Thursday" edit={this.state.editMode}></Chore>}
                    ></FlatList>
                  </View>;
    }

    var editButtonText = editMode ? "Done" : "Edit";

    if(this.state.users.length == 0){
      return(<View><Text> Loading... </Text></View>);
    }
    else{
    return(
      <View style={styles.container}>
        <ChorePicker modalVisible={this.state.modalVisible}></ChorePicker>
        <Text style={styles.headerText}>Chore Chart</Text>
        <View>
          {choreList}
        </View>
        <View style={styles.controls}>
            <View style={styles.resizeModeControl}>
            <TouchableOpacity onPress={()=>{this.toggleEdit(editMode)}} style={styles.button}>
                <Text style={styles.buttonText}>
                  {editButtonText}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{this.getHousemates()}} style={styles.button}>
                <Text style={styles.buttonText}>
                  Refresh
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{this.props.navigator.pop()}} style={styles.button}>
                <Text style={styles.buttonText}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  choreList: {
    paddingBottom: 50,
    height: 480,
    flexGrow: 0
  },
  headerText: {
    fontSize: 40,
    color: 'black',
    marginTop: 20
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
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    bottom: 44,
    left: 4,
    right: 4,
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default Dashboard