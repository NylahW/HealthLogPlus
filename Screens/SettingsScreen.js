import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

export default function SettingsScreen() {
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    checkPermissions();
    loadReminderSetting();
    loadProfile();
  }, []);

  const checkPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      await Notifications.requestPermissionsAsync();
    }
  };

  const loadReminderSetting = async () => {
    try {
      const savedValue = await AsyncStorage.getItem('@reminderEnabled');
      if (savedValue !== null) {
        const enabled = savedValue === 'true';
        setRemindersEnabled(enabled);
        if (enabled) scheduleDailyReminder();
      }
    } catch (error) {
      console.log('Failed to load reminder setting:', error);
    }
  };

  const toggleReminders = async (value) => {
    try {
      setRemindersEnabled(value);
      await AsyncStorage.setItem('@reminderEnabled', value.toString());

      if (value) {
        await scheduleDailyReminder();
        Alert.alert('Reminder Enabled', 'Daily reminder set for 8:00 AM.');
      } else {
        await Notifications.cancelAllScheduledNotificationsAsync();
        Alert.alert('Reminder Disabled', 'Daily reminders turned off.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update reminder setting.');
    }
  };

  const scheduleDailyReminder = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Don't forget to log!",
        body: 'Remember to track your health today 🌟',
      },
      trigger: {
        hour: 8,
        minute: 0,
        repeats: true,
      },
    });
  };

  const loadProfile = async () => {
    try {
      const savedName = await AsyncStorage.getItem('@profileName');
      const savedEmail = await AsyncStorage.getItem('@profileEmail');
      if (savedName) setName(savedName);
      if (savedEmail) setEmail(savedEmail);
    } catch (e) {
      console.log("Failed to load profile.");
    }
  };

  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem('@profileName', name);
      await AsyncStorage.setItem('@profileEmail', email);
      Alert.alert("Saved", "Profile updated.");
    } catch (e) {
      Alert.alert("Error", "Failed to save profile.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingItem}>
        <Text style={styles.label}>Reminders</Text>
        <Switch
          value={remindersEnabled}
          onValueChange={toggleReminders}
          thumbColor={remindersEnabled ? '#42a5f5' : '#ccc'}
        />
      </View>

      <View style={styles.profileContainer}>
        <Text style={styles.sectionTitle}>Profile</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Button title="Save Profile" onPress={saveProfile} color="#42a5f5" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9f0',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
  },
  profileContainer: {
    marginTop: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
});



