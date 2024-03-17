import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AUTHOR_TYPE, FDDR_TYPE, WORKS_TYPE} from '../types';
import Authors from '../components/Authors';
import Books from '../components/Books';

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

export default function HomeScreen(): React.JSX.Element {
  const [authorData, setAuthorData] = useState<AUTHOR_TYPE[] | undefined>(
    undefined,
  );
  const [worksData, setWorksData] = useState<WORKS_TYPE[] | undefined>(
    undefined,
  );

  async function getData() {
    const data = await getInitialDetails();
    setAuthorData(data.authors);
    setWorksData(data.works);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Authors author={authorData} />
      <Books works={worksData} />
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
        flexDirection: 'column',
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
    gap: 20,
  },
  textStyle: {color: '#454545', fontSize: 24, fontWeight: '700'},
  headingContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    width: '100%',
    height: 285,
  },
});
