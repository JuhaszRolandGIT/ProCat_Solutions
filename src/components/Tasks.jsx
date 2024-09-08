import { useState } from "react";
import NewTask from "./NewTask.jsx";

export default function Task({ tasks, onAdd, onDelete, onEdit }) {
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState("");

  function handleEditTask(task) {
    setEditTaskId(task.id);
    setEditText(task.text);
  }

  function handleSaveeEdit(taskId) {
    onEdit(taskId, editText);
    setEditTaskId(null);
    setEditText("");
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onAdd={onAdd} />
      {tasks.length === 0 && (
        <p className="text-stone-800 my-4">This project does not have any task yet.</p>
      )}
      {tasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between my-4">
              {editTaskId === task.id ? (
                <input
                  className="border p-2 rounded"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <span>{task.text}</span>
              )}
              <div>
                {editTaskId === task.id ? (
                  <button
                    className="text-stone-700 hover:text-green-500 mr-4"
                    onClick={() => handleSaveeEdit(task.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="text-stone-700 hover:text-blue-500 mr-4"
                    onClick={() => handleEditTask(task)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="text-stone-700 hover:text-red-500"
                  onClick={() => onDelete(task.id)}
                >
                  Clear
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
