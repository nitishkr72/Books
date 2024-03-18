import React, {memo} from 'react';
import {AUTHOR_TYPE, WORKS_TYPE} from '../types';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomActivityIndicator from './CustomActivityIndicator';

export const FlatListRenderBook = memo(
  ({
    cover_id,
    title,
    authors,
    onClickTitle,
  }: {
    cover_id: string;
    title: string;
    authors: AUTHOR_TYPE[];
    onClickTitle: () => void;
  }) => {
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
            uri: `https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`,
          }}
          style={{
            width: 80,
            height: 120,
          }}
        />
        <TouchableOpacity
          onPress={() => onClickTitle()}
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            marginLeft: 10,
            marginBottom: 35,
          }}>
          <Text style={{color: '#454545', fontSize: 20, fontWeight: '700'}}>
            {title}
          </Text>
          {authors &&
            authors.slice(0, 2).map((item, index) => {
              return (
                <Text key={index} style={{color: '#454545'}}>
                  {item.name}
                </Text>
              );
            })}
        </TouchableOpacity>
      </View>
    );
  },
);

export default function ListViewComponent({
  works,
}: {
  works: WORKS_TYPE[] | undefined;
}): React.JSX.Element {
  const navigation = useNavigation();

  return (
    <View style={[styles.headingContainer, {flex: 1, marginLeft: 15}]}>
      <View>
        <Text style={styles.textStyle}>Just for you</Text>
      </View>
      {works === undefined ? (
        <CustomActivityIndicator />
      ) : (
        <FlatList
          data={works}
          removeClippedSubviews={true}
          initialNumToRender={5}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <FlatListRenderBook
                cover_id={item.cover_id}
                title={item.title}
                authors={item.authors}
                onClickTitle={() => {
                  navigation.navigate('BookDetail', {key: item.key});
                }}
              />
            );
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
