import { StyleSheet, View, Text, Button, Alert, Linking } from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    // Optional: Request permission when component mounts
    // requestPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string, data: string }) => {
    setScanned(true);
    // You might want to check the barcode type here
    Alert.alert('Barcode Scanned!', `Type: ${type}\nData: ${data}`, [
      {
        text: 'Scan Again',
        onPress: () => setScanned(false) // Reset scanned state
      },
      {
        text: 'View Details',
        onPress: () => router.push(`/product/${data}`) // Use scanned data as product ID
      }
    ]);
  };

  // Handle asking for permission explicitly
  const askForPermission = async () => {
    const status = await requestPermission();
    if (!status?.granted) {
      Alert.alert(
        'Permission Required',
        'Camera access is needed to scan barcodes.',
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() }
        ]
      );
    }
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <ThemedView style={styles.container}><ThemedText>Requesting camera permission...</ThemedText></ThemedView>;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={{ textAlign: 'center', color: Colors.light.text }}>We need your permission to show the camera</ThemedText>
        <Button onPress={askForPermission} title="Grant Permission" />
      </ThemedView>
    );
  }

  // Permissions granted, show camera view
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={[styles.title, { color: Colors.light.text }]}>Scan Product</ThemedText>
      <View style={styles.cameraContainer}>
        <CameraView
          style={StyleSheet.absoluteFillObject} // Fill the container
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "ean13", "ean8", "upc_a", "upc_e", "code128"], // Specify types you want to scan
          }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned} // Only process scan if not already processed
        />
      </View>
      <ThemedText style={[styles.instructions, { color: Colors.light.text }]}>
        {scanned ? 'Scan complete!' : 'Point camera at barcode...'}
      </ThemedText>
      {/* Keep simulate button for testing if needed, or remove */}
      {/* <Button title="Simulate Scan (dummy-123)" onPress={() => router.push('/product/dummy-123')} /> */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between', // Adjust layout for camera
    paddingBottom: 80, // Add padding to avoid overlap with potential tab bar blur
    paddingTop: 50,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10, // Add margin top
  },
  cameraContainer: {
    width: '90%',
    aspectRatio: 3 / 4,
    overflow: 'hidden', // Clip CameraView to container bounds
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#000', // Black background while camera loads
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
}); 