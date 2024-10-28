import React, { useEffect, useState } from 'react';
import { fetchLocations } from '@components/features/locations/domain/datasources/LocationDataSource';
import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { LocationCard } from '@components/features/locations/aplication/screens/LocationsCard';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export const LocationsListsScreen: React.FC = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const loadLocations = async (page: number) => {
    setLoading(true);
    const data = await fetchLocations(page);
    setLocations(data.locations);
    setTotalPages(data.info.pages);
    setLoading(false);
  };

  useEffect(() => {
    loadLocations(page);
  }, [page]);

  const handleLogOut = () => {
    router.push('/auth/login');
  }

  const handleHome = () => {
    router.push('/home');
  }

  return (
    <ImageBackground
      source={require('@assets/images/rick/morty.jpg')}
      style={styles.background}
      resizeMode='cover'
    >
      <ScrollView style={styles.container}>
        {loading ? (
          <ActivityIndicator size='large' color="#0000ff" />
        ) : (
          <>
            <View style={styles.containerTitle}>
              <TouchableOpacity style={styles.buttonLogOut} onPress={handleLogOut}>
                <Ionicons
                  name="log-out"
                  size={45}
                  color='#00897b'
                />
              </TouchableOpacity>

              <Image
                source={require('@assets/images/rick/titleCharacter.png')}
                style={styles.imageTitle}
                resizeMode="contain"
              />

              <TouchableOpacity style={styles.buttonHome} onPress={handleHome}>
                <Ionicons
                  name="home"
                  size={40}
                  color='#00897b'
                />
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              {locations.map((location, index) => (
                <LocationCard key={index} location={location} />
              ))}
            </View>
            <View style={styles.pagination}>
              <TouchableOpacity
                style={[styles.button, styles.previousButton, { backgroundColor: '#00bfae' }]}
                onPress={() => setPage(prev => (prev > 1 ? prev - 1 : prev))}
                disabled={page <= 1}
              >
                <Text style={styles.buttonText}>Previous</Text>
              </TouchableOpacity>

              <Text style={styles.pageInfo}>
                Page {page} of {totalPages}
              </Text>

              <TouchableOpacity
                style={[styles.button, styles.nextButton, { backgroundColor: '#b535f5' }]}
                onPress={() => setPage(prev => (prev < totalPages ? prev + 1 : prev))}
                disabled={page >= totalPages}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </>
        )
        }
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginTop: 15,
  },
  containerTitle: {
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageTitle: {
    width: "70%",
    height: 130,
    marginTop: 5,
    justifyContent: 'center',
  },
  buttonLogOut: {
    marginRight: 5
  },
  buttonHome: {
    marginLeft: 5
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    borderRadius: 10,
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previousButton: {
    backgroundColor: '#00bfae',
  },
  nextButton: {
    backgroundColor: '#b535f5',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  pageInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  }
});


export default LocationsListsScreen;