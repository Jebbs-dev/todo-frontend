import { create } from "zustand";

interface LabelStore {
  labels: { [key: string]: string }; 
  setLabel: (id: string, newLabel: string) => void;
}

const useLabelStore = create<LabelStore>((set) => ({
  labels: {}, 
  setLabel: (id: string, newLabel: string) => 
    set((state) => ({
      labels: { ...state.labels, [id]: newLabel },
    })),
}));

export default useLabelStore;
