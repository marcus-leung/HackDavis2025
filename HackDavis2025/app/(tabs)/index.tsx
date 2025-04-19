import { StyleSheet, Button } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const handleStartPress = () => {
    // Navigate to the scan screen using its file path
    router.push('/scan');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>EthicScope</ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}>Discover the impact</ThemedText>
      <Button
        title="Start"
        onPress={handleStartPress}
        color="#4CAF50" // Green color like Figma
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up full screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    padding: 20, // Add some padding
  },
  title: {
    fontSize: 32, // Larger font size for title
    marginBottom: 10, // Space below title
  },
  subtitle: {
    fontSize: 18, // Font size for subtitle
    marginBottom: 30, // Space below subtitle before button
    color: 'gray', // Subdued color
  },
  // Remove unused styles
  // titleContainer: { ... }
  // stepContainer: { ... }
  // reactLogo: { ... }
});
