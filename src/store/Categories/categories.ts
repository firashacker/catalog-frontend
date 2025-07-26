import { create } from "zustand";
//import { persist } from "zustand/middleware";
//import { createJSONStorage } from "zustand/middleware";
import apiInstance from "../../lib/axios";

// Define the interface of the Products state
interface Category {
  id: number;
  name: string;
}

interface State {
  categories: Category[];
}

// Define the interface of the actions that can be performed on Products
interface Actions {
  fetchCategories: () => void;
}

// Initialize a default state
const INITIAL_STATE: State = {
  categories: [],
};

export const useCategories = create<State & Actions>()(
  //persist(
  (set) => ({
    categories: INITIAL_STATE.categories,
    fetchCategories: async () => {
      const response = await apiInstance.get(`/api/categories`);
      const fetchedCategories = response.data;
      set({ categories: fetchedCategories });
    },
  }),
  //{ name: "categories", storage: createJSONStorage(() => localStorage) },
  //),
);
