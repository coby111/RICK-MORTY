import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface CharacterCardProps {
  character: {
    name: string;
    image: string;
    species: string;
    status: string;
  };
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const getStatusColor = () => {
    switch (character.status.toLowerCase()) {
      case 'alive':
        return '#4caf50';
      case 'dead':
        return '#f44336';
      case 'unknown':
      default:
        return '#9e9e9e';
    }
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <View style={styles.statusContainer}>
        <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
        <Text style={[ styles.status, { color: getStatusColor() }] }>{character.status}</Text>
      </View>
      <Text style={styles.species}>{character.species}</Text>
    </View>
  );
};

interface CharactersListProps {
  characters: CharacterCardProps['character'][];
}

export const CharacterList: React.FC<CharactersListProps> = ({ characters }) => {
  return (
    <View>
      {characters.map((character, index) => (
        <CharacterCard key={index} character={character} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#D0F4F0',
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    margin: "auto",
    alignItems: 'center',
    width: '45%',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2B2D2F',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  status: {
    fontSize: 14,
  },
  species: {
    fontSize: 14,
    color: '#888',
  }
});
