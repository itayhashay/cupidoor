export type ConfirmationModalType = {
  title:string;
  message: string;
  severity: string;
  show: boolean;
};

export interface IConfirmationModal {
  title:string;
  message: string;
  severity: "success" | "info" | "error";
  show: boolean;
}
