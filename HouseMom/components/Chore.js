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
  Picker,
  TextInput,
  Switch, //change to checkbox if you can update react-native to .49
} from 'react-native';

class Chore extends Component {
  constructor(props){
    super(props);
    this.navigate = this.navigate.bind(this);
    this.state = {
      checked: false,
      modalVisible: false,
      chores: [],
      selectedChore: ''
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
    console.log("chores get");
    return fetch('https://housemom-api.herokuapp.com/chores')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({chores: responseJson, selectedChore: responseJson[0]});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setChore() {
    var url = 'https://housemom-api.herokuapp.com/new_user_chore/' + this.state.selectedChore + "/" + this.props.username;
    console.log("url:" + url);
    return fetch(url)
      .then((response) => {console.log(response);})
      .then(() => {
        //update the dash ??
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addChore(input) {
    var url = 'https://housemom-api.herokuapp.com/new_chore/' + input;
    console.log("url:" + url);
    return fetch(url)
      .then((response) => {console.log(response);})
      .then(() => {
        this.getChores();
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
            <Text>Choose from the list:</Text>
            <Picker
                   mode="dialog"
                   prompt="Pick a chore"
                   selectedValue={this.state.selectedChore}
                   onValueChange={(chore)=>{console.log("picked chore: " + chore); this.setState({selectedChore: chore})}}>
                   {this.state.chores.map((item, index) => {
                     return (<Picker.Item label={item} value={item} key={index}/>) 
                                    })}
            </Picker>
            <TouchableOpacity onPress={() => {this.setChore()}} style={styles.button}>
                <Text style={styles.buttonText}>
                  Assign
                </Text>
              </TouchableOpacity>

            <Text>Or add a chore:</Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            ></TextInput>
            <TouchableOpacity onPress={() => {this.addChore(this.state.text)}} style={styles.button}>
                <Text style={styles.buttonText}>
                  Add
                </Text>
              </TouchableOpacity>

            <TouchableOpacity onPress={() => {this.setState({modalVisible: false});}} style={styles.button}>
                <Text style={styles.buttonText}>
                  Done
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