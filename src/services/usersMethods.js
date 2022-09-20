export async function getInfoUser(token_user) {
  // const token_user = sessionStorage.getItem("token");
  return await fetch("api/userinfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token_user,
    }),
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      console.log("error");
    }
  }).then((data) => {
    return data;
  });
}