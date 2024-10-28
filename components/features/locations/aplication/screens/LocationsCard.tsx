
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
interface LocationsProps {
  location: {
    name: string;
    type: string;
    dimension: string;
  };
}

export const LocationCard: React.FC<LocationsProps> = ({ location }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{location.name}</Text>
      <Text style={styles.type}>Type: {location.type}</Text>
      <Text style={styles.dimension}>Dimension: {location.dimension}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FDFD96',
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
    color: '#333',
  },
  type: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  dimension: {
    fontSize: 14,
    color: '#FF4081',
    marginTop: 5,
  },
});