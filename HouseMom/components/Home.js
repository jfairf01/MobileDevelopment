import React, {
  Component
} from 'react';

import {
  AlertIOS,
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TextInput,
  Alert
} from 'react-native';

import { AccessToken, LoginManager } from 'react-native-fbsdk';

import Video from 'react-native-video';

import RNFirebase from 'react-native-firebase';

import CreateHouse from './CreateHouse';
// import NewUser from './newUser';

const configurationOptions = {
  debug: true
};

const firebase = RNFirebase.initializeApp(configurationOptions);


class Home extends Component {

  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onBuffer = this.onBuffer.bind(this);
    this.navigate = this.navigate.bind(this);
    this.LogIn = this.LogIn.bind(this);
    this.LogOut = this.LogOut.bind(this);
    this.setNew = this.setNew.bind(this);
    this.addNew = this.addNew.bind(this);
    this.unsubscribe = null;
    this.state={
      user:null,
      username: "Username",
      password:"Password",
      showPword: false,
      new_user: false, 
      first: "First Name",
      last: "Last Name"
    }
  }
  state = {
    rate: 1,
    volume: 0,
    muted: false,
    resizeMode: 'cover',
    duration: 0.0,
    currentTime: 0.0,
    controls: false,
    paused: true,
    skin: 'custom',
    ignoreSilentSwitch: null,
    isBuffering: false,
  };

  onLoad(data) {
    console.log('On load fired!');
    this.setState({duration: data.duration});
  }

  onProgress(data) {
    this.setState({currentTime: data.currentTime});
  }

  onBuffer({ isBuffering }: { isBuffering: boolean }) {
    this.setState({ isBuffering });
  }

  muteVolumeControl() {
    this.setState({volume: 0});
  }
  unMuteVolumeControl() {
    this.setState({volume: .15});
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


  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if(user){
        console.log('signed in', user);
         this.setState(previousState => {
                return { user: user,
                  email: user.email};
              });
        //this.navigate('dashboard')
       
      }

      else
        console.log('not')
    });    
}
  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  addNew(user){
    console.log(user);
    var data_ = new FormData();
    data_.append('json', JSON.stringify({
            'new_username': this.state.username,
            'new_password': this.state.password,
            'firstName': this.state.first,
            'lastName': this.state.last
    }));

    return fetch('https://housemom-api.herokuapp.com/new_user', {
      method: 'POST',
      body: data_
      }) 
      .then((response) => {console.log(response);})
      .then(() => {
          this.navigate('createHouse', this.state.username);
        // this.props.navigator.push({
        //   name: 'createHouse',
        //   passProps: {
        //     name:this.state.username
        //   }
        //})
        //  this.navigate('createHouse', { username:this.state.username });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  LogIn(){
    var url = 'https://housemom-api.herokuapp.com/login/' + 
     this.state.username + '/' + this.state.password
    console.log("url:" + url);
    return fetch(url)
      .then((response) => {console.log(response);})
      .then(() => {
        this.navigate('dashboard', this.state.username);
          
      })
      .catch((error) => {
        console.error(error);
      });
  }
  LogOut(){
     firebase.auth().signOut()
    .then(() => {
       this.setState(previousState => {
        return { user: null};
      });
      console.log('User signed out successfully');
    })
    .catch();
  }

  setNew(){
    console.log(this.state)
    if(this.state.new_user == false){
       this.setState(previousState => {
                return { new_user: true}});
    }
   
  }

  render() {
    newUser = null;
    if(this.state.new_user){
      console.log("SHOW NEW INF")
      newUser = <View>
      <TextInput
          style={{height: 40, width: 200,borderColor: 'gray', borderWidth: 1, margin:10}}
          onChangeText={(first) => this.setState({first})}
          value={this.state.first}
        />
        <TextInput
          style={{height: 40, width: 200,borderColor: 'gray', borderWidth: 1, margin:10}}
          onChangeText={(last) => this.setState({last})}
          value={this.state.last}
        />
        </View> }
      loginButton = this.state.new_user ?  
          <TouchableOpacity style={styles.authButtons} onPress={this.addNew}>
            <Text style={{marginLeft: 20, marginRight: 20, color: 'white'}}>
              Create Account
            </Text>
          </TouchableOpacity>
          : <TouchableOpacity style={styles.authButtons} onPress={this.LogIn}>
            <Text style={{marginLeft: 20, marginRight: 20, color: 'white'}}>
              Log In
            </Text>
          </TouchableOpacity>
          
    //return this.renderCustomSkin();
  if(this.state.user != null){
          return(
        <View>
          <CreateHouse user={this.state.email}/>

          <View style={{height:200}}>
             <Text style={styles.loggedIn}> You are logged in as {this.state.email}</Text>
            <TouchableOpacity style={styles.logOut} onPress={this.LogOut}>
              <Text style={{marginLeft: 20, marginRight: 20, color: 'white'}}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>)
      }
    return (
      <View style={styles.container}>
         <View style={styles.header}>

          <Text style={{marginLeft: 20, marginRight: 20, fontSize: 30, fontFamily: 'courier'}}>
            HouseMom
          </Text>
        </View>
        <View style={styles.logIn}>
        {newUser}
        <TextInput
          style={{height: 40, width: 200,borderColor: 'gray', borderWidth: 1, margin:10}}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />
        <TextInput   style={{height: 40, width: 200,borderColor: 'gray', borderWidth: 1, margin:10}}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
          {loginButton}
          <TouchableOpacity style={styles.authButtons} onPress={this.setNew}>
            <Text style={{marginLeft: 20, marginRight: 20, color: 'white'}}>
              New User? 
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );

   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  header: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    top: 44,
    left: 4,
    right: 4,
    alignItems: 'center',
  },
  logIn: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    top: 104,
    left: 4,
    right: 4,
    alignItems: 'center',
  },
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    bottom: 44,
    left: 4,
    right: 4,
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingBottom: 10,
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  nativeVideoControls: {
    top: 184,
    height: 300
  },
  muteButton: {
    marginRight:40,
    marginLeft:40,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#68a0cf',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  authButtons: {
    marginRight:40,
    marginLeft:40,
    marginTop:20,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#68a0cf',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  logOut: {
    top:50,
    marginRight:40,
    marginLeft:40,
    marginTop:20,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#68a0cf',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  loggedIn:{
    top:50,
    textAlign: 'center',
  }
});

export default Home