import {useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {AUTHOR_TYPE, WORKS_TYPE} from '../types';
import {FlatListRenderBook} from '../components/ListViewComponent';
import {useNavigation} from '@react-navigation/native';
import {getSearchedBookTitle} from '../API';
import CustomActivityIndicator from '../components/CustomActivityIndicator';

type SEARCH_ACTION_TYPE = 'INITIAL' | 'SEARCHING' | 'SEARCH_RESULT';

export default function SearchScreen(): React.JSX.Element {
  const [searchedBooks, setSearchedBooks] = useState<WORKS_TYPE[] | undefined>(
    undefined,
  );
  const [searchAction, setSearchAction] =
    useState<SEARCH_ACTION_TYPE>('INITIAL');
  const navigation = useNavigation();

  async function handleSearchText(searchText: string) {
    setSearchAction('SEARCHING');
    const data = await getSearchedBookTitle(searchText);

    setSearchedBooks(data);
    setSearchAction('SEARCH_RESULT');
  }

  return (
    <View style={styles.container}>
      <TabHeaderSearch updateSearch={handleSearchText} />
      <View style={{marginHorizontal: 12}}>
        {searchAction === 'SEARCHING' ? (
          <CustomActivityIndicator />
        ) : searchAction === 'INITIAL' ? (
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <Text style={{color: '#ccc', fontSize: 24}}>Search Book title</Text>
          </View>
        ) : (
          <FlatList
            data={searchedBooks}
            removeClippedSubviews={true}
            initialNumToRender={5}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              const author: AUTHOR_TYPE[] =
                item.author_name !== undefined
                  ? item.author_name.map(name => {
                      return {
                        key: '',
                        name: name,
                      };
                    })
                  : [];

              return (
                <FlatListRenderBook
                  cover_id={item.cover_i}
                  title={item.title}
                  authors={author}
                  onClickTitle={() => {
                    navigation.navigate('BookDetail', {key: item.key});
                  }}
                />
              );
            }}
          />
        )}
      </View>
    </View>
  );
}

function TabHeaderSearch({
  updateSearch,
}: {
  updateSearch: (arg: string) => void;
}): React.JSX.Element {
  const [text, setText] = useState<string>('');

  return (
    <View style={styles.headerContainer}>
      <View
        style={{
          backgroundColor: '#f1e6e2',
          width: '95%',
          height: 55,
          borderRadius: 50,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
            marginRight: 20,
            height: '100%',
          }}>
          <Icon name="arrowleft" size={30} color="#454545" />
          <TextInput
            style={{
              fontSize: 20,
              color: '#454545',
              fontWeight: '600',
              flex: 1,
            }}
            value={text}
            onChangeText={text => setText(text)}
            placeholder="Search"
            placeholderTextColor={'#999999'}
            onSubmitEditing={() => updateSearch(text)}
          />
          <Icon name="search1" size={25} color="#aaa" />
        </View>
      </View>
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
    height: 90,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
