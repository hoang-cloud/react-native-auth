import React, { Component } from 'react'
import {Text,View,Button} from 'react-native'
import { fetchUser } from '../redux/actions/index'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import firebase from 'firebase'
import { USER_STATE_CHANGE } from '../redux/constants'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import FeedScreen from './main/Feed'
import Profile from './main/Profile'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createMaterialBottomTabNavigator()
const EmptyScreen = () => {
    return(
        null
    )
}
export class Main extends Component {
    componentDidMount(){
        const {fetchUser} =this.props
        this.props.fetchUser()
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="Home"
                activeColor="#f0edf6"
                inactiveColor="#3e2465"
                barStyle={{ backgroundColor: '#694fad'}}
            >
                <Tab.Screen name="Feed" component={FeedScreen}
                    options={{
                        tabBarLabel:'Feed',
                        tabBarIcon: ({ color }) => (
                          <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),
                      }}
                />
                 <Tab.Screen name="MainAdd" component={EmptyScreen}
                    listeners={({navigation}) => ({
                            tabPress: event => {
                                event.preventDefault();
                                navigation.navigate("Add")
                            }
                    })}
                    options={{
                        tabBarLabel: 'Add',
                        tabBarIcon: ({ color }) => (
                          <MaterialCommunityIcons name="plus-box" color={color} size={26} />
                        ),
                      }}
                />
                <Tab.Screen name="Profile" component={Profile}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color }) => (
                          <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                        ),
                      }}
                />
               
            </Tab.Navigator>
        )
    }
}

const mapStateProps = (state) => {
    return {currentUser: state.userState.currentUser}
}

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateProps,mapDispatchProps)(Main)
