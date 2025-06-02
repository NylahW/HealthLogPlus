import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const slides = [
  {
    title: 'Welcome to HealthLog+',
    text: 'Track water, sleep, and exercise to improve your wellness.',
  },
  {
    title: 'Stay on Track',
    text: 'View your progress over time using built-in charts and logs.',
  },
  {
    title: 'Get Started',
    text: 'Start logging now and build healthier habits!',
  },
];

export default function OnboardingScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  const isLastSlide = index === slides.length - 1;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{slides[index].title}</Text>
      <Text style={styles.text}>{slides[index].text}</Text>

      {isLastSlide ? (
        <Button
          title="Get Started"
          onPress={() => navigation.replace('Home')}
        />
      ) : (
        <Button
          title="Next"
          onPress={() => setIndex(prev => prev + 1)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#0077b6',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
});

