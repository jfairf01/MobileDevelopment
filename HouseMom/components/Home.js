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


var Fabric = require('react-native-fabric');

var { Crashlytics } = Fabric;

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
    this.SignUp = this.SignUp.bind(this);
    this.unsubscribe = null;
    this.state={
      user:null,
      email: "Email",
      password:"Password",
      showPword: false
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

  navigate(route){
    this.state.volume = 0;
    this.props.navigator.push({
      name: route
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
       // this.navigate('createHouse');
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
    var url = 'https://housemom-api.herokuapp.com/new_user/John/Doe' + user.user.email;
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
  SignUp(){

    // a block of code to cause a crash for crashlytics testing
    // console.log("starting crash");
    // Crashlytics.setUserName('megaman');
    // Crashlytics.setUserEmail('user@email.com');
    // Crashlytics.setUserIdentifier('1234');
    // Crashlytics.setBool('has_posted', true);
    // Crashlytics.setString('organization', 'Acme. Corp');
    // // Forces a native crash for testing
    // Crashlytics.crash();

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        console.log('user created', user)
        this.addNew(user);
      })
      .catch((err) => {
        Alert.alert("Sorry, your username or password is wrong.")
      });
  }
  LogIn(){
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((user) => {
        console.log('AN LOGGED IN', user)
        //this.navigate('dashboard')
      })
      .catch((err) => {
        Alert.alert("Sorry, your username or password is wrong.")
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

    renderCustomSkin() {
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
        {/*<View style={styles.fullScreen} onPress={() => {this.setState({paused: !this.state.paused})}}>
          <Video
            source={require('./Background.mp4')}
            style={styles.fullScreen}
            rate={this.state.rate}
            volume={this.state.volume}
            muted={this.state.muted}
            ignoreSilentSwitch={this.state.ignoreSilentSwitch}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onBuffer={this.onBuffer}
            onProgress={this.onProgress}
            repeat={true}
          />
        </View> */}

         <View style={styles.header}>
          <Text style={{marginLeft: 20, marginRight: 20, fontSize: 30, fontFamily: 'courier'}}>
            HouseMom
          </Text>
        </View>
        <View style={styles.logIn}>
        <TextInput
          style={{height: 40, width: 200,borderColor: 'gray', borderWidth: 1, margin:10}}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <TextInput   style={{height: 40, width: 200,borderColor: 'gray', borderWidth: 1, margin:10}}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
          <TouchableOpacity style={styles.authButtons} onPress={this.LogIn}>
            <Text style={{marginLeft: 20, marginRight: 20, color: 'white'}}>
              Login with Email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.authButtons} onPress={this.SignUp}>
            <Text style={{marginLeft: 20, marginRight: 20, color: 'white'}}>
              Sign Up with Email
            </Text>
          </TouchableOpacity>
        </View>
       {/*} <View style={styles.controls}>
          <View style={styles.generalControls}>
            <View style={styles.resizeModeControl}>
              <TouchableOpacity onPress={()=>{this.muteVolumeControl()}} style={styles.muteButton}>
                <Text style={{marginLeft: 20, marginRight: 20, color: 'white'}}>
                  Mute
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.resizeModeControl}>
              <TouchableOpacity onPress={()=>{this.unMuteVolumeControl()}} style={styles.muteButton}>
                <Text style={{marginLeft: 20, marginRight: 20, color: 'white'}}>
                  UnMute
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View> */}
      </View>




    );
  }



  render() {
    return this.renderCustomSkin();
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