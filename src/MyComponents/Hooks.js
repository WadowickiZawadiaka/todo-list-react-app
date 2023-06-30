import { useState, useEffect } from 'react';

export function useTasks(initialTasks, searchText) {
    const [tasks, setTasks] = useState(initialTasks);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [editTask, setEditTask] = useState(null);
  

    useEffect(() => {
        const filtered = tasks.filter(
          (task) =>
            task.title.toLowerCase().includes(searchText.toLowerCase()) ||
            task.description.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredTasks(filtered);
      }, [tasks, searchText]);

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setShowAddTaskModal(false);
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === updatedTask.id) {
          return updatedTask;
        }
        return task;
      });
      return updatedTasks;
    });
  };

  const openAddTaskModal = (task = null) => {
    setEditTask(task);
    setShowAddTaskModal(true);
  };

  const closeAddTaskModal = () => {
    setShowAddTaskModal(false);
  };

  const increaseDueDate = (taskId) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          const newDueDate = new Date(new Date(task.dueDate).getTime() + 24 * 60 * 60 * 1000).toISOString();
          return {
            ...task,
            dueDate: newDueDate,
          };
        }
        return task;
      });
    });
  };

  const decreaseDueDate = (taskId) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          const newDueDate = new Date(new Date(task.dueDate).getTime() - 24 * 60 * 60 * 1000).toISOString();
          return {
            ...task,
            dueDate: newDueDate,
          };
        }
        return task;
      });
    });
  };

  const calculateTimeLeft = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const timeDiff = due.getTime() - now.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft > 0 ? `${daysLeft} dni` : 'Przekroczono termin';
  };

  return {
    tasks,
    setTasks,
    filteredTasks,
    showAddTaskModal,
    editTask,
    handleAddTask,
    updateTask,
    openAddTaskModal,
    closeAddTaskModal,
    increaseDueDate,
    decreaseDueDate,
    calculateTimeLeft,
  };
}
