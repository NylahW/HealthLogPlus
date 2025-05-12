import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';

export default function SleepScreen() {
  const [hours, setHours] = useState('');
  const [logHistory, setLogHistory] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  const handleSubmit = async () => {
    if (!hours) {
      Alert.alert('Error', 'Please enter hours of sleep.');
      return;
    }

    const newEntry = {
      hours,
      date: new Date().toISOString(),
    };

    try {
      const existing = await AsyncStorage.getItem('@sleepLogs');
      const logs = existing ? JSON.parse(existing) : [];
      logs.push(newEntry);
      await AsyncStorage.setItem('@sleepLogs', JSON.stringify(logs));

      Alert.alert('Logged', `You recorded ${hours} hours of sleep.`);
      setHours('');
      setLogHistory(logs);
    } catch (error) {
      Alert.alert('Error', 'Failed to save data.');
    }
  };

  const handleClearLogs = async () => {
    try {
      await AsyncStorage.removeItem('@sleepLogs');
      setLogHistory([]);
      setMarkedDates({});
      Alert.alert('Cleared', 'Sleep log history has been cleared.');
    } catch (error) {
      Alert.alert('Error', 'Failed to clear sleep history.');
    }
  };

  const loadLogs = async () => {
    try {
      const saved = await AsyncStorage.getItem('@sleepLogs');
      const logs = saved ? JSON.parse(saved) : [];
      setLogHistory(logs);

      const marks = {};
      logs.forEach((entry) => {
        const dateKey = new Date(entry.date).toISOString().split('T')[0];
        const sleepHours = parseFloat(entry.hours);

        marks[dateKey] = {
          customStyles: {
            container: {
              backgroundColor: sleepHours < 8 ? '#ff5252' : '#42a5f5',
              borderRadius: 5,
            },
            text: {
              color: 'white',
              fontWeight: 'bold',
            },
          },
        };
      });

      setMarkedDates(marks);
    } catch (error) {
      Alert.alert('Error', 'Failed to load sleep logs.');
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Log Your Sleep</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter hours slept"
            keyboardType="numeric"
            value={hours}
            onChangeText={setHours}
          />

          <Button title="Submit" onPress={handleSubmit} color="#42a5f5" />

          <Calendar
            markingType="custom"
            markedDates={markedDates}
            onDayPress={(day) => {
              const selectedDate = day.dateString;
              const entry = logHistory.find((e) =>
                new Date(e.date).toISOString().startsWith(selectedDate)
              );
              if (entry) {
                Alert.alert('Sleep Entry', `${entry.hours} hours on ${entry.date}`);
              } else {
                Alert.alert('No Data', 'No sleep data for this day.');
              }
            }}
            style={{ marginVertical: 20 }}
          />

          <View style={styles.historySection}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Sleep History:</Text>
            {logHistory.map((entry, index) => (
              <View key={index} style={styles.logItem}>
                <Text style={styles.logText}>
                  {entry.hours} hours on {entry.date}
                </Text>
              </View>
            ))}

            <View style={styles.clearButton}>
              <Button title="Clear History" onPress={handleClearLogs} color="#ff5252" />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4faff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#a2c8f2',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  historySection: {
    marginTop: 30,
    width: '100%',
    paddingHorizontal: 20,
  },
  logItem: {
    backgroundColor: '#e3f0fd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  logText: {
    color: '#333',
  },
  clearButton: {
    marginTop: 10,
  },
});