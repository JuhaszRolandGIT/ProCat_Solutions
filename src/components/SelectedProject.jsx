import { motion } from "framer-motion";
import Task from "./Tasks.jsx";

export default function SelectedProject({ project, onDelete, onAddTask, onDeleteTask, onEditTask, tasks }) {

    const formattedDate = new Date(project.dueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <motion.div
            className="w-[35rem] mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <header className="pb-4 mb-4 border-b-2 border-stone-300">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-stone-600 mb-2">{project.title}</h1>
                    <button className="text-stone-600 hover:text-stone-950" onClick={onDelete}>Delete</button>
                </div>
                <p className="mb-4 text-stone-400">{formattedDate}</p>
                <p className="text-stone-600 whitespace-pre-wrap">{project.description}</p>
            </header>
            <Task
                onAdd={onAddTask}
                onDelete={onDeleteTask}
                onEdit={onEditTask}
                tasks={tasks}
            />
        </motion.div>
    )
}
