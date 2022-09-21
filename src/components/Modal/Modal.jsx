import { useEffect } from "react";
import { useRef } from "react";
import ModalStyles from "./Modal.module.css";
const Modal = ({
  children,
  parentFunction=()=>{},
  buttonText = "Open Modal",
}) => {
  const refModal = useRef(null);
  const handlePopup = () => {
    parentFunction();
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
  // useEffect(() => parentFunction(), []);//funcion que se quiera ejecutar cuando se renderice el modal

  return (
    <div className={ModalStyles.container}>
      <>
        <button className={ModalStyles.open} onClick={() => handlePopup()}>
          {buttonText}
        </button>
        <div ref={refModal} id="myModal" className={ModalStyles.modal}>
          <div className={ModalStyles.content}>
            {children}
            <span onClick={() => HandleClose()} className={ModalStyles.close}>
              &times;
            </span>
          </div>
        </div>
      </>
    </div>
  );
};

export default Modal;
