import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    const fetchDistance = async () => {
      const response = await axios.get('http://150.162.185.34:3000/distance');
      const lastDistance = response.data[0];
      setDistance(lastDistance);
    };

    fetchDistance();

    const interval = setInterval(fetchDistance, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleGoToSecondScreen = () => {
    navigation.navigate('Second');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-Vindo!</Text>
      <Text style={styles.heading}>Alerta de Segurança! Veja Abaixo</Text>
      {distance !== null ? (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>Alguém chegou perto! Última distância</Text>
          <Text style={styles.distance}>{distance.distance} cm!</Text>
          <Text style={styles.date}>A data foi: {distance.data}</Text>
        </View>
      ) : null}
      <Button title="Ir para a outra tela" onPress={handleGoToSecondScreen} />
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
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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
  distance: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    color: '#007AFF',
  },
});

export default HomeScreen;
