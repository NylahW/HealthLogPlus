import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SleepScreen() {
    const [hours, setHours] = useState('');
    const [logHistory, setLogHistory] = useState([]);

    const handleSubmit = async () => {
        if (!hours) {
          Alert.alert('Error', 'Please enter hours of sleep.');
          return;
        }
    
        const newEntry = {
          hours,
          date: new Date().toLocaleString(),
        };
        try {
            const existing = await AsyncStorage.getItem('@sleepLogs');
            const logs = existing ? JSON.parse(existing) : [];
            logs.push(newEntry);
            await AsyncStorage.setItem('@sleepLogs', JSON.stringify(logs));
      
            Alert.alert('Logged', `You recorded ${hours} hours of sleep.`);
            setHours('');
            setLogHistory(logs); // update screen in real time
          } catch (error) {
            Alert.alert('Error', 'Failed to save data.');
          }
        };
        const handleClearLogs = async () => {
            try {
              await AsyncStorage.removeItem('@sleepLogs');
              setLogHistory([]);
              Alert.alert('Cleared', 'Sleep log history has been cleared.');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear sleep history.');
            }
          };
        
          useEffect(() => {
            loadLogs();
          }, []);
          return (
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
          );
        }
        
        const styles = StyleSheet.create({
          container: {
            flex: 1,
            backgroundColor: '#f4faff',
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center'
          },
          title: {
            fontSize: 26,
            fontWeight: 'bold',
            marginBottom: 20,
            color: '#333'
          },
          input: {
            width: '80%',
            borderWidth: 1,
            borderColor: '#a2c8f2',
            padding: 12,
            borderRadius: 10,
            marginBottom: 20,
            backgroundColor: '#fff'
          },
          historySection: {
            marginTop: 30,
            width: '100%',
            paddingHorizontal: 20
          },
          logItem: {
            backgroundColor: '#e3f0fd',
            padding: 10,
            borderRadius: 8,
            marginBottom: 8
          },
          logText: {
            color: '#333'
          },
          clearButton: {
            marginTop: 10
          }
        });

