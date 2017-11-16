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
  FlatList,
  Alert,
  ScrollView
} from 'react-native';

import Chore from './Chore.js';
// import ChoreList from './ChoreList.js';

var BASEURL = 'https://housemom-api.herokuapp.com/'//'https://8677390d.ngrok.io/';



class Dashboard extends Component {
  constructor(props){
    super(props);
    this.navigate = this.navigate.bind(this);
    this.homePage = this.homePage.bind(this);
    this.state = {
      editMode: false,
      users: [],
      modalVisible: false,
      myHouse: null
    };
    //this.getUsersChores();
    this.getHousemates = this.getHousemates.bind(this);
  }

  componentWillMount(){
    console.log("heyyy");
    this.getHousemates();
  }

  navigate(route, props){
    this.props.navigator.push({
      name: route,
      passProps: {
        name: props
      }
    })
  }
  homePage(){
    this.props.navigator.pop()
  }

// getUsersChores() {
//     return fetch('https://housemom-api.herokuapp.com/users')
//       .then((response) => response.json())
//       .then((responseJson) => {
//         this.setState({users: responseJson})})
//       .catch((error) => {
//         console.error(error);
//       });
//   }

getHousemates() {
  console.log("getHousemates function");
  var myUsername = this.props['name'];
  var myData;
  console.log("My username is " + myUsername);
  console.log("First let's find my house");
  var url = BASEURL + 'user/' + myUsername;
  this.setState({myHouse: null, users: []});
  fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("My response to user is ")
      console.log(responseJson)
      if (responseJson['error'] != 'None'){
        Alert.alert("Faulty Username provided. Redirecting to Login.");
        this.homePage();
      }
      else{
        myData = responseJson['success']
        console.log("My data is;");
        console.log(myData);
        if (myData['Houses'].length == 0){
          this.navigate('createHouse', myData['Username']);
        }
        else{
          // console.log(this.props)
          console.log("getting housemates")
          var name = this.props.name;
          console.log("My house name is ");
          console.log(myData['Houses'][0]);
          var url = BASEURL + 'house/' + myData['Houses'][0];
          console.log("Pinging url: " + url);
            return fetch(url)
              .then((response) => response.json())
              .then((responseJson) => {
                console.log("My house is ");
                console.log(responseJson);
                console.log('got response');
                if (responseJson['error'] != 'None'){
                  Alert.alert(responseJson['error']);
                }
                else{
                  this.setState({myHouse: responseJson, users: responseJson['successUsers']});
                  console.log("The state.users is ");
                  console.log(this.state.users);
                }
              })
              .catch((error) => {
                console.error(error);
              });
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  toggleEdit(editing) {
    this.setState({editMode: !editing});
  }

  LogOut(){
    var url = BASEURL + 'logout/' + this.props['name'];
    console.log("Pinging url: " + url);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("At least went into the response");
        if (responseJson['error'] != 'None'){
          Alert.alert(responseJson['error']);
        }
        else{
          console.log("Logged Out successfully");
          this.props.navigator.pop()
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    // console.log(this.state.users);
    console.log(this.props)
    const editMode = this.state.editMode;

    let choreList = null;
    
    if (editMode) {
      choreList = 
                    <FlatList style={styles.choreList}
                      keyExtractor={(item, index) => index}
                      data={this.state.users}
                      renderItem={({item}) => <Chore house={this.state.myHouse} housemate={item["First Name"]} username={item["Username"]} title={item["myChore"]} edit={this.state.editMode} reload={this.getHousemates} navigator={this.props.navigator}></Chore>}
                    ></FlatList>
    } else if (this.state.myHouse != null){

      choreList =

                    <FlatList
                      keyExtractor={(item, index) => index}
                      data={this.state.users}
                      renderItem={({item}) => <Chore house={this.state.myHouse} housemate={item["First Name"]} username={item["Username"]} title={item["myChore"]} edit={this.state.editMode} reload={this.getHousemates} navigator={this.props.navigator}
                      ></Chore>}
                    ></FlatList>
;
    }
    else{
      return(<View><Text> Loading... </Text></View>);
    }

    var editButtonText = editMode ? "Done" : "Edit";

    console.log("this.state.users before render is ");
    console.log(this.state.users);
    if(this.state.users.length == 0){
      return(<View><Text> Loading... </Text></View>);
    }
    else{
    return(
        <View style={styles.container}>
          <Text style={styles.headerText}>{this.state.myHouse['successName']}</Text>
          <Text style={styles.subHeaderText}>Chore Chart</Text>
          <View style={styles.scroll}>
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
                <TouchableOpacity onPress={()=>{this.LogOut()}} style={styles.button}>
                  <Text style={styles.buttonText}>
                    Log Out
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
    alignContent: 'space-between',
    backgroundColor: 'white',
  },
  scroll: {
    marginBottom:90,
    top:20,
    flex:1,
  },
  choreList: {
    //paddingBottom: 50,
    //height: 480,
    //flexGrow: 0
  },
  headerText: {
    fontSize: 40,
    color: 'black',
    marginTop: 20
  },
  subHeaderText: {
    fontSize: 32,
    color: 'black',
    marginTop: 0
  },
  button: {
    marginRight:20,
    marginLeft:20,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#68a0cf',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
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
    bottom: 20,
    left: 4,
    right: 4,
    marginTop:20
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default Dashboard