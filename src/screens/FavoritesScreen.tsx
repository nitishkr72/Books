import {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FavoritesBookContext} from '../context/FavoritesBookContext';
import FavoritesBookListView from '../components/FavoritesBookListView';

export default function FavoritesScreen(): React.JSX.Element {
  const {keys} = useContext(FavoritesBookContext);
  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          marginTop: 40,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
        }}>
        <Text style={styles.heading}>Favorites Books</Text>
      </View>
      {keys.length > 0 ? (
        <FavoritesBookListView keys={keys} />
      ) : (
        <Text
          style={{
            color: '#aaa',
            fontSize: 24,
            fontWeight: '400',
            fontStyle: 'italic',
          }}>
          No Favorites Book
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    height: '100%',
    paddingBottom: 90,
  },
  heading: {
    color: '#454545',
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 20,
    borderBottomWidth: 4,
    borderBottomColor: '#ccc',
    paddingBottom: 6,
    width: 140,
    textAlign: 'center',
  },
});
