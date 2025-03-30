import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import CategoriesScreen from './src/screens/CategoriesScreen';
import HabitsScreen from './src/screens/HabitsScreen';
import HabitDetailScreen from './src/screens/HabitDetailScreen';
import ProgressScreen from './src/screens/ProgressScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HabitsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Categories" 
        component={CategoriesScreen} 
        options={{ title: '48 Habits of Rapid Learners' }} 
      />
      <Stack.Screen 
        name="Habits" 
        component={HabitsScreen} 
        options={({ route }) => ({ 
          title: route.params.categoryTitle || 'Habits' 
        })} 
      />
      <Stack.Screen 
        name="HabitDetail" 
        component={HabitDetailScreen} 
        options={({ route }) => ({ 
          title: route.params.habit?.title || 'Habit Details' 
        })} 
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Habits') {
              iconName = focused ? 'list-alt' : 'list';
            } else if (route.name === 'Progress') {
              iconName = focused ? 'chart-bar' : 'bar-chart';
            }
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#3b82f6',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen 
          name="Habits" 
          component={HabitsStack} 
          options={{ headerShown: false }} 
        />
        <Tab.Screen name="Progress" component={ProgressScreen} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}