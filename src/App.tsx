import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import FavoritesScreen from './screens/FavoritesScreen';
import HomeScreen, {TabHeaderHome} from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';

const Tab = createBottomTabNavigator();

function TabNavigationHeader({}): React.JSX.Element {
  return (
    <View
      style={{
        height: 60,
      }}>
      <Text>Hello</Text>
    </View>
  );
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safeArea}>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: ({options, route}) => {
              if (route.name === 'Home') {
                return <TabHeaderHome />;
              }
              return <TabNavigationHeader />;
            },
          }}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Favorites" component={FavoritesScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#00ffff',
    alignItems: 'center',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },

  containerLight: {
    backgroundColor: 'white',
  },
  iconContainer: {
    marginTop: 20,
    backgroundColor: '#807D7D',
    width: '90%',
    height: '90%',
    borderRadius: 20,
    alignItems: 'center',
  },
  appIcon: {
    alignItems: 'center',
  },
  cardContainer: {
    marginTop: 30,
    backgroundColor: '#000',
    width: '90%',
    height: '65%',
    borderRadius: 20,
    alignItems: 'center',
  },
  cardContainerText: {
    color: '#FFF',
    marginTop: 60,
    fontSize: 50,
  },
  temaText: {
    color: '#FFF',
    marginRight: 50,
    fontSize: 30,
  },
  titleContainer: {
    backgroundColor: '#FFF',
    width: '85%',
    height: '10%',
  },
  titleContainerText: {
    fontSize: 45,
  },
  temaContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 22,
  },
  Refazer_tutorial: {
    backgroundColor: '#3164F4',
    padding: 10,
    borderRadius: 6,
  },
  Refazer_Text: {
    fontWeight: 'bold',
    fontSize: 17.5,
    color: 'white',
  },
});
