
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

var BASEURL = 'https://housemom-api.herokuapp.com/';

class NewUser extends Component {

	constructor(props) {
    	super(props);
	}
	render(){

	if(this.props.new_user){
      console.log("SHOW NEW INF")
    return (
      <View>
      <TextInput
          style={{height: 40, width: 200,borderColor: 'gray', borderWidth: 1, margin:10}}
          onChangeText={(first) => this.setState({first})}
          value={this.props.first}
        />
        <TextInput
          style={{height: 40, width: 200,borderColor: 'gray', borderWidth: 1, margin:10}}
          onChangeText={(last) => this.setState({last})}
          value={this.props.last}
        />
        </View>)
    }
    else
      return null;
}

}

export default NewUser