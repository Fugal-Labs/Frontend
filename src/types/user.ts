export interface RegisterData {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  credential: string; // can be either username or email
  password: string;
}

export interface SolvedProblem {
  problemId: string;
  solvedAt: Date;
  difficulty: "easy" | "medium" | "hard";
}

export interface EnrolledCourse {
  courseId: string;
  enrolledAt: Date;
  progress: number;
  lastAccessedAt: Date;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  username: string;
  role: "user" | "admin";
  // Problems Stats
  solvedProblems: SolvedProblem[];
  // Course Stats
  enrolledCourses: EnrolledCourse[];
  createdAt: Date;
  updatedAt: Date;
}
