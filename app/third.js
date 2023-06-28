import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import axios from 'axios';
import { BarChart } from 'react-native-chart-kit';

const ThirdScreen = ({ navigation }) => {
  const [allDistances, setAllDistances] = useState([]);

  useEffect(() => {
    const fetchAllDistances = async () => {
      const response = await axios.get('http://172.20.10.7:3000/distance/all');
      setAllDistances(response.data);
    };

    fetchAllDistances();
  }, []);

  const handleGoToHomeScreen = () => {
    navigation.navigate('Home');
  };

  // Extrai as datas e distâncias para usar no gráfico
  const chartData = allDistances.slice(-10).map((distance) => ({
    date: new Date(distance.data).toLocaleDateString(),
    distance: distance.distance,
  }));

  const labels = chartData.map((data) => data.date);
  const data = chartData.map((data) => data.distance);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gráfico dos últimos 10 dias</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {chartData.length > 0 ? (
          <>
            <BarChart
              data={{
                labels: labels,
                datasets: [
                  {
                    data: data,
                  },
                ],
              }}
              width={350}
              height={400}
              chartConfig={{
                backgroundColor: '#F1F5FD',
                backgroundGradientFrom: '#F1F5FD',
                backgroundGradientTo: '#F1F5FD',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              verticalLabelRotation={30}
            />
            {chartData.map((data, index) => (
              <View key={index} style={styles.messageContainer}>
                <Text style={styles.message}>Distância: {data.distance} cm!</Text>
                <Text style={styles.date}>Data: {data.date}</Text>
              </View>
            ))}
          </>
        ) : (
          <Text>Não há dados disponíveis.</Text>
        )}
      </ScrollView>
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
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 20,
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

export default ThirdScreen;
