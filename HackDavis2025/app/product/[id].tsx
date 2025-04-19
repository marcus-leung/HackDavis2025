import { StyleSheet, View, ScrollView, Image, Button } from 'react-native';
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
    <ThemedView style={styles.container}>
      {/* Configure the header title */}
      <Stack.Screen options={{ title: productName }} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedText type="title" style={styles.productName}>{productName}</ThemedText>

        <Image source={{ uri: productImage }} style={styles.productImage} />

        {/* Buttons to navigate to detail pages */}
        <View style={styles.buttonContainer}>
          <Button title="View Social Good Details" onPress={navigateToSocialGood} />
          <Button title="View Sustainability Details" onPress={navigateToSustainability} />
        </View>

        <ThemedText type="subtitle" style={styles.articlesHeader}>Related Articles</ThemedText>
        <View style={styles.articlesList}>
          {articles.map((article) => (
            <ThemedText key={article.id} style={styles.articleItem}>
              • {article.title}
            </ThemedText>
          ))}
        </View>

      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Consistent background
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 25,
    backgroundColor: '#cccccc', // Background while loading
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  articlesHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start', // Align header to the left
  },
  articlesList: {
    width: '100%',
    alignSelf: 'flex-start', // Align list items to the left
  },
  articleItem: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },
}); 