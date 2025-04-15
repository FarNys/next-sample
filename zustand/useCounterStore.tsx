import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type ThreadKeyProps = keyof typeof THREADS;

type State = {
  count: number;
  threads: typeof THREADS;
};

const THREADS = {
  1: {
    id: 1,
    name: "Group-1",
    messages: ["text-1", "text-2", "text-3"],
    oldMessages: ["Old-1"],
  },
  2: {
    id: 2,
    name: "Group-2",
    messages: ["text-A", "text-B", "text-C"],
    oldMessages: ["Old-2"],
  },
};

type Actions = {
  increment: (qty: number) => void;
  decrement: (qty: number) => void;
  setUpdateThread: (id: ThreadKeyProps, message: string) => void;
};

export const useCountStore = create<State & Actions>()(
  immer((set) => ({
    threads: THREADS,
    count: 0,
    increment: (qty: number) =>
      set((state) => {
        state.count += qty;
      }),
    decrement: (qty: number) =>
      set((state) => {
        state.count -= qty;
      }),
    setUpdateThread: (id, message) => {
      set((state) => {
        state.threads[id].oldMessages.push(message);
      });
    },
  }))
);

export default useCountStore;
