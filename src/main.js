import "./styles.css";
import { columns, createTask, getNextStatus, parseTasks, storageKey } from "./tasks.js";

function readTasks() {
  const savedTasks = window.localStorage.getItem(storageKey);
  return parseTasks(savedTasks);
}

function saveTasks(tasks) {
  window.localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function createTaskElement(task, onMove) {
  const item = document.createElement("article");
  item.className = "task-card";
  item.dataset.priority = task.priority;

  const title = document.createElement("h3");
  title.textContent = task.title;

  const meta = document.createElement("p");
  meta.className = "task-meta";
  meta.textContent = `Priority: ${task.priority}`;

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = task.status === "done" ? "Повернути" : "Далі";
  button.addEventListener("click", () => onMove(task.id));

  item.append(title, meta, button);
  return item;
}

function renderSummary(tasks) {
  document.querySelector("#total-count").textContent = tasks.length;
  document.querySelector("#progress-count").textContent = tasks.filter(
    (task) => task.status === "progress",
  ).length;
  document.querySelector("#done-count").textContent = tasks.filter((task) => task.status === "done").length;
}

function renderBoard(tasks, onMove) {
  const board = document.querySelector("#task-board");
  board.replaceChildren();

  columns.forEach((column) => {
    const section = document.createElement("section");
    section.className = "column";

    const heading = document.createElement("h2");
    const columnTasks = tasks.filter((task) => task.status === column.id);
    heading.innerHTML = `${column.title}<span>${columnTasks.length}</span>`;

    section.append(heading);
    columnTasks.forEach((task) => section.append(createTaskElement(task, onMove)));
    board.append(section);
  });
}

function init() {
  const appStatus = import.meta.env.VITE_APP_STATUS ?? "unknown";
  const statusElement = document.querySelector("#app-status");
  const form = document.querySelector("#task-form");
  const titleInput = document.querySelector("#task-title");
  const priorityInput = document.querySelector("#task-priority");
  let tasks = readTasks();

  statusElement.textContent = `Mode: ${appStatus}`;

  const refresh = () => {
    renderSummary(tasks);
    renderBoard(tasks, (taskId) => {
      tasks = tasks.map((task) =>
        task.id === taskId ? { ...task, status: getNextStatus(task.status) } : task,
      );
      saveTasks(tasks);
      refresh();
    });
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    if (!title) {
      return;
    }

    tasks = [
      createTask(title, priorityInput.value),
      ...tasks,
    ];

    saveTasks(tasks);
    form.reset();
    refresh();
    titleInput.focus();
  });

  refresh();
}

init();
