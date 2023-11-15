import { StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import Favorites from '../../components/Favorites';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Favorites />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
