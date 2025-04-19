import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function ScanScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Take a pic!</ThemedText>
      {/* Placeholder for camera/image input */}
      <View style={styles.placeholder} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  placeholder: {
    width: 200,
    height: 200,
    backgroundColor: '#cccccc', // Gray placeholder
    marginTop: 20,
  },
}); 