import React, {memo} from 'react';
import {FlatList, StyleSheet, Image, Text, View} from 'react-native';
import {AUTHOR_TYPE} from '../types';
import LinearGradient from 'react-native-linear-gradient';

const FlatlistRenderAuthor = memo(({author}: {author: AUTHOR_TYPE}) => {
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
      <LinearGradient
        colors={['#00000000', '#000000ff']}
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
      </LinearGradient>
    </View>
  );
});

export default function Authors({
  author,
}: {
  author: AUTHOR_TYPE[] | undefined;
}): React.JSX.Element {
  return (
    <View style={styles.headingContainer}>
      <View style={{marginLeft: 12}}>
        <Text style={styles.textStyle}>Authors</Text>
      </View>
      {author && (
        <FlatList
          data={author}
          horizontal
          removeClippedSubviews={true}
          initialNumToRender={5}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <FlatlistRenderAuthor author={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {color: '#454545', fontSize: 24, fontWeight: '700'},
  headingContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    width: '100%',
    height: 285,
  },
});
