import { create } from "zustand";
import apiInstance from "../../lib/axios";

// Define the interface of the Products state
export interface Material {
  id: number;
  title: string;
  image: string;
}

interface State {
  materials: Material[];
}

// Define the interface of the actions that can be performed on Products
interface Actions {
  fetchMaterials: () => void;
}

// Initialize a default state
const INITIAL_STATE: State = {
  materials: [],
};

export const useMaterials = create<State & Actions>()((set) => ({
  materials: INITIAL_STATE.materials,
  fetchMaterials: async () => {
    const response = await apiInstance.get(`/api/materials`);
    const fetchedMaterials = response.data;
    set({ materials: fetchedMaterials });
  },
}));
