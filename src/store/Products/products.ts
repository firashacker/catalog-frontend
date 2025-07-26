import { create } from "zustand";
import apiInstance from "../../lib/axios";

// Define the interface of the Products state
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  categoriesId: number;
}

interface State {
  products: Product[];
}

// Define the interface of the actions that can be performed on Products
interface Actions {
  fetchProducts: () => void;
}

// Initialize a default state
const INITIAL_STATE: State = {
  products: [],
};

export const useProducts = create<State & Actions>()((set) => ({
  products: INITIAL_STATE.products,
  fetchProducts: async () => {
    const response = await apiInstance.get(`/api/products`);
    const fetchedProducts = response.data;
    set({ products: fetchedProducts });
  },
}));
