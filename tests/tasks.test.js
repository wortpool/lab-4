import test from "node:test";
import assert from "node:assert/strict";

import { columns, createTask, defaultTasks, getNextStatus, parseTasks } from "../src/tasks.js";

test("parseTasks returns default tasks when storage is empty", () => {
  assert.deepEqual(parseTasks(null), defaultTasks);
});

test("parseTasks returns default tasks for invalid JSON", () => {
  assert.deepEqual(parseTasks("{broken"), defaultTasks);
});

test("parseTasks returns saved task array", () => {
  const savedTasks = [{ id: "task-1", title: "CI", priority: "high", status: "planned" }];

  assert.deepEqual(parseTasks(JSON.stringify(savedTasks)), savedTasks);
});

test("getNextStatus moves through the board columns and wraps around", () => {
  assert.equal(getNextStatus("planned"), "progress");
  assert.equal(getNextStatus("progress"), "done");
  assert.equal(getNextStatus("done"), "planned");
});

test("getNextStatus falls back to the first column for unknown status", () => {
  assert.equal(getNextStatus("archived"), columns[0].id);
});

test("createTask trims title and creates planned task", () => {
  const task = createTask("  Deploy UniDone  ", "medium");

  assert.match(task.id, /^task-\d+$/);
  assert.equal(task.title, "Deploy UniDone");
  assert.equal(task.priority, "medium");
  assert.equal(task.status, "planned");
});
