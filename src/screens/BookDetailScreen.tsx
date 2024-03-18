import {useNavigation} from '@react-navigation/native';
import {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {WORKS_TYPE} from '../types';
import {FavoritesBookContext} from '../context/FavoritesBookContext';
import {getBookDetail} from '../API';
import CustomActivityIndicator from '../components/CustomActivityIndicator';

export default function BookDetailScreen({route}) {
  const [bookData, setBookData] = useState<WORKS_TYPE | undefined>(undefined);
  const key = route.params.key.replace('/works/', '');

  async function getBookData(key: string) {
    const data = await getBookDetail(key);
    setBookData(data);
  }

  useEffect(() => {
    getBookData(key);
  }, []);

  return (
    <View style={styles.container}>
      <TabHeader bookID={key} />
      {bookData === undefined ? (
        <CustomActivityIndicator />
      ) : (
        <View
          style={{
            paddingHorizontal: 12,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            width: '100%',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              gap: 12,
            }}>
            <Image
              source={{
                uri: `https://covers.openlibrary.org/b/id/${bookData?.covers[0]}-M.jpg`,
              }}
              style={{
                width: 80,
                height: 120,
              }}
            />
            <View style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Text style={styles.bookTitle}>{bookData.title}</Text>
            </View>
          </View>
          <View style={{width: '100%'}}>
            <Text style={{color: '#454545', fontSize: 18, fontWeight: '600'}}>
              About the Book
            </Text>
            <Text
              style={{
                color: '#999',
                fontSize: 15,
                fontWeight: '500',
                textAlign: 'justify',
              }}>
              {JSON.stringify(
                bookData.description ?? 'No Description Available',
              )}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

function TabHeader({bookID}: {bookID: string}) {
  const [bookmarked, setBookmarked] = useState(false);
  const {keys, addKey, removeKey} = useContext(FavoritesBookContext);

  useEffect(() => {
    if (keys.includes(bookID)) {
      setBookmarked(true);
    }
  }, []);

  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name="arrowleft" size={30} color="#454545" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (bookmarked) {
            setBookmarked(false);
            removeKey(bookID);
          } else {
            setBookmarked(true);
            addKey(bookID);
          }
        }}>
        <Icon name={bookmarked ? 'star' : 'staro'} size={30} color="#454545" />
      </TouchableOpacity>
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
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 20,
  },
  bookTitle: {
    color: '#454545',
    fontSize: 20,
    fontWeight: '700',
  },
});
