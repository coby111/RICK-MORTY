import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const router = useRouter()


  const navigateToCharacters = () => {
    router.push('/characters/CharactersListScreen')
  }

  const navigateToEpisodes = () => {
    router.push('/episodes/EpisodesListsScreen')
  }

  const navigateToLocations = () => {
    router.push('/locations/LocationsListsScreen')
  }

  const handleLogOut = () => {
    router.push('/auth/login');
  }

  const handleProfile = () => {
    router.push('/profile/UserProfileScreen');
  }



  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <TouchableOpacity style={styles.buttonLogOut} onPress={handleLogOut}>
          <Ionicons
            name="log-out"
            size={40}
            color='#97fb9b'
          />
        </TouchableOpacity>

        <Image
          source={require('@/assets/images/rick/titleHomeDark.png')}
          style={styles.imageTitle}
          resizeMode="contain" />

        <TouchableOpacity style={styles.buttonProfile} onPress={handleProfile} >
          <Ionicons
            name="person-circle"
            size={45}
            color='#97fb9b' />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.card}
        onPress={navigateToCharacters}
      >
        <ImageBackground
          source={require('@/assets/images/rick/charactersCard.webp')}
          style={styles.cardImage}
          imageStyle={{ opacity: 0.7 }}
        >
          <Text style={styles.cardText}>Personajes</Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={navigateToEpisodes}
      >
        <ImageBackground
          source={require('@/assets/images/rick/episodesCard.webp')}
          style={styles.cardImage}
          imageStyle={{ opacity: 0.7 }}
        >
          <Text style={styles.cardText}>Episodios</Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={navigateToLocations}
      >
        <ImageBackground
          source={require('@/assets/images/rick/locationsCard.webp')}
          style={styles.cardImage}
          imageStyle={{ opacity: 0.7 }}
        >
          <Text style={styles.cardText}>Ubicaciones</Text>
        </ImageBackground>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#1a1a1a",
    padding: 20,
  },
  containerTitle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageTitle: {
    width: "75%",
    height: 140,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonProfile: {
    marginLeft: 10
  },
  buttonLogOut: {
    marginRight: 10
  },
  card: {
    width: "100%",
    height: 150,
    marginBottom: 30,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: 'white',
    fontFamily: "rickFont1",
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
})