import { create } from "zustand";
import apiInstance from "../../lib/axios";

// Define the interface of the Products state
export interface ProductsOrders {
  id: number;
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
  orders?: any[];
}

interface State {
  productsOrders: ProductsOrders[];
  currentOrderId: number;
  totalSales: number;
}

// Define the interface of the actions that can be performed on Products
interface Actions {
  fetchProductsOrders: () => void;
  calculateTotalSales: () => void;
  setCurrentOrderId: (id: number) => void;
}

// Initialize a default state
const INITIAL_STATE: State = {
  productsOrders: [],
  currentOrderId: 0,
  totalSales: 0,
};

export const useOrders = create<State & Actions>()((set, get) => ({
  productsOrders: INITIAL_STATE.productsOrders,
  currentOrderId: INITIAL_STATE.currentOrderId,
  totalSales: INITIAL_STATE.totalSales,
  calculateTotalSales: () => {
    let Total = 0;
    get().productsOrders.map((order) => (Total += Number(order.totalPrice)));
    //console.log(Total);
    set({ totalSales: Total });
  },
  setCurrentOrderId: (id) => {
    set({ currentOrderId: id });
  },
  fetchProductsOrders: async () => {
    const response = await apiInstance.get(`/api/p_orders`);
    const fetchedOrders = response.data;
    set({ productsOrders: fetchedOrders });
    get().calculateTotalSales();
  },
}));
