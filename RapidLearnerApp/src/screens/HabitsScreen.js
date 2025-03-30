import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { habits } from '../data/habits';
import { useHabitStore } from '../store/habitStore';

export default function HabitsScreen({ route, navigation }) {
  const { completedHabits, toggleHabitCompletion } = useHabitStore();
  const { categoryId } = route.params;
  const categoryHabits = habits[categoryId] || [];

  const renderDifficultyStars = (difficulty) => {
    return (
      <View className="flex-row mt-1">
        {[...Array(5)].map((_, i) => (
          <FontAwesome
            key={i}
            name={i < difficulty ? 'star' : 'star-o'}
            size={14}
            color={i < difficulty ? '#f59e0b' : '#d1d5db'}
          />
        ))}
      </View>
    );
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <FlatList
        data={categoryHabits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="p-4 mb-3 bg-gray-50 rounded-lg border border-gray-200">
            <View className="flex-row justify-between items-start">
              <Text className="text-lg font-semibold text-gray-800 flex-1">{item.title}</Text>
              <FontAwesome 
                name={completedHabits.includes(item.id) ? "check-circle" : "circle-o"} 
                size={20} 
                color={completedHabits.includes(item.id) ? "#10b981" : "#d1d5db"}
                onPress={() => toggleHabitCompletion(item.id)}
              />
            </View>
            <Text className="text-gray-600 mt-1">{item.description}</Text>
            {item.difficulty && renderDifficultyStars(item.difficulty)}
            <View className="flex-row justify-between mt-3">
              <TouchableOpacity 
                className="px-3 py-1 bg-blue-500 rounded-md"
                onPress={() => navigation.navigate('HabitDetail', { habit: item })}
              >
                <Text className="text-white">Details</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className={`px-3 py-1 rounded-md ${completedHabits.includes(item.id) ? 'bg-gray-400' : 'bg-green-500'}`}
                onPress={() => toggleHabitCompletion(item.id)}
                disabled={completedHabits.includes(item.id)}
              >
                <Text className="text-white">
                  {completedHabits.includes(item.id) ? 'Completed' : 'Complete'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-8">No habits found for this category</Text>
        }
      />
    </View>
  );
}
