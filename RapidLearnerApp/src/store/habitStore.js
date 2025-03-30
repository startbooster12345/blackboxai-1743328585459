import { create } from 'zustand';

export const useHabitStore = create((set) => ({
  completedHabits: [],
  toggleHabitCompletion: (habitId) => 
    set((state) => ({
      completedHabits: state.completedHabits.includes(habitId)
        ? state.completedHabits.filter(id => id !== habitId)
        : [...state.completedHabits, habitId]
    })),
}));