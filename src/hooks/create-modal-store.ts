import { create } from "zustand";

interface CreateModalStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const useCreateModal = create<CreateModalStore>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));

export default useCreateModal;
