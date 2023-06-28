import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import axios from 'axios';

const SecondScreen = ({ navigation }) => {
  const [allDistances, setAllDistances] = useState([]);

  useEffect(() => {
    const fetchAllDistances = async () => {
      const response = await axios.get('http://150.162.185.34:3000/distance/all');
      setAllDistances(response.data);
    };

    fetchAllDistances();
  }, []);

  const handleGoToHomeScreen = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todos os Dados</Text>
      {allDistances.length > 0 ? (
        <View>
          {allDistances.map((distance, index) => (
            <View key={index} style={styles.messageContainer}>
              <Text style={styles.message}>Distância: {distance.distance} cm!</Text>
              <Text style={styles.date}>Data: {distance.data}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text>Não há dados disponíveis.</Text>
      )}
      <Button title="Voltar para a tela inicial" onPress={handleGoToHomeScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5FD',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
  },
  messageContainer: {
    borderWidth: 2,
    borderColor: '#0050A0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#D7E6F9',
  },
  message: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    color: '#007AFF',
  },
});

export default SecondScreen;