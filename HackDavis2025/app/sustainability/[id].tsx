import { View, ScrollView } from 'react-native';
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
    <ThemedView className="flex-1 bg-gray-100">
      <Stack.Screen options={{ title: `Sustainability - ${productName}` }} />
      <ScrollView contentContainerStyle={{ padding: 20, alignItems: 'center' }}>
        <ThemedText className="text-2xl font-bold mb-1">Sustainability Details</ThemedText>
        <ThemedText className="text-base text-gray-500 mb-6">Metrics for {productName}</ThemedText>

        <View className="flex-row justify-around w-full mb-8">
          <MetricGauge value={carbonFootprintMetric} label="Carbon Footprint" color="#f1c40f" />
          <MetricGauge value={wasteMetric} label="Waste Reduction" color="#1abc9c" />
          {/* Add more gauges for other sustainability metrics */}
        </View>

        <View className="w-full p-4 bg-white rounded-lg mb-5 shadow">
          <ThemedText className="text-lg font-bold mb-2">Detailed Report:</ThemedText>
          <ThemedText className="text-gray-700">
            Placeholder text describing the sustainability aspects, environmental impact, materials used, end-of-life considerations, etc. for Product {id}.
          </ThemedText>
          {/* Add more detailed text, lists, etc. */}
        </View>

      </ScrollView>
    </ThemedView>
  );
} 