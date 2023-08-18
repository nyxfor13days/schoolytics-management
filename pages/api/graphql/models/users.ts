import { users } from "../graphql";

export async function getUser(token: any) {
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
