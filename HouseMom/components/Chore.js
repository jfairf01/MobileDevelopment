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
  Alert
} from 'react-native';

var BASEURL = 'https://8677390d.ngrok.io/';

//need to update this to get 'checked' value from db
class Chore extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: this.props.title,
      checked: false,
      modalVisible: false,
      chores: [],
      selectedChore: this.props.title,
      isLoading: true,
      choreList: [],
      firstLoad: true
    };
    // this.getChores();
  }

  componentWillMount(){
    console.log("getting chores from componentWillMount");
    this.getChores();
    console.log("chores are");
    console.log(this.state.chores);
  }



  getChores() {
    console.log('GETTING CHORES')
    console.log(this.props.house)
    this.setState({chores: this.props.house.houseChores, isLoading: false, firstLoad:true, choreList:[]})
    // console.log("in getChores");
    // var url = BASEURL + 'chores';
    // console.log("Pinging url: " + url);
    // return fetch(url)
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log("Response from getChores");
    //     console.log(responseJson);
    //     if (responseJson['error'] != 'None'){
    //       Alert.alert(responseJson['error']);
    //     }
    //     else{
    //       this.setState({chores: responseJson['success'], isLoading: false});
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }

  setChore() {
    console.log("in setChore");
    this.setState({title: this.state.selectedChore});
    console.log(this.props);
    var url = BASEURL + 'new_user_chore/' + this.state.selectedChore + "/" + this.props.username;
    console.log("Pinging url: " + url);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson['error'] != 'None'){
          Alert.alert(responseJson['error']);
        }
        else{
          this.props.reload();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addChore(input) {
    console.log("in addChore");
    var url = BASEURL + 'new_chore/' + input + '/' + this.props.username;
    console.log("Pinging url: " + url);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson['error'] != 'None'){
          Alert.alert(responseJson['error']);
        }
        else{
          this.props.reload();
          this.getChores();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

//is there a way to test this? (yes once you can nudge)
  choreCompleted(checked) {
    console.log("Is it checked?");
    console.log(this.state.checked);

    // This function will ping the API to say the person's chore is done
    if(this.state.checked){
      var url = BASEURL + 'chore_done/' + this.state.title + "/" + this.props.username;
      console.log("Pinging url: " + url);
      fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("My response for chore done is ");
          console.log(responseJson);
          if (responseJson['error'] != 'None'){
          Alert.alert(responseJson['error']);
          }
          else{
            Alert.alert("Thank you for doing your chore :)");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      }
    // This function will ping the API to tell the person to do their chore
    else{
      var url = BASEURL + 'do_your_chore/' + this.state.title + "/" + this.props.username;
      console.log("Pinging url: " + url);
      fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("My response for chore done is ");
          console.log(responseJson);
          if (responseJson['error'] != 'None'){
          Alert.alert(responseJson['error']);
          }
          else{
            // TODO: Need to send a notification to the user who needs to do their chore
            Alert.alert("We need to send a notification to this user");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    this.setState({checked: checked});
    return this.state.checked;
  }

  nudge() {
    console.log(this.state);
    console.log(this.props);
    this.setState({checked:true});
    var url = BASEURL + 'nudge/' + this.state.title +"/" + this.props.username;
    console.log("Pinging url: " + url);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson['error'] != 'None'){
          Alert.alert(responseJson['error']);
          }
        else{
          Alert.alert("You nudged " + this.props.housemate + "!")
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading){
      console.log("It is loading...");
      return <View><Text>Loading...</Text></View>;
    }
    else{
      console.log("What's in my state?");
      console.log(this.state);
      console.log("It is not loading anymore");
      console.log("Our chores are");
      console.log(this.state.chores);
      console.log("What's in my props?");
      console.log(this.props);
      // this.getChores();
      // console.log("chores2 are");
      // console.log(this.state.chores);

      // var myButtons;
      if (this.state.firstLoad){
        console.log('IN FIRST LOAD');
        // Push the person's current chore first
        for (var i=0; i < this.state.chores.length; i++){
          if(this.state.chores[i] == this.state.title){ 
            this.state.choreList.push( <Picker.Item label={this.state.chores[i]} value={this.state.chores[i]} key={i}/>);
          }
        }
        // Push the rest of the chores
        for (var i=0; i < this.state.chores.length; i++){
          if(this.state.chores[i] != this.state.title){ 
            this.state.choreList.push( <Picker.Item label={this.state.chores[i]} value={this.state.chores[i]} key={i}/>);
          }
        }
        this.setState({firstLoad: false});
      }
      console.log("My chore list is ");
      console.log(this.state.choreList);
      
      // If the person is not assigned a chore, don't let them be nudged or switched
      if (this.state.title == "None"){
        nudgeButton = <TouchableOpacity disabled={true} style={styles.rightButton}>
                    <Text style={styles.buttonText}>
                      Nudge
                    </Text>
                  </TouchableOpacity>;
        switchButton = <Switch disabled={true}/>;
      }
      // Otherwise let them be nudged and switched
      else{
        nudgeButton = <TouchableOpacity onPress={()=>{this.nudge()}} style={styles.rightButton}>
                    <Text style={styles.buttonText}>
                      Nudge
                    </Text>
                  </TouchableOpacity>;
        switchButton = <Switch onValueChange={(value)=>this.choreCompleted(value)} value={this.state.checked} />;
      }

      changeButton = <TouchableOpacity onPress={() => {this.setState({modalVisible: true})}} style={styles.rightButton}>
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
              <Text> Assign a chore to {this.props.housemate}. Their current chore is {this.props.title} </Text>
              <Text>Choose from the list:</Text>
              <Picker
                     mode="dialog"
                     prompt="Pick a chore"
                     selectedValue={this.props.selectedChore}
                     onValueChange={(chore)=>{console.log("picked chore: " + chore); this.setState({choreList: [], isLoading: false, firstLoad: true, selectedChore: chore, title: chore})}}>
                     {this.state.choreList}
              </Picker>
              <TouchableOpacity onPress={() => {this.setChore(); this.setState({modalVisible: false});}} style={styles.button}>
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
              <TouchableOpacity onPress={() => {this.addChore(this.state.text); this.setState({modalVisible: false});}} style={styles.button}>
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

            {switchButton}
            <Text style={styles.choreName}>
              {this.props.housemate}
            </Text>
            <View style={styles.choreDetails}>
              <Text style={styles.choreTitle}>{this.props.title}</Text>
            </View>
            {sideButton}
      </View>
      );
    }
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
  rightButton: {
    alignSelf: 'flex-end',
    marginLeft: 5,
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