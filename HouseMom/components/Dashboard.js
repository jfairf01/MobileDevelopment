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
} from 'react-native';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.navigate = this.navigate.bind(this);
  }

  navigate(route){
    this.props.navigator.push({
      name: route
    })
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>
          This is the dashboard wooooooo
        </Text>
        <View style={styles.controls}>
            <View style={styles.resizeModeControl}>
              <TouchableOpacity onPress={()=>{this.props.navigator.pop()}} style={styles.button}>
                <Text style={styles.buttonText}>
                  Go Back
                </Text>
              </TouchableOpacity>
            </View>
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
  button: {
    marginRight:40,
    marginLeft:40,
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