// export function sendFile(formData) {
//   
// }
export const sendFiles = (token, files, folder) => {
  fetch(`/api/uploadfiles?token=${token}&folder=${folder}`, {
    method: "POST",
    body: files,
  })
    .then((response) => response.json())
    .then((data) => data);
};

export const getFilesNames = (token) => {
  return fetch(`/api/getFiles?token=${token}`)
    .then((response) => response.json())
    .then((data) => data);
}