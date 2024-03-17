import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen, {TabHeaderHome} from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import DefaultHeader from '../components/DefaultHeader';

const Tab = createBottomTabNavigator();

export default function HomeBottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Search"
      screenOptions={{
        header: ({route}) => {
          if (route.name === 'Home') {
            return <TabHeaderHome />;
          } else if (route.name === 'Search') {
            return null;
          }
          return <DefaultHeader />;
        },
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}
