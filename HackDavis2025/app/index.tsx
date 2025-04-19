import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function StartScreen() {
  const handleStartPress = () => {
    // Navigate to the main app (tabs), starting with the scan tab
    router.replace('/(tabs)/scan'); // Use replace to prevent going back to start screen
  };

  return (
    <ThemedView className="flex-1 justify-center items-center bg-gray-100 p-5">
      <ThemedText className="text-5xl font-bold mb-16">EthicScope</ThemedText>
      <TouchableOpacity
        onPress={handleStartPress}
        className="bg-green-500 w-32 h-32 rounded-full justify-center items-center shadow-lg"
        // Using w-32/h-32 for ~128px, adjust if needed
      >
        <ThemedText className="text-white text-2xl font-bold">Start</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
} 