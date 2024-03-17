import {StyleSheet, Text, View} from 'react-native';

export default function FavoritesScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#00ffff',
    alignItems: 'center',
    height: '100%',
  },
});
