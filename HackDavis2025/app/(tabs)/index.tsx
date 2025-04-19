import { Image, StyleSheet, Platform, Button, Alert } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const handleStartPress = () => {
    // TODO: Implement navigation to the next screen (e.g., scanning screen)
    Alert.alert('Start Pressed', 'Navigate to scan screen...');
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
