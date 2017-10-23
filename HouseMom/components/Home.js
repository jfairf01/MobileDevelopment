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
      name: 'dashboard'
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
        this.navigate('dashboard')
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

  SignUp(){
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        console.log('user created', user)
       // this.navigate('dashboard')
      })
      .catch((err) => {
        Alert.alert("Sorry, your username or password is wrong.")
        console.error(err);
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
        console.error(err);
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
        <View style={styles.header}>
          <Text style={styles.loggedIn}> You are logged in as {this.state.email}</Text>
          <View style={{height:200}}>
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
    backgroundColor: 'orange',
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