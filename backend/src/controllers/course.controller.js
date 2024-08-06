import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";
export const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    const course = new Course({ title, description });
    await course.save();
    res.status(201).send({ message: "Course created", course });
  } catch (error) {
    res.status(400).send({ message: "Failed to create course", error });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("students");
    res.send(courses);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch courses", error });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("students");
    if (!course) return res.status(404).send({ message: "Course not found" });
    res.send(course);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch course", error });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const course = await Course.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!course) return res.status(404).send({ message: "Course not found" });
    res.send({ message: "Course updated", course });
  } catch (error) {
    res.status(400).send({ message: "Failed to update course", error });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) return res.status(404).send({ message: "Course not found" });
    res.send({ message: "Course deleted" });
  } catch (error) {
    res.status(400).send({ message: "Failed to delete course", error });
  }
};

export const enrollCourse = async (req, res) => {
  try {
    const { courseId, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: "User not found" });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).send({ message: "Course not found" });

    course.students = course.students.filter((studentId) => studentId !== null);

    if (!course.students.includes(userId)) {
      course.students.push(userId);
      await course.save();
    }

    res.send({ message: "Enrolled in course", course });
  } catch (error) {
    res.status(400).send({ message: "Failed to enroll in course", error });
  }
};
