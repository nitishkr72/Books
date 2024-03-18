import {FlatList, View} from 'react-native';
import {FlatListRenderBook} from './ListViewComponent';
import {useEffect, useState} from 'react';
import {getBookDetail} from '../API';
import {AUTHOR_TYPE, WORKS_TYPE} from '../types';
import {useNavigation} from '@react-navigation/native';

function FavoritesBookItem({item}: {item: string}) {
  const [bookData, setBookData] = useState<WORKS_TYPE | undefined>(undefined);
  const [author, setAuthor] = useState<AUTHOR_TYPE[]>([]);

  const navigation = useNavigation();

  async function getBookData(key: string) {
    const data = await getBookDetail(key);
    setBookData(data);
  }

  useEffect(() => {
    getBookData(item);
  }, []);

  useEffect(() => {
    if (bookData) {
      const author_value: AUTHOR_TYPE[] =
        bookData.author_name !== undefined
          ? bookData.author_name.map(name => {
              return {
                key: '',
                name: name,
              };
            })
          : [];
      setAuthor(author_value);
    }
  }, [bookData]);

  return (
    <FlatListRenderBook
      cover_id={bookData?.covers[0] ?? ''}
      title={bookData?.title ?? ''}
      authors={author}
      onClickTitle={() => {
        navigation.navigate('BookDetail', {key: item});
      }}
    />
  );
}

export default function FavoritesBookListView({keys}: {keys: string[]}) {
  return (
    <View style={{width: '100%', paddingHorizontal: 10}}>
      <FlatList
        data={keys}
        removeClippedSubviews={true}
        initialNumToRender={5}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <FavoritesBookItem item={item} />}
      />
    </View>
  );
}
