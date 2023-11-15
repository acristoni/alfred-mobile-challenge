import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from './Themed';
import favoriteUsersList from '../store/favoriteUsersList';
import { User } from '../interfaces/User.interface';
import UserProfile from './UserProfile';


export default function Favorites({ path }: { path: string }) {
  const [usersList, setUserList] = useState<User[]>([])
  useEffect(()=>{
    setInterval(()=>{
      const allFavoriteUsers = favoriteUsersList.getAll()
      setUserList(allFavoriteUsers)
    },1000)
  }, [])
  return (
    <View>
      {
        usersList && usersList.length ?
        usersList.map(user => <UserProfile user={user} key={user.login.uuid} />) :
        <Text>Você ainda não possui nenhum paciente na lista de favoritos!</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
