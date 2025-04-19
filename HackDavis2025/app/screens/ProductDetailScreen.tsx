import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function ProductDetailScreen() {
  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Product Name</ThemedText>
        {/* Placeholder for Globe Image */}
        <View style={styles.imagePlaceholder} />
        {/* Placeholder for Gauges */}
        <View style={styles.gaugePlaceholder} />
        <ThemedText type="subtitle">Related Articles:</ThemedText>
        {/* Placeholder for Articles List */}
        <Text>Article 1</Text>
        <Text>Article 2</Text>
        <Text>Article 3</Text>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imagePlaceholder: {
    height: 200,
    backgroundColor: '#cccccc',
    marginVertical: 15,
  },
  gaugePlaceholder: {
    height: 80,
    backgroundColor: '#eeeeee',
    marginBottom: 15,
  },
}); 