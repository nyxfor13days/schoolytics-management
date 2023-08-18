import { v4 } from "uuid";
import { StudentInput } from "../generated/graphql";
import { students } from "../graphql";

export async function createStudent(input: StudentInput) {
  const id = v4();

  const existingDoc = await students.findOne({ email: input.email });

  if (existingDoc !== null)
    return { success: false, message: "Student already exists!" };
  else {
    await students
      .insertOne({
        student_id: id,
        ...input,
      })
      .catch(() => {
        return { success: false, message: "Failed to create student!" };
      });
  }

  return { success: true, message: "Student created successfully!" };
}

export async function updateStudentByEmail(email: string, input: StudentInput) {
  await students
    .updateOne({ email: email }, { $set: { ...input } })
    .then(() => {
      return { success: true, message: "Student updated successfully!" };
    })
    .catch(() => {
      return { success: false, message: "Failed to update student!" };
    });

  return { success: true, message: "Student updated successfully!" };
}

export async function deleteStudentByEmail(email: string) {
  await students
    .deleteOne({ email: email })
    .then(() => {
      return { success: true, message: "Student deleted successfully!" };
    })
    .catch(() => {
      return { success: false, message: "Failed to delete student!" };
    });

  return { success: true, message: "Student deleted successfully!" };
}
