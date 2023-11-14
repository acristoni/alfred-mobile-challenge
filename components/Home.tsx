import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { View } from './Themed';
import UserProfile from './UserProfile';
import { User } from '../interfaces/User.interface';
import getUsers from '../service/getUsers';
import Colors from '../constants/Colors';

export default function Home({ path }: { path: string }) {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadMoreData = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const response = await getUsers(page);
      if (response && response.results && response.results.length) {
        setUsersList((prevUsersList) => [...prevUsersList, ...response.results]);
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

  const renderFooter = () => {
    return loading ? (
      <ActivityIndicator size="small" color={Colors['light'].text} style={styles.loadingIndicator} />
    ) : null;
  };

  return (
    <FlatList
      data={usersList}
      keyExtractor={(user) => user.login.uuid}
      renderItem={({ item }) => <UserProfile user={item}/>}
      ListFooterComponent={renderFooter}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.1}
    />
  );
}

const styles = StyleSheet.create({
  loadingIndicator: {
    marginVertical: 20,
  },
});
