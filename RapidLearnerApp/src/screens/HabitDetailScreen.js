import { View, Text, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function HabitDetailScreen({ route }) {
  const { habit } = route.params;

  const renderDifficultyStars = (difficulty) => {
    return (
      <View className="flex-row mt-2">
        {[...Array(5)].map((_, i) => (
          <FontAwesome
            key={i}
            name={i < difficulty ? 'star' : 'star-o'}
            size={20}
            color={i < difficulty ? '#f59e0b' : '#d1d5db'}
          />
        ))}
      </View>
    );
  };

  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <View className="mb-6">
        <Text className="text-2xl font-bold">{habit.title}</Text>
        <Text className="text-gray-600 mt-2">{habit.description}</Text>
        
        {habit.difficulty && (
          <View className="mt-4">
            <Text className="text-gray-500">Difficulty:</Text>
            {renderDifficultyStars(habit.difficulty)}
          </View>
        )}
      </View>

      {habit.resources && habit.resources.length > 0 && (
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2">Resources</Text>
          {habit.resources.map((resource, index) => (
            <TouchableOpacity
              key={index}
              className="py-2 flex-row items-center"
              onPress={() => Linking.openURL(resource.url)}
            >
              <FontAwesome name="external-link" size={16} color="#3b82f6" />
              <Text className="text-blue-500 ml-2">{resource.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View className="mb-6">
        <Text className="text-lg font-semibold mb-2">Implementation Tips</Text>
        {habit.tips && habit.tips.length > 0 ? (
          habit.tips.map((tip, index) => (
            <View key={index} className="flex-row items-start mb-2">
              <Text className="text-gray-500 mr-2">•</Text>
              <Text className="text-gray-700 flex-1">{tip}</Text>
            </View>
          ))
        ) : (
          <Text className="text-gray-500">No tips available yet</Text>
        )}
      </View>
    </ScrollView>
  );
}
