import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";
import { signInInstance, signOutInstance } from "../../lib/axios";

// define interface for userstate
interface State {
  id: number;
  isAdmin: boolean;
  role: string;
  refreshToken: string;
  username: string;
}

// Define the interface of the actions that can be performed to the user
interface Actions {
  signIn: (signinValues: { username: string; password: string }) => void;
  localSignOut: () => void;
  serverSignOut: () => void;
  setError: (error?: any) => void;
  setNavHistory: (location: string) => void;
  //authenticate: () => {};
}

interface Error {
  error: {} | any;
}

interface NavHistory {
  navHistory: string;
}

// Initialize a default state
const INITIAL_STATE: State & Error & NavHistory = {
  id: 0,
  isAdmin: false,
  refreshToken: "",
  role: "",
  username: "",
  error: null,
  navHistory: "/",
};

//console.log("user store");
export const useUserStore = create<State & Actions & Error & NavHistory>()(
  persist(
    // @ts-ignore
    (set, get) => ({
      id: INITIAL_STATE.id,
      isAdmin: INITIAL_STATE.isAdmin,
      username: INITIAL_STATE.username,
      refreshToken: INITIAL_STATE.refreshToken,
      role: INITIAL_STATE.role,
      error: INITIAL_STATE.error,
      navHistory: INITIAL_STATE.navHistory,
      setNavHistory: (location = "/") => {
        set({ navHistory: location });
      },
      setError: (error = null) => {
        set({ error: error });
      },
      signIn: async (signinValues) => {
        try {
          const response = await signInInstance.post(
            `/api/login`,
            signinValues,
          );
          const user = response.data;
          localStorage.setItem("refreshToken", user.refreshToken);
          set({ id: user.id });
          set({ isAdmin: user.isAdmin });
          set({ username: user.username });
          set({ role: user.role });
          set({ error: null });
          window.location.href = get().navHistory;
          get().setNavHistory("/");
          //window.history.go(-1);
        } catch (err: any) {
          set({ error: err });
          throw err;
        }
      },
      localSignOut: () => {
        set({ id: INITIAL_STATE.id });
        set({ isAdmin: INITIAL_STATE.isAdmin });
        set({ username: INITIAL_STATE.username });
        set({ role: INITIAL_STATE.role });
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      },
      serverSignOut: async () => {
        set({ id: INITIAL_STATE.id });
        set({ isAdmin: INITIAL_STATE.isAdmin });
        set({ username: INITIAL_STATE.username });
        set({ role: INITIAL_STATE.role });
        localStorage.removeItem("refreshToken");
        try {
          await signOutInstance.post("/api/logout");
        } catch (err) {
          console.log(err);
        }
        window.location.href = "/login";
      },
    }),
    { name: "user", storage: createJSONStorage(() => localStorage) },
  ),
);
