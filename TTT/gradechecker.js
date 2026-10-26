
const courses = {
  medicine: {
    name: "Medicine and Surgery",
    subjects: [
      "Use of English",
      "Biology",
      "Chemistry",
      "Physics"
    ]
  },

  computer: {
    name: "Computer Science",
    subjects: [
      "Use of English",
      "Mathematics",
      "Physics",
      "One other approved subject"
    ]
  },

  law: {
    name: "Law",
    subjects: [
      "Use of English",
      "Literature in English",
      "Two other approved Arts or Social Science subjects"
    ]
  },

  accounting: {
    name: "Accounting",
    subjects: [
      "Use of English",
      "Mathematics",
      "Economics",
      "One other approved subject"
    ]
  },

  engineering: {
    name: "Engineering",
    subjects: [
      "Use of English",
      "Mathematics",
      "Physics",
      "Chemistry"
    ]
  }
};

const courseSelect = document.getElementById("course");
const button = document.getElementById("showSubjects");
const result = document.getElementById("result");

button.addEventListener("click", function () {
  const selectedCourse = courseSelect.value;

  if (!selectedCourse) {
    result.style.display = "block";
    result.innerHTML = "Please select a course first.";
    return;
  }

  const course = courses[selectedCourse];

  result.style.display = "block";
  result.innerHTML = `
    <h2>${course.name}</h2>
    <strong>JAMB Subjects:</strong>
    <ol>
      ${course.subjects.map(subject =>
        `<li>${subject}</li>`
      ).join("")}
    </ol>
  `;
});
