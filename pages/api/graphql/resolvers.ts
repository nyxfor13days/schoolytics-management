import { StudentInput } from "./generated/graphql";
import { students } from "./graphql";
import {
  createStudent,
  deleteStudentByEmail,
  updateStudentByEmail,
} from "./models/students";

// Resolvers
const resolvers = {
  Query: {
    async getStudents() {
      return {
        totalCount: await students.countDocuments(),
        students: await students.find({}).toArray(),
      };
    },
    async getStudentById(student_id: string) {
      return await students.findOne({ student_id: student_id });
    },
  },

  Mutation: {
    addStudent(parent: any, args: { input: StudentInput }) {
      const { input } = args;
      return createStudent(input);
    },

    updateStudentByEmail(
      parent: any,
      args: { email: string; input: StudentInput }
    ) {
      const { email, input } = args;
      return updateStudentByEmail(email, input);
    },

    deleteStudentByEmail(parent: any, args: { email: string }) {
      const { email } = args;
      return deleteStudentByEmail(email);
    },
  },
};

export { resolvers };
