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
} from 'react-native';

import Chore from './Chore.js'

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.navigate = this.navigate.bind(this);
    //this.getUsersChores=this.getUsersChores.bind(this);
    this.state = {
      usersChores: [],
      userA: {}
    };
    this.getUsersChores();
  }

  // componentWillMount(){
  //   console.log("heyyy");
  //   this.getUsersChores();
  // }

  // componentDidMount(){
  //   this.getUsersChores();
  // }

  navigate(route){
    this.props.navigator.push({
      name: route
    })
  }

getUsersChores() {
  //console.log('getting chores');
    return fetch('https://housemom-api.herokuapp.com/users')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({usersChores: responseJson.filter(function(user){
          return (user["Chores"].length > 0);
        }),
        userA: responseJson[0]})})
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    //console.log(this.state.usersChores);
    //console.log(this.state.userA);
    // if(this.state.usersChores.length == 0){
    //   return(<View><Text> test </Text></View>);
    // }
    // else{
    return(
      <View style={styles.container}>
        <View style={styles.choreList}>
          <Chore housemate={this.state.userA["First Name"]} title="Sweeping" deadline="Tuesday"> //use flatList or sectionList in the future?
          </Chore>
          <Chore housemate="Johnny" title="Bathroom" deadline="Thursday">
          </Chore>
          <Chore housemate="Sara" title="Kitchen" deadline="Thursday">
          </Chore>
        </View>
        <View style={styles.controls}>
            <View style={styles.resizeModeControl}>
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
//}
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
    marginBottom: 50,
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