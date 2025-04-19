import { StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

export default function StartScreen() {
  const handleStartPress = () => {
    // Navigate to the main app (tabs), starting with the scan tab
    router.replace('/(tabs)/scan'); // Use replace to prevent going back to start screen
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={[styles.title, { color: Colors.light.text }]}>EthicScope</ThemedText>
      <ThemedText style={[styles.subtitle, { color: Colors.light.text }]}>Discover the impact</ThemedText>
      <TouchableOpacity onPress={handleStartPress} style={styles.startButton}>
        <ThemedText style={styles.startButtonText}>Start</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    padding: 20,
  },
  title: {
    fontSize: 48, // Larger title for start screen
    fontWeight: 'bold',
    marginBottom: 10, // Adjust spacing for subtitle
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'gray', // Default color, will be overridden by inline style
    marginBottom: 60,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
}); 