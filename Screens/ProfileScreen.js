import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Load saved profile info
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedAvatar = await AsyncStorage.getItem('@profileAvatar');
        const savedName = await AsyncStorage.getItem('@profileName');
        const savedEmail = await AsyncStorage.getItem('@profileEmail');

        if (savedAvatar) setAvatar(savedAvatar);
        if (savedName) setName(savedName);
        if (savedEmail) setEmail(savedEmail);
      } catch (e) {
        console.log('Failed to load profile data', e);
      }
    };
    loadProfile();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Media access is required to select an avatar.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setAvatar(uri);
      await AsyncStorage.setItem('@profileAvatar', uri);
    }
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('@profileName', name);
      await AsyncStorage.setItem('@profileEmail', email);
      Alert.alert('Saved', 'Your profile info was saved successfully!');
    } catch (e) {
      Alert.alert('Error', 'Failed to save profile data.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Your Profile</Text>

        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              avatar
                ? { uri: avatar }
                : require('../assets/default-avatar.png') // Make sure this file exists
            }
            style={styles.avatar}
          />
          <Text style={styles.changeText}>Tap to change avatar</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
        />

        <Button title="Save Profile" onPress={handleSave} color="#42a5f5" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f4faff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ddd',
    marginBottom: 10,
  },
  changeText: {
    fontSize: 14,
    color: '#42a5f5',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});

