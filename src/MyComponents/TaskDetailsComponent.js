import React, { useState, useEffect } from 'react';

function TaskDetailsComponent({ onAddTask, onHide, show, tasks, editTask, updateTask }) {
  const [newTask, setNewTask] = useState({
    title: '',
    description: ''
  });

  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editTask && show) {
      setNewTask({
        title: editTask.title,
        description: editTask.description,
      });
      setDueDate(editTask.dueDate);
    } else {
      setNewTask({
        title: '',
        description: '',
      });
      setDueDate('');
    }
  }, [editTask, show]);

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };
  
  const handleInputChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value
    });
  };

  const handleAddTask = () => {
    if (dueDate === '') {
      alert('Podaj przewidywaną datę ukończenia');
      return;
    }
  
    const id = editTask ? editTask.id : tasks.length + 1;
    const timestamp = editTask ? editTask.timestamp : new Date().toISOString();
    const newTaskData = { ...newTask, id, timestamp, dueDate };
    if (editTask) {
      updateTask(newTaskData);
    } else {
      onAddTask(newTaskData);
    }
    setNewTask({ title: '', description: '' });
    setDueDate('');
    onHide();
  };

  return (
    <>
    <div className={`modal ${show ? 'show' : ''} ${show ? 'd-block' : 'd-none'}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Dodaj zadanie</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onHide}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="title">Tytuł</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dueDate">Deadline</label>
                <input
                  type="date"
                  className="form-control"
                  id="dueDate"
                  name="dueDate"
                  value={dueDate}
                  onChange={handleDueDateChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Opis</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={onHide}
            >
              Anuluj
            </button>
            <button type="button" className="btn btn-primary" onClick={handleAddTask}>
              Zapisz
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default TaskDetailsComponent;