import { create } from "zustand";

type UserRegisterStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
const useRegisterationModal = create<UserRegisterStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterationModal;
