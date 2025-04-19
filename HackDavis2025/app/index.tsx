import { StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function StartScreen() {
  const handleStartPress = () => {
    // Navigate to the main app (tabs), starting with the scan tab
    router.replace('/(tabs)/scan'); // Use replace to prevent going back to start screen
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>EthicScope</ThemedText>
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
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 48, // Larger title for start screen
    fontWeight: 'bold',
    marginBottom: 60, // More space below title
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