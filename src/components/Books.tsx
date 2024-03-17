import React, {memo} from 'react';
import {WORKS_TYPE} from '../types';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';

const FlatListRenderBook = memo(({book}: {book: WORKS_TYPE}) => {
  return (
    <View
      style={{
        marginVertical: 5,
        height: 150,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      }}>
      <Image
        source={{
          uri: `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`,
        }}
        style={{
          width: 80,
          height: 120,
        }}
      />
      <View
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          marginLeft: 10,
          marginBottom: 35,
        }}>
        <Text style={{color: '#454545', fontSize: 20, fontWeight: '700'}}>
          {book.title}
        </Text>
        {book &&
          book.authors.map((item, index) => {
            return (
              <Text key={index} style={{color: '#454545'}}>
                {item.name}
              </Text>
            );
          })}
      </View>
    </View>
  );
});

export default function Books({
  works,
}: {
  works: WORKS_TYPE[] | undefined;
}): React.JSX.Element {
  return (
    <View style={[styles.headingContainer, {flex: 1, marginLeft: 12}]}>
      <View>
        <Text style={styles.textStyle}>Just for you</Text>
      </View>
      {works && (
        <FlatList
          data={works}
          removeClippedSubviews={true}
          initialNumToRender={5}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return <FlatListRenderBook book={item} />;
          }}
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
