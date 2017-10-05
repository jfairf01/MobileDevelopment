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
} from 'react-native';

import Video from 'react-native-video';

class HouseMom extends Component {

  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onBuffer = this.onBuffer.bind(this);
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

  renderCustomSkin() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.fullScreen} onPress={() => {this.setState({paused: !this.state.paused})}}>
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
            onEnd={() => { AlertIOS.alert('Done!') }}
            repeat={true}
          />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={{marginLeft: 20, marginRight: 20, fontSize: 30, fontFamily: 'courier'}}>
            HouseMom
          </Text>
        </View>
        <View style={styles.logIn}>
          <TouchableOpacity style={styles.muteButton}>
            <Text style={{marginLeft: 20, marginRight: 20, color: 'white'}}>
              Login with Facebook
            </Text>
          </TouchableOpacity>
        </View>


        <View style={styles.controls}>
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
        </View>
      </View>
    );
  }




// Doesn't Apply yet.. eventually it will be the same as above (?) v
  // renderNativeSkin() {
  //   const videoStyle = this.state.skin == 'embed' ? styles.nativeVideoControls : styles.fullScreen;
  //   return (
  //     <View style={styles.container}>
  //       <View style={styles.fullScreen}>
  //         <Video
  //           source={require('./Background.mp4')}
  //           style={videoStyle}
  //           rate={this.state.rate}
  //           paused={this.state.paused}
  //           volume={this.state.volume}
  //           muted={this.state.muted}
  //           ignoreSilentSwitch={this.state.ignoreSilentSwitch}
  //           resizeMode={this.state.resizeMode}
  //           onLoad={this.onLoad}
  //           onBuffer={this.onBuffer}
  //           onProgress={this.onProgress}
  //           repeat={true}
  //           controls={this.state.controls}
  //         />
  //       </View>
  //       <View style={styles.header}>
  //         <Text>
  //           HouseMom
  //         </Text>
  //       </View>
  //       <View style={styles.controls}>
  //         <View style={styles.generalControls}>
  //           <View style={styles.resizeModeControl}>
  //             <TouchableOpacity onPress={()=>{this.muteVolumeControl()}} style={styles.muteButton}>
  //               <Text style={{backgroundColor: 'white'}}>
  //                 Mute
  //               </Text>
  //             </TouchableOpacity>
  //           </View>
  //           <View style={styles.resizeModeControl}>
  //             <TouchableOpacity onPress={()=>{this.unMuteVolumeControl()}} style={styles.muteButton}>
  //               <Text>
  //                 UnMute
  //               </Text>
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //       </View>

  //     </View>
  //   );
  // }

  render() {
    return this.state.controls ? this.renderNativeSkin() : this.renderCustomSkin();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
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
  }
});

AppRegistry.registerComponent('HouseMom', () => HouseMom);