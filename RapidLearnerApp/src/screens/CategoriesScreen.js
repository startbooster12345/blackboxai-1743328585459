import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { categories } from '../data/categories';

export default function CategoriesScreen({ navigation }) {
  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">48 Habits of Rapid Learners</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            className="p-4 mb-4 bg-blue-50 rounded-lg border border-blue-100"
            onPress={() => navigation.navigate('Habits', { 
              categoryId: item.id,
              categoryTitle: item.title 
            })}
          >
            <Text className="text-lg font-bold text-blue-800">{item.title}</Text>
            <Text className="text-gray-600">{item.description}</Text>
            <Text className="text-sm text-gray-500 mt-1">
              {item.habits} key habits
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}