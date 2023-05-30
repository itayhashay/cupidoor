export type SnackBarType = {
  message: string;
  severity: string;
  show: boolean;
};

export interface ISnackBar {
  message: string;
  severity: "success" | "info" | "error";
  duration?: number;
  show: boolean;
}
