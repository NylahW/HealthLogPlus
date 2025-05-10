
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function LogScreen() {
  const [amount, setAmount] = useState('');
  const [logHistory, setLogHistory] = useState([]); 

  const handleSubmit = async () => {
    if (!amount) {
      Alert.alert('Error', 'Please enter an amount.');
      return;
    }
  
    const newEntry = {
      amount,
      date: new Date().toLocaleString(),
    };
  
    try {
      const existingData = await AsyncStorage.getItem('@waterLogs');
      const logs = existingData ? JSON.parse(existingData) : [];
      logs.push(newEntry);
      await AsyncStorage.setItem('@waterLogs', JSON.stringify(logs));
  
      Alert.alert('Success', `You logged ${amount} oz of water!`);
      setAmount('');
    } catch (error) {
      Alert.alert('Error', 'Failed to save data.');
    }
  };

  const handleClearLogs = async () => {
    try {
      await AsyncStorage.removeItem('@waterLogs');
      setLogHistory([]);
      Alert.alert('Cleared', 'Water log history has been cleared.');
    } catch (error) {
      Alert.alert('Error', 'Failed to clear history.');
    }
  };
  
  

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const saved = await AsyncStorage.getItem('@waterLogs');
        const logs = saved ? JSON.parse(saved) : [];
        setLogHistory(logs);
      } catch (error) {
        Alert.alert('Error', 'Failed to load logs.');
      }
    };
  
    loadLogs();
  }, []);
  


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Your Water Intake</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter oz of water"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Submit" onPress={handleSubmit} />
      <View style={{ marginTop: 30, width: '100%', paddingHorizontal: 20 }}>
  <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Water Log History:</Text>
  {logHistory.map((entry, index) => (
    <Text key={index} style={{ marginBottom: 4 }}>
      {entry.amount} oz at {entry.date}
    </Text>
  ))}
<Button title="Clear History" onPress={handleClearLogs} color="red" />

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
      borderColor: '#aad8d3',
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
      backgroundColor: '#e1f5f2',
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
  
