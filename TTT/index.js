const taskForm = document.getElementById("task-form");
const subjectSelect = document.getElementById("subject-select");
const topicSelect = document.getElementById("topic-select");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("empty-state");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const progressBar = document.querySelector(".progress-bar");

const subjectTopics = {
  Mathematics: [
    "Number and fractions",
    "Fractions, decimals, and percentages",
    "Ratio and proportion",
    "Algebraic expressions",
    "Linear equations and inequalities",
    "Indices and logarithms",
    "Sets and Venn diagrams",
    "Sequences and patterns",
    "Geometry and angles",
    "Mensuration",
    "Trigonometry",
    "Statistics and data",
    "Probability",
  ],
  Chemistry: [
    "Atoms and atomic structure",
    "Elements and the periodic table",
    "Chemical bonding",
    "Writing chemical formulae and equations",
    "Acids, bases, and salts",
    "Air, water, and the environment",
    "Metals and non-metals",
    "Mixtures and separation techniques",
    "Rates of chemical reactions",
    "Mole concept and simple calculations",
    "Introduction to organic chemistry",
  ],
  Physics: [
    "Measurements and SI units",
    "Distance, speed, and velocity",
    "Acceleration and motion graphs",
    "Forces and Newton's laws",
    "Work, energy, and power",
    "Pressure and density",
    "Heat and temperature",
    "Waves and sound",
    "Reflection and refraction of light",
    "Electricity and simple circuits",
    "Magnetism and electromagnets",
  ],
  "Computer Science": [
    "How websites work",
    "HTML page structure",
    "Headings and paragraphs in HTML",
    "Links and images in HTML",
    "Lists and tables in HTML",
    "Building a simple HTML form",
    "CSS selectors and basic styles",
    "CSS colors, fonts, and spacing",
    "The CSS box model",
    "Arranging a page with Flexbox",
    "Making a page responsive",
    "JavaScript variables and values",
    "JavaScript conditions and functions",
    "JavaScript events and page interaction",
  ],
  "English Language": [
    "Parts of speech",
    "Sentence structure and grammar",
    "Tenses and subject-verb agreement",
    "Punctuation and capitalization",
    "Vocabulary and word meanings",
    "Reading comprehension",
    "Summary writing",
    "Essay writing",
    "Formal and informal letters",
    "Figures of speech",
    "Speech and oral communication",
  ],
};

let tasks = [];

function updateTopicOptions() {
  const topics = subjectTopics[subjectSelect.value] || [];
  topicSelect.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = topics.length
    ? "Choose a topic"
    : "Choose a subject first";
  topicSelect.appendChild(placeholder);

  topics.forEach(function (topic) {
    const option = document.createElement("option");
    option.value = topic;
    option.textContent = topic;
    topicSelect.appendChild(option);
  });

  topicSelect.disabled = topics.length === 0;
}

subjectSelect.addEventListener("change", updateTopicOptions);

function saveTasks() {
  localStorage.setItem("studyTasks", JSON.stringify(tasks));
}
function displayTasks() {
  taskList.innerHTML = "";
  tasks.forEach(function (task) {
    const li = document.createElement("li");
    if (task.completed) {
      li.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Mark "${task.name}" as completed`);
    checkbox.addEventListener("change", function () {
      task.completed = checkbox.checked;
      saveTasks();
      displayTasks();
    });

    const span = document.createElement("span");
    span.textContent = task.name;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete "${task.name}"`);
    deleteButton.addEventListener("click", function () {
      tasks = tasks.filter(function (item) {
        return item !== task;
      });
      saveTasks();
      displayTasks();
    });
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  });

  emptyState.hidden = tasks.length > 0;
  updateProgress();
}

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const subject = subjectSelect.value;
  const topic = topicSelect.value;
  if (!subjectTopics[subject] || !subjectTopics[subject].includes(topic)) {
    return;
  }

  tasks.push({
    id: Date.now(),
    name: `${subject}: ${topic}`,
    subject: subject,
    topic: topic,
    completed: false,
  });
  saveTasks();
  topicSelect.value = "";
  displayTasks();
});

function updateProgress() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(function (task) {
    return task.completed;
  }).length;
  const percentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  progressText.textContent = `${percentage}% completed (${completedTasks}/${totalTasks})`;
  progressFill.style.width = `${percentage}%`;
  progressBar.setAttribute("aria-valuenow", percentage);
}

function loadTasks() {
  const savedTasks = localStorage.getItem("studyTasks");
  if (savedTasks !== null) {
    try {
      const savedItems = JSON.parse(savedTasks);
      if (Array.isArray(savedItems)) {
        tasks = savedItems.filter(function (task) {
          return (
            task &&
            typeof task.name === "string" &&
            typeof task.completed === "boolean"
          );
        });
      }
    } catch (error) {
      console.error("Error parsing saved tasks:", error);
      tasks = [];
    }
  }

  displayTasks();
}

loadTasks();