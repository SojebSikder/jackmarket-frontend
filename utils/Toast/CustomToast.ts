import { toast } from "react-toastify";

export class CustomToast {
  static show(text: any) {
    return toast(text, {
      position: "bottom-right",
    });
  }
  static update(toastId: any, text: any) {
    toast.update(toastId, { render: text });
  }
}
