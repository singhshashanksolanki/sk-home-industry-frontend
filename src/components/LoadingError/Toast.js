import React from "react";
import { ToastContainer } from "react-toastify";

const Toast = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        autoClose={5000}
        newestOnTop
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Toast;
