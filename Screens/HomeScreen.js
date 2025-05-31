import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getRandomQuote } from '../utils/motivationUtils';

export default function HomeScreen({ navigation }) {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    setQuote(getRandomQuote()); // initial quote

    const interval = setInterval(() => {
      setQuote(getRandomQuote());
    }, 6000); // rotate every 6 seconds

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to HealthLog+</Text>

      <Text style={styles.quoteText}>
        "{quote}"
      </Text>

      <View style={styles.buttonWrapper}>
        <Button
          title="Log Water"
          onPress={() => navigation.navigate('Log')}
          color="#00bfa6"
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title="Log Sleep"
          onPress={() => navigation.navigate('Sleep')}
          color="#42a5f5"
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title="Log Exercise"
          onPress={() => navigation.navigate('Exercise')}
          color="#7e57c2"
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
          color="#607d8b"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4faff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonWrapper: {
    marginBottom: 15,
    width: '80%',
    borderRadius: 10,
    overflow: 'hidden'
  }
});

