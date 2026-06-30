import create from "zustand";

type Severity = "error" | "warning" | "info" | "success";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: Severity;
  show: (msg: string, sev?: Severity) => void;
  hide: () => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
  open: false,
  message: "",
  severity: "info",
  
  show: (msg, sev = "info") => set({ 
    open: true, 
    message: msg, 
    severity: sev
   }),

  hide: () => set({ open: false }),
}));
