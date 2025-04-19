import { StyleSheet, View, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import MetricGauge from '@/components/MetricGauge'; // Use the gauge here

export default function SustainabilityScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // --- Placeholder Data ---
  const productName = `Product ${id || 'Details'}`;
  const carbonFootprintMetric = 55;
  const wasteMetric = 70;
  // Add more specific metrics as needed
  // ---

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: `Sustainability - ${productName}` }} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedText type="title" style={styles.title}>Sustainability Details</ThemedText>
        <ThemedText style={styles.subtitle}>Metrics for {productName}</ThemedText>

        <View style={styles.metricsContainer}>
          <MetricGauge value={carbonFootprintMetric} label="Carbon Footprint" color="#f1c40f" />
          <MetricGauge value={wasteMetric} label="Waste Reduction" color="#1abc9c" />
          {/* Add more gauges for other sustainability metrics */}
        </View>

        <View style={styles.infoSection}>
          <ThemedText type="subtitle">Detailed Report:</ThemedText>
          <ThemedText>Placeholder text describing the sustainability aspects, environmental impact, materials used, end-of-life considerations, etc. for Product {id}.</ThemedText>
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