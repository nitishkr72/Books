import {memo, useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {AUTHOR_TYPE, FDDR_TYPE} from '../types';

async function getInitialDetails(): Promise<FDDR_TYPE> {
  const data = await fetch(
    'https://openlibrary.org/subjects/sci-fi.json?details=true',
  );

  const json_data = await data.json();

  return {
    works: json_data.works,
    authors: json_data.authors,
  };
}

const RenderItem = memo(({author}: {author: AUTHOR_TYPE}) => {
  const olid = author.key.split('/')[2];

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        marginHorizontal: 10,
        width: 160,
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
      }}>
      <Image
        source={{
          uri: `https://covers.openlibrary.org/a/olid/${olid}-M.jpg`,
        }}
        style={{
          width: 160,
          height: 260,
          position: 'absolute',
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: `linear-gradient(to top, #000, #fff)`,
          width: '100%',
          height: '50%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          padding: 20,
        }}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: '700'}}>
          {author.name}
        </Text>
      </View>
    </View>
  );
});

export default function HomeScreen(): React.JSX.Element {
  const [data, setData] = useState<AUTHOR_TYPE[] | undefined>(undefined);

  async function getData() {
    const data = await getInitialDetails();
    setData(data.authors);
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          width: '100%',
          height: 285,
        }}>
        <View style={{marginLeft: 12}}>
          <Text style={{color: 'black', fontSize: 24}}>Authors</Text>
        </View>
        {data && (
          <FlatList
            data={data}
            horizontal
            removeClippedSubviews={true}
            initialNumToRender={5}
            renderItem={({item}) => <RenderItem author={item} />}
          />
        )}
      </View>
    </View>
  );
}

export function TabHeaderHome({}): React.JSX.Element {
  return (
    <View
      style={{
        height: 60,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <Text style={{color: '#454545', fontSize: 28, fontWeight: '800'}}>
        Books
      </Text>
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
});
