import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, ScrollView, View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { fetchCharacters } from '@components/features/chracters/domain/datasources/CharactersDatasource';
import { CharacterCard } from '@components/features/chracters/application/screens/CharacterCard';
import { CharactersProvider } from "@components/features/chracters/application/providers/CharactersProvider";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { BlurView } from 'expo-blur';

function CharactersListScreen() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const loadCharacters = async (page: number) => {
    setLoading(true);
    const data = await fetchCharacters(page);
    setCharacters(data.results);
    setTotalPages(data.info.pages);
    setLoading(false);
  }

  useEffect(() => {
    loadCharacters(page);
  }, [page]);

  const handleLogOut = () => {
    router.push('/auth/login');
  }

  const handleHome = () => {
    router.push('/home');
  }

  return (
    <ImageBackground
      source={require('@/assets/images/rick/wallpaperCharacter.png')}
      style={styles.background}
    >
      <BlurView intensity={70} style={styles.containerTitle} tint="systemChromeMaterialLight">
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
      </BlurView>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>


            <View style={styles.row}>
              {characters.map((character, index) => (
                <CharacterCard key={index} character={character} />
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
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerTitle: {
    width: "100%",
    height: 100,
    position: 'absolute',
    top: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageTitle: {
    width: "70%",
    height: 150,
    marginTop: 25,
    justifyContent: 'center',
  },
  buttonLogOut: {
    marginRight: 5
  },
  buttonHome: {
    marginLeft: 5
  },
  scrollContent:{
    paddingTop: 100
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    borderRadius: 10,
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginTop: 10,
    marginBottom: 10
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
    color: '#333',
  }
});

export default function CharactersScreenWrapper() {
  return (
    <CharactersProvider>
      <CharactersListScreen />
    </CharactersProvider>
  );
}
