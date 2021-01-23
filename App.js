import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import {View,Text,Button} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import firebase from 'firebase/app'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
const firebaseConfig = {
  apiKey: "AIzaSyBKXklWtauNoh2kWn0WBUCqKot0EYJEyGI",
  authDomain: "instagram-e369f.firebaseapp.com",
  projectId: "instagram-e369f",
  storageBucket: "instagram-e369f.appspot.com",
  messagingSenderId: "734466431617",
  appId: "1:734466431617:web:9c8257db8e92bb30070b80",
  measurementId: "G-2E79QJ7ZRQ"
};
if(firebase.apps.length === 0){
const app = firebase.initializeApp(firebaseConfig)
}
import LandingScreen from './components/auth/Landing'
import Main from './components/Main';
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import rootReducer from './redux/reducers'
import AddScreen from './components/main/Add'
const Stack = createStackNavigator();
const store = createStore(rootReducer, applyMiddleware(thunk))
export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      isLogged: false

    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
        if(!user){
            this.setState({
                loaded:true,
                isLogged:false
            })
        }
        else{
          this.setState({
            loaded:true,
            isLogged:true
          })
        }
    }
    )
  }
  render() {
    const {loaded, isLogged} = this.state
    if(!loaded){
      return(
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    if(!isLogged){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
    return(
      <Provider store={store}>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="MainScreen" component={Main} options={{ headerShown: false}} />
            <Stack.Screen name="Add" component={AddScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}


