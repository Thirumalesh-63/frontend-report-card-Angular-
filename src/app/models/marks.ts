// write a class Marks with the following properties like mid,marks,user from student calss,sub from subjects,exam from exam class
// and export the class
// write a class Marks with the following properties like mid,marks,user from student calss,sub from subjects,exam from exam class

import { Student } from "./Student"
import { exam } from "./exam"
import { subjects } from "./subjects"

// and export the class
export class Marks {
  mid?: number
  marks?: number
  user?: Student
  sub?: subjects
  exam?: exam
}
