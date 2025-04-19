import { StyleSheet, FlatList, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

// Placeholder data for history
const historyData = [
  { id: '1', name: 'Product A (Scanned Jan 1)' },
  { id: '2', name: 'Product B (Scanned Jan 3)' },
  { id: '3', name: 'Product C (Scanned Jan 5)' },
  // Add more dummy items
];

export default function HistoryScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={[styles.title, { color: Colors.light.text }]}>Scan History</ThemedText>
      <FlatList
        data={historyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <ThemedText>{item.name}</ThemedText>
          </View>
        )}
        ListEmptyComponent={<ThemedText style={{ color: Colors.light.text }}>No scan history yet.</ThemedText>}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // Add padding to avoid status bar overlap
    paddingHorizontal: 20,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  historyItem: {
    backgroundColor: Colors.light.card,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
}); 