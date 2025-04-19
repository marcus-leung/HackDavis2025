import { View, Text, Button } from 'react-native';
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
    <ThemedView className="flex-1 items-center justify-around p-5 bg-gray-100">
      <ThemedText className="text-2xl font-bold text-center mb-5">Scan Product</ThemedText>
      <View className="w-11/12 aspect-[3/4] bg-gray-300 justify-center items-center rounded-lg mb-5">
        {/* Using w-11/12 for width: '90%' approximately */}
        <ThemedText className="text-gray-600 text-base">Camera View Placeholder</ThemedText>
        {/* In a real app, Expo Camera would go here */}
      </View>
      <ThemedText className="text-base text-center text-gray-500 mb-8">Point your camera at a barcode or product tag.</ThemedText>
      {/* Temporary button to simulate scan completion */}
      <Button title="Simulate Scan" onPress={handleScanComplete} />
    </ThemedView>
  );
} 