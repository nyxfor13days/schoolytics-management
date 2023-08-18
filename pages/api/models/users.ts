import { users } from "..";

export async function getUser(token) {
  users
    .findOne({ token: token })
    .then(() => {
      return { success: true, message: "User found!" };
    })
    .catch(() => {
      return { success: false, message: "User not found!" };
    });

  return { success: true, message: "User found!" };
}
