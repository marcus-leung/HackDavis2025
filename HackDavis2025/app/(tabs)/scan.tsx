import { StyleSheet, View, Text, Button } from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function ScanScreen() {

  const handleScanComplete = () => {
    // Simulate scanning and navigate to a product page
    // In a real app, this would be triggered by the camera/barcode scanner
    const productId = 'dummy-product-123'; // Example product ID
    router.push(`/product/${productId}`);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Scan Product</ThemedText>
      <View style={styles.cameraPlaceholder}>
        <ThemedText style={styles.placeholderText}>Camera View Placeholder</ThemedText>
        {/* In a real app, Expo Camera would go here */}
      </View>
      <ThemedText style={styles.instructions}>Point your camera at a barcode or product tag.</ThemedText>
      {/* Temporary button to simulate scan completion */}
      <Button title="Simulate Scan" onPress={handleScanComplete} />
      {/* Remove Back button as it doesn't make sense in a tab root */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around', // Distribute space
    padding: 20,
    backgroundColor: '#f0f0f0', // Consistent background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  cameraPlaceholder: {
    width: '90%',
    aspectRatio: 3 / 4, // Typical camera aspect ratio
    backgroundColor: '#cccccc', // Grey placeholder color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  placeholderText: {
    color: '#555555',
    fontSize: 16,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 30,
  },
}); 