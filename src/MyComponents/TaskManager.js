import React from 'react';
import TaskDetailsComponent from './TaskDetailsComponent';
import { useTasks } from './Hooks';

const tasksData = [
  { id: 1, title: 'Zadanie 1', timestamp: new Date('2023-06-20').toISOString(), dueDate: new Date().toISOString(), description: 'Opis zadania 1' },
  { id: 2, title: 'Zadanie 2', timestamp: new Date('2023-06-21').toISOString(), dueDate: new Date().toISOString(), description: 'Opis zadania 2' },
];

function TaskManager({ searchText }) {
  const {
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
  } = useTasks(tasksData, searchText);

  return (
    <>
      <div className="table-responsive m-3">
        <table className="table table-primary">
          <thead>
            <tr>
              <th scope="col">Nazwa zadania</th>
              <th scope="col">Data utworzenia</th>
              <th scope="col">Opis</th>
              <th scope="col">Deadline</th>
              <th scope="col">Czas do końca</th>
              <th scope="col">Opcje</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => {
              return (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{new Date(task.timestamp).toLocaleDateString('pl-PL')}</td>
                  <td>{task.description}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => decreaseDueDate(task.id)}>
                      -1 dzień
                    </button>
                    {new Date(task.dueDate).toLocaleDateString('pl-PL')}
                    <button className="btn btn-sm btn-primary ms-2" onClick={() => increaseDueDate(task.id)}>
                      +1 dzień
                    </button>
                  </td>
                  <td>{calculateTimeLeft(task.dueDate)}</td>

                  <td>
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id={`dropdownMenu_${task.id}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi bi-three-dots-vertical"></i> {/* Round icon */}
                      </button>
                      <ul className="dropdown-menu" aria-labelledby={`dropdownMenu_${task.id}`}>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => {
                              openAddTaskModal(task);
                            }}
                          >
                            Edytuj zadanie
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => {
                              setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
                            }}
                          >
                            Usuń zadanie
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div>
          <button className="btn btn-primary" onClick={() => openAddTaskModal()}>
            Dodaj zadanie
          </button>
        </div>

        <TaskDetailsComponent
          onAddTask={handleAddTask}
          onHide={closeAddTaskModal}
          show={showAddTaskModal}
          tasks={tasks}
          editTask={editTask}
          updateTask={updateTask}
        />
      </div>
    </>
  );
}

export default TaskManager;
