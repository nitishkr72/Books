import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen, {TabHeaderHome} from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import DefaultHeader from '../components/DefaultHeader';
import Icon from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

export default function HomeBottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Search"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let iconType;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
            iconType = 'MaterialCommunityIcons';
          } else if (route.name === 'Search') {
            iconName = 'search1';
            iconType = 'Feather';
          } else if (route.name === 'Favorites') {
            iconName = 'book';
            iconType = 'MaterialCommunityIcons';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        header: ({route}) => {
          if (route.name === 'Home') {
            return <TabHeaderHome />;
          } else if (route.name === 'Search' || route.name === 'Favorites') {
            return null; // Hide header for Search and Favorites
          }
          return <DefaultHeader />; // Default header for other screens
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}
