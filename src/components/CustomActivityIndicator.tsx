import {ActivityIndicator, View} from 'react-native';

export default function CustomActivityIndicator() {
  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <ActivityIndicator size="large" color="#454545" />
    </View>
  );
}
