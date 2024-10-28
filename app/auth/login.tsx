import { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity, ImageBackground, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@components/features/auth/aplication/provider/SessionProvider';

export default function LoginScreen() {
  const [email, setEmail] = useState('torty534@gmail.com');
  const [password, setPassword] = useState('coby12');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage('Por favor, completa todos los campos');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      setMessage('Autenticación exitosa');
      router.push('/profile/UserProfileScreen');
    } catch (error) {
      setMessage('Fallo en la autenticación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/images/rick/wallpaperLogin.png')}
      style={styles.background}
      resizeMode="cover"
    >
    
      <View style={styles.container}>
        <Image
          source={require('@/assets/images/rick/titleLoginDark.png')}
          style={styles.imageTitle}
          resizeMode="contain"
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          placeholderTextColor="white"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder='Contraseña'
          placeholderTextColor="white"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Ionicons name="log-in" size={24} color="black" />
        </TouchableOpacity>
        {loading && <ActivityIndicator size='large' color='#00ffcc' />}
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  container: {
    width: '90%',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageTitle:{
    width: '100%',
    height: 120,
    marginTop: 5,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',

  },
  title: {
    fontSize: 28,
    color: "#00ffcc",
    marginBottom: 20,
    fontWeight: 'bold',
    marginTop: 20
  },
  input: {
    width: '100%',
    borderColor: '#00ffcc',
    borderWidth: 1,
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: "white",
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    fontFamily: 'rickFont1'
  },
  button: {
    width: '30%',
    height: 50,
    backgroundColor: '#ff5c5c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 30,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    color: 'white',
    marginTop: 20,
  }
})