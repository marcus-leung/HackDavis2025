import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText'; // Assuming ThemedText is in the same directory or setup with alias

interface MetricGaugeProps {
  value: number; // Percentage value (e.g., 85 for 85%)
  label: string;
  color?: string; // Optional color for the gauge/text
}

const MetricGauge: React.FC<MetricGaugeProps> = ({ value, label, color = '#4CAF50' /* Default to green */ }) => {
  // Basic validation
  const displayValue = Math.max(0, Math.min(100, value));

  return (
    <View style={styles.container}>
      <View style={[styles.gauge, { borderColor: color }]}>
        <ThemedText style={[styles.valueText, { color: color }]}>
          {`${displayValue}%`}
        </ThemedText>
      </View>
      <ThemedText style={styles.labelText}>{label}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 10, // Spacing between gauges if placed side-by-side
  },
  gauge: {
    width: 80, // Size of the gauge circle
    height: 80,
    borderRadius: 40, // Make it circular
    borderWidth: 5, // Thickness of the border/gauge line
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8, // Space between gauge and label
  },
  valueText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
});

export default MetricGauge; 