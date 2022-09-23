import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
const simpleAlert = (message, typeOfAlert, title) => {
  MySwal.fire({
    title: <p>{title}</p>,
    icon: typeOfAlert,
    text: message,
  });
};

export const confirmAlertCallback = (
  contentMain,
  contentOnSuccess,
  contentOnFail,
  callback,
  paramsCallback,
  callback2
) => {
  MySwal.fire({
    title: contentMain.title,
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
    text: contentMain.message,
    icon: contentMain.typeOfAlert,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: contentMain.button,
  }).then((result) => {
    if (result.isConfirmed) {
      callback(...paramsCallback)
        .then((res) => {
          if (res.status === 200) {
            MySwal.fire({
              title: contentOnSuccess.title,
              text: contentOnSuccess.message,
              icon: contentOnSuccess.typeOfAlert,
              confirmButtonText: contentOnSuccess.button,
            });
          } else {
            MySwal.fire({
              title: contentOnFail.title,
              text: contentOnFail.message,
              icon: contentOnFail.typeOfAlert,
              confirmButtonText: contentOnFail.button,
            });
          }
        })
        .then(() => {
          callback2();
        })
        .catch((err) => {
          console.log(err);
          MySwal.fire({
            title: contentOnFail.title,
            text: contentOnFail.message,
            icon: contentOnFail.typeOfAlert,
            confirmButtonText: contentOnFail.button,
          });
        });
    }
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
