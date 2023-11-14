import { StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import Home from '../../components/Home';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Home path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
