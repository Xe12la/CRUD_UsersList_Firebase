import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, Button, Pressable, TextInput } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../database/firebaseDb';
// not yet done with the search button
// no duplicate 
// no special caharacter
// if successfullly deleted or updated with toast event


class UserScreen extends Component {
  
  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('users');
    this.state = {
      isLoading: true,
      userArr: []
    };
  }

  
  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }
  componentWillUnmount(){
    this.unsubscribe();
  }
  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { name, email, mobile } = res.data();
      userArr.push({
        key: res.id,
        res,
        name,
        email,
        mobile,
      });
    });
    this.setState({
      userArr,
      isLoading: false,
   });
  }

  

  
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <View>
        <View style={styles.Container1}>
        <TextInput  
            placeholder='Search Here' 
            onChangeText={(text) => searchFilterFunction(text)}
            style={styles.input}
            />
          <Pressable style={styles.buttonAdd}
          onPress={() => this.props.navigation.navigate('')}>
            <Text style={{fontWeight:'700'}}>Search</Text>
          </Pressable>
          
        </View>
        <Pressable style={styles.buttonAdd}
          onPress={() => this.props.navigation.navigate('AddUserScreen')}>
            <Text style={{fontWeight:'700'}}>Add User</Text>
          </Pressable>
          
        
      <ScrollView style={styles.container}>
        
          {
            this.state.userArr.map((item, i) => {
              return (
                <ListItem 
                style={styles.InputsContainer}
                  key={i}
                  bottomDivider
                  title={item.name}
                  subtitle={item.email}
                  onPress={() => {
                    this.props.navigation.navigate('UserDetailScreen', {
                      userkey: item.key
                    });
                  }}
                  >
                    <Text style={styles.text}>{item.name}</Text>
                    <Text>{item.mobile}</Text>
                  </ListItem>

                  
              );
            })
          }
      </ScrollView>
       </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: '100%',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontWeight: '500',
  },
  buttonAdd: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    backgroundColor: '#de6641',
    fontWeight:'700',
    justifyContent: 'space-between',
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
  },
 InputsContainer: {
    padding: 5,
    },
 input:{
      backgroundColor:'#119a93',
      padding: 10,
      fontSize:20,
      width:'65%',
      marginLeft: 10,
      borderRadius: 15,
    },
    Container1:{
    flexDirection: "row",
    padding:10,
    alignItems:'center',
    alignSelf:'center',
    borderRadius: 8,
    marginLeft: 10,

    },
})
export default UserScreen;
