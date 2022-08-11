import { useEffect } from "react";
import { useRef } from "react";
import ModalStyles from "./Modal.module.css";
const Modal = ({ children, parentFunction, title = "Open Modal" }) => {
  const refModal = useRef(null);
  const handlePopup = () => {
    refModal.current.style.display = "block";
  };
  const HandleClose = () => {
    refModal.current.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == refModal.current) {
      refModal.current.style.display = "none";
    }
  };
  useEffect(() => parentFunction(), []);

  return (
    <div className={ModalStyles.container}>
      <button className={ModalStyles.open} onClick={() => handlePopup()}>
        {title}
      </button>
      <div ref={refModal} id="myModal" className={ModalStyles.modal}>
        <div className={ModalStyles.content}>
          {children}
          <span onClick={() => HandleClose()} className={ModalStyles.close}>
            &times;
          </span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
