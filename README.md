# Study Track

Study Track is a simple, beginner-friendly study planner for secondary or high school students. It is built with plain HTML, CSS, and JavaScript—no frameworks, package installation, or build step required.

## Features

- Browse five subjects: Mathematics, Chemistry, Physics, Computer Science, and English Language.
- Choose a subject to see a list of study topics suited to that subject.
- Explore beginner web-development topics under Computer Science, including HTML, CSS, and JavaScript.
- Add topics to a personal task list, mark tasks complete, or delete them.
- Track completed tasks with a progress percentage.
- Save tasks in the browser so they remain available after reloading the page.
- Use the responsive dashboard on desktop, tablet, or mobile.

## Getting started

1. Download or clone this repository.
2. Open the `TTT` folder.
3. Open `index.html` in a modern web browser.
4. In **My study tasks**, choose a subject, choose a topic, and select **Add task**.
5. Mark tasks complete with the checkbox. Use **Delete** to remove a task.

No internet connection or development server is needed for normal use.

## Project structure

```text
study-track/
├── README.md
└── TTT/
    ├── index.html    # Dashboard structure and subject list
    ├── style.css     # Layout, colors, and responsive styles
    ├── index.js      # Topic dropdowns, tasks, and progress
    ├── bg_image.png  # Dashboard background image
    └── logo.png      # Study Track logo
```

## How task saving works

Tasks are stored in the browser's `localStorage` under the `studyTasks` key. They are saved only in the current browser and device. Clearing the browser's site data will remove saved tasks.

## Customizing topics

To add or edit topics, open `TTT/index.js` and update the `subjectTopics` list for the relevant subject. Keep the subject name in sync with its option in `TTT/index.html`.

## Technologies

- HTML
- CSS
- JavaScript
