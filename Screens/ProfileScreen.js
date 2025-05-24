import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [name, setName] = useState('');

  useEffect(() => {
    const loadName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('@userName');
        if (storedName) setName(storedName);
      } catch (e) {
        Alert.alert('Error', 'Failed to load profile name.');
      }
    };
    loadName();
  }, []);

  const saveName = async () => {
    try {
      await AsyncStorage.setItem('@userName', name);
      Alert.alert('Saved', 'Your name has been saved!');
    } catch (e) {
      Alert.alert('Error', 'Failed to save name.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {/* Avatar Placeholder */}
      <Image
        source={require('../assets/avatar.png')} // Replace or customize this
        style={styles.avatar}
      />

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="Enter your name"
      />
      <Button title="Save" onPress={saveName} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#f4faff',
  },
  title: {
    fontSize: 26, fontWeight: 'bold', marginBottom: 20
  },
  label: {
    fontSize: 18, marginTop: 20
  },
  input: {
    width: '80%', padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, marginBottom: 20, backgroundColor: '#fff'
  },
  avatar: {
    width: 100, height: 100, borderRadius: 50, marginBottom: 20
  }
});
