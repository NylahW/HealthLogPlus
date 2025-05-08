import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>HealthLog+ Home</Text>
      <Button title="Log Water" onPress={() => navigation.navigate('Log')} />
      <Button title="Log Sleep" onPress={() => navigation.navigate('Sleep')} />
      <Button title="Log Exercise" onPress={() => navigation.navigate('Exercise')} />
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
}
