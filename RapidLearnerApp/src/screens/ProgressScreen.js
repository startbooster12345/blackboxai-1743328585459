import { View, Text, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { categories } from '../data/categories';
import { useHabitStore } from '../store/habitStore';

export default function ProgressScreen() {
  const { completedHabits } = useHabitStore();

  const calculateCategoryProgress = (categoryId) => {
    const totalHabits = categories.find(c => c.id === categoryId)?.habits || 0;
    const completed = completedHabits.filter(id => id.startsWith(`${categoryId}-`)).length;
    return totalHabits > 0 ? Math.round((completed / totalHabits) * 100) : 0;
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-6">Your Learning Progress</Text>
      
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const progress = calculateCategoryProgress(item.id);
          return (
            <View className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-lg font-semibold">{item.title}</Text>
                <Text className="text-blue-600">{progress}%</Text>
              </View>
              <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <View 
                  className="h-full bg-blue-500" 
                  style={{ width: `${progress}%` }}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}