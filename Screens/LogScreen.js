

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function LogScreen() {
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    if (amount) {
      Alert.alert('Success', `You logged ${amount} oz of water!`);
      setAmount('');
    } else {
      Alert.alert('Error', 'Please enter an amount.');
    }
  };

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20
  },
  title: {
    fontSize: 22, marginBottom: 15
  },
  input: {
    width: '80%', borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20, borderRadius: 8
  }
});
