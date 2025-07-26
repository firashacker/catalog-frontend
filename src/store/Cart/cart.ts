import { create } from "zustand";
//import { persist } from "zustand/middleware";
//import { createJSONStorage } from "zustand/middleware";

// Define the interface of the Cart state
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  categoriesId: number;
}

interface State {
  cart: Product[];
  totalItems: number;
}

// Define the interface of the actions that can be performed in the Cart
interface Actions {
  addToCart: (Item: Product) => void;
  deleteFromCart: (Item: Product) => void;
  clearCart: () => void;
}

// Initialize a default state
const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
};

// Create the store with Zustand, combining the status interface and actions
export const useCartStore = create<State & Actions>()(
  //persist(
  (set, get) => ({
    cart: INITIAL_STATE.cart,
    totalItems: INITIAL_STATE.totalItems,
    clearCart: () => {
      set({ cart: [] });
    },
    addToCart: (product: Product) => {
      const cart = get().cart;
      const cartItem = cart.find((item) => item.id === product.id);

      // If the item already exists in the Cart, increase its quantity
      if (cartItem) {
        return;
      } else {
        const updatedCart = [...cart, { ...product }];

        set((state) => ({
          cart: updatedCart,
          totalItems: state.totalItems + 1,
        }));
      }
      console.log(get().cart);
    },
    deleteFromCart: (product: Product) => {
      set((state) => ({
        cart: state.cart.filter((item) => item.id !== product.id),
        totalItems: state.totalItems - 1,
      }));
      console.log(get().cart);
    },
  }),
  //{ name: "cart", storage: createJSONStorage(() => localStorage) },
  //),
);
