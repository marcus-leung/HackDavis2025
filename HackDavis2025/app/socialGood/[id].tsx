import { StyleSheet, View, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import MetricGauge from '@/components/MetricGauge'; // Use the gauge here

export default function SocialGoodScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // --- Placeholder Data ---
  const productName = `Product ${id || 'Details'}`;
  const laborMetric = 80;
  const transparencyMetric = 65;
  // Add more specific metrics as needed
  // ---

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: `Social Good - ${productName}` }} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedText type="title" style={styles.title}>Social Good Details</ThemedText>
        <ThemedText style={styles.subtitle}>Metrics for {productName}</ThemedText>

        <View style={styles.metricsContainer}>
          <MetricGauge value={laborMetric} label="Fair Labor" color="#3498db" />
          <MetricGauge value={transparencyMetric} label="Supply Chain Transparency" color="#9b59b6" />
          {/* Add more gauges for other social metrics */}
        </View>

        <View style={styles.infoSection}>
          <ThemedText type="subtitle">Detailed Report:</ThemedText>
          <ThemedText>Placeholder text describing the social good aspects, labor conditions, certifications, known issues, etc. for Product {id}.</ThemedText>
          {/* Add more detailed text, lists, etc. */}
        </View>

      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 25,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  infoSection: {
    width: '100%',
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 20,
  },
}); 