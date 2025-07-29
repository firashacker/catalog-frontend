import { create } from "zustand";
import apiInstance from "../../lib/axios";
import { type Material } from "../Materials/materials";

// Define the interface of the Products state

export interface ProductsMaterials {
  id: number;
  productId: number;
  materialId: number;
  material: Material;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  categoriesId: number;
  ProductsMaterials: ProductsMaterials[];
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
