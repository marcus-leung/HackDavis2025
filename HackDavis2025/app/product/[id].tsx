import { View, ScrollView, Image, Button } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // --- Placeholder Data --- (Keep basic info)
  const productName = `Product ${id || 'Details'}`;
  const productImage = 'https://via.placeholder.com/300x200.png?text=Product+Image'; // Placeholder image URL
  const articles = [
    { id: '1', title: 'Article 1: Supply Chain Insights' },
    { id: '2', title: 'Article 2: Environmental Impact Report' },
    { id: '3', title: 'Article 3: Labor Practices Review' },
    { id: '4', title: 'Article 4: Community Engagement Update' },
  ];
  // --- End Placeholder Data ---

  const navigateToSocialGood = () => {
    if (id) {
      router.push(`/socialGood/${id}`);
    }
  };

  const navigateToSustainability = () => {
    if (id) {
      router.push(`/sustainability/${id}`);
    }
  };

  return (
    <ThemedView className="flex-1 bg-gray-100">
      {/* Configure the header title */}
      <Stack.Screen options={{ title: productName }} />

      <ScrollView contentContainerStyle={{ padding: 20, alignItems: 'center' }}>
        <ThemedText className="text-2xl font-bold mb-4 text-center">{productName}</ThemedText>

        <Image
          source={{ uri: productImage }}
          className="w-full h-52 rounded-lg mb-6 bg-gray-300"
          // h-52 is approx 208px
        />

        {/* Buttons to navigate to detail pages */}
        <View className="flex-row justify-around w-full mb-8">
          <Button title="View Social Good Details" onPress={navigateToSocialGood} />
          <Button title="View Sustainability Details" onPress={navigateToSustainability} />
        </View>

        <View className="w-full self-start">
          <ThemedText className="text-lg font-bold mb-2 self-start">Related Articles</ThemedText>
          <View className="w-full self-start">
            {articles.map((article) => (
              <ThemedText key={article.id} className="text-sm mb-2 text-gray-800">
                • {article.title}
              </ThemedText>
            ))}
          </View>
        </View>

      </ScrollView>
    </ThemedView>
  );
} 