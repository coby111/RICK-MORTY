import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@components/features/auth/aplication/provider/SessionProvider';
import { ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function UserProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  const handleHome = async () => {
    router.push('/home');
  }

  return (
    <ImageBackground
      source={require('@assets/images/rick/wallpaperProfile.png')}
      style={styles.background}
      resizeMode='cover'
      imageStyle={{ opacity: 0.6 }}
    >
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <TouchableOpacity style={styles.buttonLogOut} onPress={handleLogout}>
            <Ionicons
              name='log-out'
              size={40}
              color='#97fb9b' />
          </TouchableOpacity>

          <Image
            source={require('@assets/images/rick/welcomeProfile.png')}
            style={styles.imageTitle}
            resizeMode="contain"
          />

          <TouchableOpacity style={styles.buttonHome} onPress={handleHome}>
            <Ionicons
              name='home'
              size={35}
              color='#97fb9b' />
          </TouchableOpacity>

        </View>

        <View style={styles.containerAvatar}>
          <Image
            style={styles.avatar}
            source={require('@assets/images/rick/rickProfile.jpg')}
          />
        </View>

        <Text style={styles.name}>{user?.email}</Text>

        <View style={styles.socialMedia}>
          <Ionicons
            name="logo-twitter"
            size={40}
            color="#87ceeb">
          </Ionicons>

          <Ionicons
            name="logo-facebook"
            size={40}
            color="#87ceeb">
          </Ionicons>

          <Ionicons
            name="logo-linkedin"
            size={40}
            color="#87ceeb">
          </Ionicons>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Multidisciplinary designer who creates characteres,
            enviroments and concepts for Films, Animation
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTitle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonLogOut: {
    marginRight: 10
  },
  buttonHome: {
    marginLeft: 10
  },
  container: {
    width: '90%',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    width: "70%",
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerAvatar: {
    position: 'relative',
    width: 160,
    height: 160,
    marginBottom: 20
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: '#1a1a11'
  },
  name: {
    fontSize: 30,
    color: "yellow",
    fontWeight: "bold",
    marginTop: 10
  },
  socialMedia: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginTop: 20
  },
  descriptionContainer: {
    marginTop: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  description: {
    fontSize: 16,
    color: "white",
    textAlign: "justify",
    marginBottom: 10
  }
});
