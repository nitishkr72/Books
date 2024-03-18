import {FlatList, ScrollView, View} from 'react-native';
import {FlatListRenderBook} from './ListViewComponent';
import {memo, useEffect, useState} from 'react';
import {WORKS_TYPE} from '../types';
import {useNavigation} from '@react-navigation/native';
import {getBookDetail} from '../API';

function FavoritesBookItem({item}: {item: string}) {
  const [bookData, setBookData] = useState<WORKS_TYPE | undefined>(undefined);

  async function getBookData(key: string) {
    const data: WORKS_TYPE = await getBookDetail(key);
    data.authors =
      data.author_name !== undefined
        ? data.author_name.map(name => {
            return {
              key: '',
              name: name,
            };
          })
        : [];
    setBookData(data);
  }

  useEffect(() => {
    getBookData(item);
  }, []);

  return (
    <FlatListRenderBook
      cover_id={bookData?.covers[0] ?? ''}
      title={bookData?.title ?? ''}
      authors={bookData?.authors ?? []}
      onClickTitle={() => {
        navigation.navigate('BookDetail', {key: item});
      }}
    />
  );
}

const FavoritesBookListView = memo(({keys}: {keys: string[]}) => {
  const navigation = useNavigation();

  return (
    <View style={{width: '100%', paddingHorizontal: 10}}>
      <ScrollView>
        {keys.map((item, index) => {
          return <FavoritesBookItem item={item} key={index} />;
        })}
      </ScrollView>
    </View>
  );
});

export default FavoritesBookListView;
