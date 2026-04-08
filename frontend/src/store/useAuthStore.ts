import { create } from "zustand";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase";

interface AuthState {
  user: User | null;
  cafeId: string | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setCafeId: (id: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  cafeId: null,
  loading: true,
  setUser: (user) => set({ user }),
  setCafeId: (cafeId) => set({ cafeId }),
  setLoading: (loading) => set({ loading }),
}));

// Listener for auth changes
export const initAuthListener = () => {
  onAuthStateChanged(auth, (user) => {
    useAuthStore.getState().setUser(user);
    // In production, you'd fetch the cafeId linked to this user from Firestore
    if (user) {
      useAuthStore.getState().setCafeId(user.uid); // Simplified for this context
    }
    useAuthStore.getState().setLoading(false);
  });
};
