import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Alert,
  Pressable,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function SettingsScreen() {
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedEnabled = await AsyncStorage.getItem('@dailyReminders');
        const storedTime = await AsyncStorage.getItem('@reminderTime');
        if (storedEnabled !== null) setRemindersEnabled(JSON.parse(storedEnabled));
        if (storedTime !== null) setReminderTime(new Date(storedTime));
      } catch (e) {
        Alert.alert('Error', 'Failed to load settings.');
      }
    };
    loadSettings();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('@dailyReminders', JSON.stringify(remindersEnabled));
    if (remindersEnabled) {
      scheduleDailyReminder();
    } else {
      Notifications.cancelAllScheduledNotificationsAsync();
    }
  }, [remindersEnabled, reminderTime]);

  const scheduleDailyReminder = async () => {
    const permission = await Notifications.requestPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Required', 'Please enable notifications.');
      return;
    }

    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'HealthLog+ Reminder',
        body: "Don't forget to log your health habits today!",
      },
      trigger: {
        hour: reminderTime.getHours(),
        minute: reminderTime.getMinutes(),
        repeats: true,
      },
    });
  };

  const onTimeChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setReminderTime(selectedDate);
      AsyncStorage.setItem('@reminderTime', selectedDate.toISOString());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Daily Reminders</Text>
        <Switch
          value={remindersEnabled}
          onValueChange={setRemindersEnabled}
        />
      </View>

      <Pressable onPress={() => setShowPicker(true)} style={styles.timeButton}>
        <Text style={styles.timeButtonText}>
          Reminder Time: {reminderTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={reminderTime}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onTimeChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  settingText: {
    fontSize: 18,
  },
  timeButton: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  timeButtonText: {
    fontSize: 16,
    color: '#333',
  },
});





