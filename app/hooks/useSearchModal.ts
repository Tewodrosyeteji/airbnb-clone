import { create } from "zustand";

type UserSearchStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
const useSearchModal = create<UserSearchStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSearchModal;
