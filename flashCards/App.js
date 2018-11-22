import React from 'react';
import { StyleSheet, Text, View, Platform,StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { purple, white } from './utils/colors'
import { Constants } from 'expo'
import { createBottomTabNavigator, createAppContainer, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { setLocalNotification } from './utils/helpers'

// Components
import Dashboard from './components/Dashboard'
import AddDeck from './components/AddDeck'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const RouteConfigs = {
  Dashboard: {
  screen: Dashboard,
  navigationOptions: {
  tabBarLabel: "Dashboard",
  tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
},
},
AddDeck: {
  screen: AddDeck,
  navigationOptions: {
  tabBarLabel: "Add Deck",
  tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />}
},

  };
  
  const TabNavigatorConfig = {
  navigationOptions: {
  header: null
  },
  tabBarOptions: {
  activeTintColor: Platform.OS === "ios" ? purple : white,
  style: {
  height: 56,
  backgroundColor: Platform.OS === "ios" ? white : purple,
  shadowColor: "rgba(0, 0, 0, 0.24)",
  shadowOffset: {
  width: 0,
  height: 3
  },
  shadowRadius: 6,
  shadowOpacity: 1
  }
  }
  };
  
  const Tabs =
  Platform.OS === "ios"
  ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
  : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

  const MainNavigator = createStackNavigator({
    home: {
      screen: Tabs,
      navigationOptions: {
        header: null,
      },
    },
    DeckDetail: {
      screen: DeckDetail,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
      }),
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: white,
        title: 'Add Card',
        headerStyle: {
          backgroundColor: purple,
        },
      }),
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: white,
        title: 'Quiz',
        headerStyle: {
          backgroundColor: purple,
        },
      }),
    },
 
  });

  const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
 
  render() {
    return (
    <Provider store={createStore(reducer)}>
      <View style={{flex: 1}}>
        <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />  
        <AppContainer/>
   
      </View>
    </Provider>
    );
  }
}

