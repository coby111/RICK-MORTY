import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsuscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        router.push('/profile/UserProfileScreen');
      } else {
        router.replace('/auth/login');
      }
    });

    return unsuscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text>Cargando...</Text>
      <ActivityIndicator
        size='large'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white"
  }, 
  loading: {
    color: 'black',
    fontSize: 25
  }
})