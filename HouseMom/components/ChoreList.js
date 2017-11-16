// //NOT BEING USED

// import React, {
//   Component
// } from 'react';

// import {
//   AlertIOS, //unneeded?
//   AppRegistry,
//   Platform,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Switch, //change to checkbox if you can update react-native to .49
//   FlatList,
//   Alert
// } from 'react-native';

// import Chore from './Chore.js'

// var BASEURL = 'https://7987a3a5.ngrok.io/';

// class ChoreList extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       usersChores: []
//     };
//   }

//     componentWillMount(){
//     console.log("in componentWillMount ChoreList");
//     this.getUsersChores();
//   }

//   getUsersChores() {
//     console.log("in getUsersChores");
//     console.log("What am I working With?");
//     console.log("#");
//     console.log("#");
//     console.log("#");
//     console.log(this.props);

//     // var url = BASEURL + 'house/' + myData['Houses'][0];
//     //   return fetch(url)
//     //     .then((response) => response.json())
//     //     .then((responseJson) => {
//     //       console.log("My house is ");
//     //       console.log(responseJson);
//     //       console.log('got response');
//     //       this.setState({users: responseJson['successUsers']});
//     //       this.setState({myHouse: responseJson});
//     //       console.log("The state.users is ");
//     //       console.log(this.state.users);
//     //     })
//     //     .catch((error) => {
//     //       console.error(error);
//     //     });



//     // var url = BASEURL + 'users';
//     // return fetch(url)
//     //   .then((response) => response.json())
//     //   .then((responseJson) => {
//     //     this.setState({usersChores: responseJson.filter(function(user){
//     //       return (user["Chores"].length > 0);})})})
//     //   .catch((error) => {
//     //     console.error(error);
//     //   });
//   }



// //   render() {
// //     return(
// //         <View>
// //           <FlatList
// //             keyExtractor={item => item["First Name"]}
// //             data={this.state.usersChores}
// //             renderItem={({item}) => <Chore housemate={item["First Name"]} title={item["Chores"][0]}></Chore>}
// //           ></FlatList>
// //         </View>
// //       );
// //   }

// // }

// export default ChoreList