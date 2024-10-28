import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EpisodeCardProps {
  episode: {
    name: string;
    air_date: string;
    episode: string;
  };
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{episode.name}</Text>
      <Text style={styles.airDate}>Air Date: {episode.air_date}</Text>
      <Text style={styles.episodeNumber}>Episode: {episode.episode}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    margin: 'auto',
    width: "45%",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center",
    color: '#000',
  },
  airDate: {
    fontSize: 14,
    color: '#00bfae',
    marginTop: 5,
  },
  episodeNumber: {
    fontSize: 14,
    color: '#FF4081',
    marginTop: 5,
  },
});