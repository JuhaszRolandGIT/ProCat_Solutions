import { useState, useRef } from "react";
import Input from "./Input.jsx";
import Modal from "./Modal.jsx";
import { motion, AnimatePresence } from "framer-motion";

export default function NewProject({ onAdd, onCancel }) {
  const [isVisible, setIsVisible] = useState(true);
  const modal = useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      modal.current.open();
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate
    });

    // Trigger the exit animation and then notify the parent
    setIsVisible(false);
  }

  function handleCancel() {
    // Trigger the exit animation and then notify the parent
    setIsVisible(false);
    setTimeout(() => onCancel(), 500); // Adjust the delay to match the animation duration
  }

  return (
    <>
      <Modal ref={modal} buttonCaption={"Okay"}>
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">Oops ... looks like your forgot to enter a value.</p>
        <p className="text-stone-600 mb-4">Please make sure you provide a valid value for every input field</p>
      </Modal>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="w-[35rem] mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }} // Exit animation
            transition={{ duration: 0.5 }}
          >
            <menu className="flex items-center justify-end gap-4 my-4">
              <li>
                <button onClick={handleCancel} className="text-stone-800 hover:text-stone-950">Cancel</button>
              </li>
              <li>
                <button onClick={handleSave} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button>
              </li>
            </menu>
            <div>
              <Input type="text" ref={title} label="Title" />
              <Input ref={description} label="Description" textarea={true} /> {/*textarea*/}
              <Input type="date" ref={dueDate} label="Due Date" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
