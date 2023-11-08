import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./custom-toast-styles.css";

export default function Toast() {
  const notify = () => {
    toast("Default Notification !");
    toast.success("Success Notification !", {});
    toast.error("Error Notification !", {});
    toast.warn("Warning Notification !", {});
    toast.info("Info Notification !", {});
  };

  return (
    <>
      {/* <button onClick={notify}>Notify</button>; */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
