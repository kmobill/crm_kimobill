// export function sendFile(formData) {
//   
// }
export const sendFiles = (token, files, folder) => {
  return fetch(`/api/uploadfiles?token=${token}&folder=${folder}`, {
    method: "POST",
    body: files,
  })
};

export const getFilesNames = (token) => {
  return fetch(`/api/getFiles?token=${token}`)
}
export const deleteFiles = (token, file, folder) => {
  console.log(token, file, folder)
  return fetch(`/api/deleteFiles?`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ file: file, folder: folder, token: token }),//files is the name of the file to delete
  })
}