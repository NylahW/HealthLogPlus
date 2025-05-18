import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

export default function SettingsScreen() {
  const [remindersEnabled, setRemindersEnabled] = useState(false);

  useEffect(() => {
    checkPermissions();
    loadReminderSetting();
  }, []);

  // Load saved setting from AsyncStorage
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

  // Check and request notification permissions
  const checkPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      await Notifications.requestPermissionsAsync();
    }
  };

  // Toggle the reminder setting
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

  // Schedule daily notification
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

      <View style={styles.settingItem}>
        <Text style={styles.label}>Profile</Text>
        <Text style={styles.email}>email@example.com</Text>
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
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#555',
  },
});


