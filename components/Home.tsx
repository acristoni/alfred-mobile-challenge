import React from 'react';
import { StyleSheet } from 'react-native';

import { View } from './Themed';
import UserProfile from './UserProfile';
import mockUser from '../mock/user';


export default function Home({ path }: { path: string }) {
  return (
    <View>
      <View style={styles.getStartedContainer}>
        {
          [1,2,3].map(() => <UserProfile user={mockUser}/>)        
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
});
