import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeBottomTabNavigator from './navigation/HomeBottomTabNavigator';
import BookDetailScreen from './screens/BookDetailScreen';
import {FavoritesBookContextProvider} from './context/FavoritesBookContext';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <FavoritesBookContextProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.safeArea}>
          <Stack.Navigator
            screenOptions={{
              header: ({}) => {
                return null;
              },
            }}>
            <Stack.Screen name="HomeTab" component={HomeBottomTabNavigator} />
            <Stack.Screen name="BookDetail" component={BookDetailScreen} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </FavoritesBookContextProvider>
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
