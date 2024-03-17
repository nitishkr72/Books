import {StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function SearchScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <TabHeaderSearch />
      <Text style={{backgroundColor: 'black'}}>Heelo</Text>
    </View>
  );
}

function TabHeaderSearch({}): React.JSX.Element {
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
            placeholder="Search"
            placeholderTextColor={'#999999'}
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
