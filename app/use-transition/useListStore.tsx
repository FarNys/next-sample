import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { generateNumbersList } from "./generate-list";

type State = {
  storeList: number[];
};

type Actions = {
  setStoreList: () => void;
};

export const useListStore = create<State & Actions>()(
  immer((set) => ({
    storeList: generateNumbersList(),
    setStoreList: () =>
      set((state) => {
        state.storeList = state.storeList.map((item) => item * 2);
      }),
  }))
);

export default useListStore;
