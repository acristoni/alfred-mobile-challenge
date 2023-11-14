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
            {user.name.title}
        </Text>
        <Text
          style={styles.name}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
            {user.name.first}
        </Text>
        <Text
          style={styles.name}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
            {user.name.last}
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
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25, // Metade da largura/altura para torná-lo circular
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
    
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserProfile;