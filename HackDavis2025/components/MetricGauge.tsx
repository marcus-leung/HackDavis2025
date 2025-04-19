import React from 'react';
import { View } from 'react-native';
import { ThemedText } from './ThemedText';

interface MetricGaugeProps {
  value: number;
  label: string;
  color?: string; // Keep color prop for dynamic border/text color
}

const MetricGauge: React.FC<MetricGaugeProps> = ({ value, label, color = '#4CAF50' }) => {
  const displayValue = Math.max(0, Math.min(100, value));

  // Note: Tailwind cannot easily set dynamic border/text colors from a prop like this.
  // We keep the inline style for borderColor and color here.
  // Alternatively, map passed color names ('green', 'blue') to Tailwind classes
  // or configure Tailwind theme with these exact color values.
  return (
    <View className="items-center mx-2.5"> {/* mx-2.5 is approx 10px */}
      <View
        className="w-20 h-20 rounded-full border-4 justify-center items-center mb-2"
        style={{ borderColor: color }} // Keep dynamic border color
      >
        <ThemedText
          className="text-lg font-bold"
          style={{ color: color }} // Keep dynamic text color
        >
          {`${displayValue}%`}
        </ThemedText>
      </View>
      <ThemedText className="text-xs text-gray-500 text-center">{label}</ThemedText>
    </View>
  );
};

export default MetricGauge; 