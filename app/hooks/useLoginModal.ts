import { create } from "zustand";

type UserLoginStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
const useLoginModal = create<UserLoginStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;
