import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { User } from '../interfaces/User.interface';
import { Text } from './Themed';

const UserProfile = ({ user }: { user: User }) => {
  return (
    <View style={styles.container}>
      {/* Avatar à esquerda */}
      <Image source={{ uri: user.picture.thumbnail }} style={styles.avatar} />

      {/* Informações do usuário à direita */}
      <View style={styles.userInfo}>
        <Text
          style={styles.name}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
            {user.name.title} {user.name.first} {user.name.last}
        </Text>
        <Text
          style={styles.email}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
            {user.email}
        </Text>
        <Text
          style={styles.name}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
            {user.location.city}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: 300,
    marginTop: 5,
    marginStart:10
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
    marginStart: 5
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 13,
  }
});

export default UserProfile;