import React, {
  Component
} from 'react';

import {
  AlertIOS, //unneeded?
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch, //change to checkbox if you can update react-native to .49
} from 'react-native';

class Chore extends Component {
  constructor(props){
    super(props);
    this.state = {checked: false};
  }

  render() {
    return(
      <View style={styles.choreRow}>
          <Switch onValueChange={(value)=>this.setState({checked: value})} value={this.state.checked} />
          <Text style={styles.choreName}>
            {this.props.housemate}
          </Text>
          <View style={styles.choreDetails}>
            <Text style={styles.choreTitle}>{this.props.title}</Text>
            <Text style={styles.choreDeadline}>{this.props.deadline}</Text>
          </View>
          <TouchableOpacity onPress={()=>{alert("nudged!")}} style={styles.button}>
                <Text style={styles.buttonText}>
                  Nudge
                </Text>
              </TouchableOpacity>
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

export default Chore