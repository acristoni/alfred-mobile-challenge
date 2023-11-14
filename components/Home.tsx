import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { View } from './Themed';
import UserProfile from './UserProfile';
import { User } from '../interfaces/User.interface';
import getUsers from '../service/getUsers';
import Colors from '../constants/Colors';

export default function Home({ path }: { path: string }) {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [filteredUsersList, setFilteredUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  const loadMoreData = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const response = await getUsers(page);
      if (response && response.results && response.results.length) {
        setUsersList((prevUsersList) => [...prevUsersList, ...response.results]);
        setPage(page + 1);
        // Atualizar também a lista filtrada quando novos usuários são carregados
        filterUsers(searchText, [...usersList, ...response.results]);
      } else {
        alert('Internal Server Error');
      }
    } catch (error) {
      console.error('Error loading more data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  const filterUsers = (text: string, users: User[]) => {
    const filteredUsers = users.filter(
      (user) =>
        user.name.first.toLowerCase().includes(text.toLowerCase()) ||
        user.name.last.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsersList(filteredUsers);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    filterUsers(text, usersList);
  };

  const renderFooter = () => {
    return loading ? (
      <ActivityIndicator size="small" color={Colors['light'].text} style={styles.loadingIndicator} />
    ) : null;
  };

  return (
    <View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name"
        onChangeText={handleSearch}
        value={searchText}
      />
      <FlatList
        data={filteredUsersList}
        keyExtractor={(user) => user.login.uuid}
        renderItem={({ item }) => <UserProfile user={item} />}
        ListFooterComponent={renderFooter}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingIndicator: {
    marginVertical: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
});
