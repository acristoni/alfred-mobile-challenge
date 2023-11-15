import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { Text, View } from './Themed';
import favoriteUsersList from '../store/favoriteUsersList';
import { User } from '../interfaces/User.interface';
import UserProfile from './UserProfile';

export default function Favorites() {
  const [usersList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    const allFavoriteUsers = favoriteUsersList.getAll();
    setUserList(allFavoriteUsers);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {usersList && usersList.length ? (
        usersList.map((user) => <UserProfile user={user} key={user.login.uuid} />)
      ) : (
        <Text style={styles.withoutUsers}>
          Você ainda não possui nenhum paciente na lista de favoritos!
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  withoutUsers: {
    textAlign: 'center',
    fontWeight: '700',
    marginHorizontal: 40,
    marginTop: -50,
    fontSize: 17,
  },
});
