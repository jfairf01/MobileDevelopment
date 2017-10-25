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
  TouchableHighlight,
  Modal,
  FlatList,
  Switch, //change to checkbox if you can update react-native to .49
} from 'react-native';

class Chore extends Component {
  constructor(props){
    super(props);
    this.navigate = this.navigate.bind(this);
    this.state = {
      checked: false,
      modalVisible: false,
      chores: []
    };
  }

  componentWillMount(){
    console.log("getting chores");
    this.getChores();
  }

  navigate(route){
    this.state.volume = 0;
    this.props.navigator.push({
      name: 'chorepicker'
    })
  }

  getChores() {
    return fetch('https://housemom-api.herokuapp.com/chores')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({chores: responseJson});
      })
      .catch((error) => {
        console.error(error);
      });
  }


  render() {

    nudgeButton = <TouchableOpacity onPress={()=>{alert("nudged!")}} style={styles.button}>
                <Text style={styles.buttonText}>
                  Nudge
                </Text>
              </TouchableOpacity>;

    changeButton = <TouchableOpacity onPress={() => {this.setState({modalVisible: true})}} style={styles.button}>
                <Text style={styles.buttonText}>
                  Change
                </Text>
              </TouchableOpacity>;

    sideButton = this.props.edit ? changeButton : nudgeButton;

    return(
      <View style={styles.choreRow}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <FlatList style={styles.choreList}
              keyExtractor={(item, index) => index}
              data={this.state.chores}
              renderItem={({item}) =>  <Text style={styles.choreItem}>{item}</Text>}
            ></FlatList>

            <TouchableOpacity onPress={() => {this.setState({modalVisible: false})}} style={styles.button}>
                <Text style={styles.buttonText}>
                  Doner
                </Text>
              </TouchableOpacity>

          </View>
         </View>
        </Modal>

          <Switch onValueChange={(value)=>this.setState({checked: value})} value={this.state.checked} />
          <Text style={styles.choreName}>
            {this.props.housemate}
          </Text>
          <View style={styles.choreDetails}>
            <Text style={styles.choreTitle}>{this.props.title}</Text>
            <Text style={styles.choreDeadline}>{this.props.deadline}</Text>
          </View>
          {sideButton}
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
  choreItem: {
    fontWeight: 'bold',
    fontSize: 25,
    padding: 10,
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