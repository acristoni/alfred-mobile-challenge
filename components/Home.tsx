import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { View } from './Themed';
import UserProfile from './UserProfile';
import { User } from '../interfaces/User.interface';
import getUsers from '../service/getUsers';


export default function Home({ path }: { path: string }) {
  const [usersList, setUsersList] = useState<User[]>()

  useEffect(()=>{
    const callServiceGetUsers = async () => {
      const response = await getUsers()
      if (response && response.results && response.results.length) {
        setUsersList(response.results)
      } else {
        alert("Internal Server Error")
      }
    }
    callServiceGetUsers()
  },[])

  return (
    <ScrollView>
      <View>
        <View style={styles.getStartedContainer}>
          {
            usersList && usersList.length &&
            usersList.map((user, index) => <UserProfile key={index} user={user} />)        
          }
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
});
