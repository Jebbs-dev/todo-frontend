import { create } from "zustand";

interface EditModalStore {
  isOpen: boolean;
  onOpenChange(isOpen: boolean): void;
}

const useEditModal = create<EditModalStore>((set) => ({
  isOpen: false,
  onOpenChange: (isOpen) => set({ isOpen }),
}));

export default useEditModal;
