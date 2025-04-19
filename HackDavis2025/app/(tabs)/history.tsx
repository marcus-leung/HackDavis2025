import { FlatList, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

// Placeholder data for history
const historyData = [
  { id: '1', name: 'Product A (Scanned Jan 1)' },
  { id: '2', name: 'Product B (Scanned Jan 3)' },
  { id: '3', name: 'Product C (Scanned Jan 5)' },
  // Add more dummy items
];

export default function HistoryScreen() {
  return (
    <ThemedView className="flex-1 pt-12 px-5 bg-gray-100">
      <ThemedText className="text-2xl font-bold mb-5 text-center">Scan History</ThemedText>
      <FlatList
        data={historyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded-lg mb-3 shadow">
            <ThemedText>{item.name}</ThemedText>
          </View>
        )}
        ListEmptyComponent={<ThemedText className="text-center text-gray-500">No scan history yet.</ThemedText>}
      />
    </ThemedView>
  );
} 