import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, TextInput } from 'react-native';
import UserProfile from './UserProfile';
import { User } from '../interfaces/User.interface';
import getUsers from '../service/getUsers';
import Colors from '../constants/Colors';

export default function Home({ path }: { path: string }) {
  const [usersListWithoutFilter, setUserListWithoutFilter] = useState<User[]>([])
  const [usersList, setUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState<string>('')

  const loadMoreData = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const response = await getUsers(page);
      if (response && response.results && response.results.length) {
        const newUserList = [...usersList, ...response.results]
        setUserListWithoutFilter(newUserList)
        
        if (searchText.length) {
          filterByName(newUserList)
        } else {
          setUsersList(newUserList);
        }
        setPage(page + 1);
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

  useEffect(()=>{
    if (searchText.length) {
      filterByName(usersList)
    } else {
      setUsersList(usersListWithoutFilter)
    }
  },[searchText])

  const filterByName = (usersList: User[]) => {
    const filteredUserList = usersList.filter(user => user.name.first.toLowerCase().includes(searchText.toLowerCase()) || user.name.last.toLowerCase().includes(searchText.toLowerCase()))
    setUsersList(filteredUserList)
  }

  const renderFooter = () => {
    return loading ? (
      <ActivityIndicator size="small" color={Colors['light'].text} style={styles.loadingIndicator} />
    ) : null;
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  return (
    <>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name"
        onChangeText={handleSearch}
        value={searchText}
      />
      <FlatList
        data={usersList}
        keyExtractor={(user) => user.login.uuid}
        renderItem={({ item }) => <UserProfile user={item}/>}
        ListFooterComponent={renderFooter}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
      />
    </>
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
