import { create } from "zustand";

type UserRentStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
const useRentModal = create<UserRentStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRentModal;
