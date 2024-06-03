import { create } from "zustand";

type SettingsState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSettings = create<SettingsState>((set, get) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
