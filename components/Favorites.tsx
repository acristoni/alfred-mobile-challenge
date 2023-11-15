import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { Text } from './Themed';
import favoriteUsersList from '../store/favoriteUsersList';
import { User } from '../interfaces/User.interface';
import UserProfile from './UserProfile';

export default function Favorites() {
  const [usersList, setUserList] = useState<User[]>([])
  const [update, setUpdate] = useState<boolean>(false)

  useEffect(()=>{
    const list = favoriteUsersList.getAll()
    setUserList(list)
  },[update])

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <TouchableOpacity onPress={()=>setUpdate(!update)} style={styles.buttonAtualizar}>
        <Text style={styles.atualizaLista}>Atualizar Lista de Favoritos</Text>
      </TouchableOpacity>
      {usersList && usersList.length ? (
        usersList.map((user) => <UserProfile 
          user={user} 
          key={user.login.uuid} 
          pageFavorites
          callBackToUpdate={setUpdate}
          updateParentState={update}
        />)
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
    marginTop: 250,
    fontSize: 17,
  },
  atualizaLista: {
    fontSize: 15,
    color: '#E0FBFC',
    fontWeight: 700
  },
  buttonAtualizar: {
    marginTop: 10,
    marginHorizontal: 'auto',
    backgroundColor: '#293241',
    padding: 10,
    borderRadius: 20
  }
});
