import { View, ScrollView } from 'react-native';
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
    <ThemedView className="flex-1 bg-gray-100">
      <Stack.Screen options={{ title: `Social Good - ${productName}` }} />
      <ScrollView contentContainerStyle={{ padding: 20, alignItems: 'center' }}>
        <ThemedText className="text-2xl font-bold mb-1">Social Good Details</ThemedText>
        <ThemedText className="text-base text-gray-500 mb-6">Metrics for {productName}</ThemedText>

        <View className="flex-row justify-around w-full mb-8">
          <MetricGauge value={laborMetric} label="Fair Labor" color="#3498db" />
          <MetricGauge value={transparencyMetric} label="Supply Chain Transparency" color="#9b59b6" />
          {/* Add more gauges for other social metrics */}
        </View>

        <View className="w-full p-4 bg-white rounded-lg mb-5 shadow">
          <ThemedText className="text-lg font-bold mb-2">Detailed Report:</ThemedText>
          <ThemedText className="text-gray-700">
            Placeholder text describing the social good aspects, labor conditions, certifications, known issues, etc. for Product {id}.
          </ThemedText>
          {/* Add more detailed text, lists, etc. */}
        </View>

      </ScrollView>
    </ThemedView>
  );
} 