import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import { styleSweetAlert2 } from "../utils/styleComponents";
import styleSweetAlert2 from "./styleComponents";
const simpleAlert = (message, typeOfAlert, title) => {
  console.log(styleSweetAlert2);

  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title: <p>{title}</p>,
    icon: typeOfAlert,
    text: message,
  });
};
const doubleAlert = (message, typeOfAlert, title) => {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title: <p>{title}</p>,
    icon: typeOfAlert,
    didOpen: () => {
      // `MySwal` is a subclass of `Swal` with all the same instance & static methods
      MySwal.showLoading();
    },
  }).then(() => {
    return MySwal.fire(<p>{message}</p>);
  });
};

export default simpleAlert;
