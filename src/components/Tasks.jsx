import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NewTask from "./NewTask.jsx";

export default function Task({ tasks, onAdd, onDelete, onEdit }) {
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState("");

  function handleEditTask(task) {
    setEditTaskId(task.id);
    setEditText(task.text);
  }

  function handleSaveEdit(taskId) {
    onEdit(taskId, editText);
    setEditTaskId(null);
    setEditText("");
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onAdd={onAdd} />
      <AnimatePresence>
        {tasks.length === 0 && (
          <motion.p
            className="text-stone-800 my-4"
            key="no-tasks-message"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            This project does not have any task yet.
          </motion.p>
        )}
        {tasks.length > 0 && (
          <motion.div
            className="p-4 mt-8 rounded-md bg-stone-100"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="list-none p-0">
              {tasks.map((task) => (
                <motion.li
                  key={task.id}
                  className="flex justify-between my-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
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
                        onClick={() => handleSaveEdit(task.id)}
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
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
