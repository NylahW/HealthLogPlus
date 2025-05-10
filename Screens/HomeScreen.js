import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to HealthLog+</Text>
  
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
      marginBottom: 30
    },
    buttonWrapper: {
      marginBottom: 15,
      width: '80%',
      borderRadius: 10,
      overflow: 'hidden'
    }
  });
