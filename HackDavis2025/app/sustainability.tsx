import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function SustainabilityScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Sustainability Metric</ThemedText>
      {/* Placeholder for detailed sustainability metrics */}
      <View style={styles.placeholder} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center', // Align content to top
    padding: 20,
  },
  placeholder: {
    width: '100%',
    height: 400,
    backgroundColor: '#cccccc',
    marginTop: 20,
  },
}); 