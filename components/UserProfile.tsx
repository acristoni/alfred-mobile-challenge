import React, { useState } from 'react';
import { View, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { User } from '../interfaces/User.interface';
import { Text } from './Themed';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import favoriteUsersList from '../store/favoriteUsersList';
import { Ionicons } from '@expo/vector-icons'
import Modal from 'react-native-modal';

type Props = {
  user: User 
  pageFavorites?: boolean
  callBackToUpdate?: (value: boolean) => void
  updateParentState?: boolean
}

const UserProfile = ({ user, pageFavorites = false, callBackToUpdate, updateParentState }: Props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const animatedValue = new Animated.Value(0);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: animatedValue } }],
    { useNativeDriver: false }
  );

  const onGestureStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      if (pageFavorites) {
        favoriteUsersList.remove(user.login.uuid)
      } else {
        favoriteUsersList.add(user.login.uuid, user)
      }

      if (callBackToUpdate) {
        callBackToUpdate(!updateParentState)
      }

      Animated.spring(animatedValue, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onGestureStateChange}
        >     
          <View style={styles.all}>
            {/* Seção à esquerda do componente com a cor de fundo */}
            <View style={styles.iconsContainer}>
              {
                pageFavorites ?
                <View style={styles.rightContainer}>
                  <Ionicons name="trash" size={32} color="#E0FBFC" />
                </View> :
                <View style={styles.leftContainer}>
                  <Ionicons name="heart" size={32} color="#E0FBFC" />
                </View>
              }
            </View>
            <Animated.View
              style={[
                styles.container,
                {
                  transform: [
                    {
                      translateX: animatedValue.interpolate({
                        inputRange: [0, 90],
                        outputRange: [0, 90],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={styles.content}>
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
            </Animated.View>
          </View> 
        </PanGestureHandler>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={styles.bottomModal}>
        <View style={styles.modalContainer}>
          <Image source={{ uri: user.picture.medium }} style={styles.avatarModal} />
          <Text style={styles.mainTextModal}>
              {user.name.title} {user.name.first} {user.name.last}
          </Text>
          <Text style={styles.subTextModal}>
              Full Name
          </Text>
          <Text style={styles.mainTextModal}>
              {user.location.city} - {user.location.state}
          </Text>
          <Text style={styles.subTextModal}>
              City - State
          </Text>
          <Text style={styles.mainTextModal}>
              {user.email}
          </Text>
          <Text style={styles.subTextModal}>
              E-mail
          </Text>
          <Text style={styles.mainTextModal}>
              {user.nat}
          </Text>
          <Text style={styles.subTextModal}>
              Country
          </Text>
          <Text style={styles.mainTextModal}>
              {user.gender}
          </Text>
          <Text style={styles.subTextModal}>
              Gender
          </Text>
          <Text style={styles.mainTextModal}>
              {user.phone}
          </Text>
          <Text style={styles.subTextModal}>
              Phone Number
          </Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  all: {
    marginTop: 5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -62,
    paddingStart: 10,
    height: 64,
    paddingTop: 5,
    zIndex: 2,
    backgroundColor: '#E0FBFC'
  },
  leftContainer: {
    backgroundColor: '#EE6C4D',
    width: 90,
    height: 53,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    backgroundColor: '#3D5A80',
    width: 90,
    height: 53,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconsContainer: {
    zIndex: 1,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  avatarModal: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: -80,
    zIndex: 2
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
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
    marginHorizontal: 25,
  },
  mainTextModal: {
    fontWeight: '700',
    marginTop: 15,
    fontSize: 20
  },
  subTextModal: {
    marginTop: 5,
    fontSize: 13
  }
});

export default UserProfile;