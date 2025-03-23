import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './Tasks.css';
import { StoreContext } from '../../../context/StoreContext';
import axios from 'axios';

const Tasks = () => {
  const { userRoomInfo, userInfo, url, token } = useContext(StoreContext);
  const [filter, setFilter] = useState('all');
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: '',
      assignedTo: '',
      dueDate: '',
      priority: 'Medium',
      description: '',
      recurring: false
    }
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(url + '/dormRoom/add-task', {
        
        dormId: userInfo.dormId,
        task: data  
      }, { headers: { token } })
      console.log(response.data)
    }
    catch (error) {
      console.log(error)
    }
  }

  const filteredTasks = filter === 'all'
    ? userInfo.tasks || []
    : userInfo.tasks.filter(task => task.status.toLowerCase() === filter);

  return (
    <div className="tasks-container">
      <header className="tasks-header">
        <h1>Dorm Room Tasks</h1>
        <div className="tasks-filter-controls">
          <span>Filter by: </span>
          <div className="tasks-filter-buttons">
            {['all', 'pending', 'in progress', 'completed'].map(status => (
              <button
                key={status}
                className={filter === status ? 'tasks-active' : ''}
                onClick={() => setFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="tasks-grid">
        <div className="tasks-list">
          <h2>Current Tasks</h2>
          {filteredTasks.length === 0 ? (
            <p className="tasks-no-tasks-message">No tasks found.</p>
          ) : (
            filteredTasks.map(task => (
              <div key={task.id} className={`tasks-task-card tasks-priority-${task.priority.toLowerCase()}`}>
                <div className="tasks-task-header">
                  <h3>{task.title}</h3>
                  <div className={`tasks-status-badge tasks-status-${task.status.toLowerCase().replace(' ', '-')}`}>
                    {task.status}
                  </div>
                </div>
                <div className="tasks-task-details">
                  <p><span>Assigned to:</span> {task.assignedTo}</p>
                  <p><span>Due:</span> {new Date(task.dueDate).toLocaleDateString()}</p>
                  <p><span>Priority:</span> {task.priority}</p>
                  {task.recurring && <p className="tasks-recurring-tag">Recurring</p>}
                </div>
                <p className="tasks-task-description">{task.description}</p>
                <div className="tasks-task-actions">
                  {task.status !== 'Completed' && (
                    <button className="tasks-complete-button" onClick={() => handleStatusChange(task.id, 'Completed')}>
                      Mark Complete
                    </button>
                  )}
                  {task.status === 'Pending' && (
                    <button className="tasks-progress-button" onClick={() => handleStatusChange(task.id, 'In Progress')}>
                      Start Task
                    </button>
                  )}
                  {task.status === 'Completed' && (
                    <button className="tasks-reopen-button" onClick={() => handleStatusChange(task.id, 'Pending')}>
                      Reopen
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="tasks-add-task-form">
          <h2>Add New Task</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="tasks-form-group">
              <label htmlFor="title">Task Title</label>
              <input type="text" id="title" {...register('title', { required: true })} />
            </div>

            <div className="tasks-form-group">
              <label htmlFor="assignedTo">Assigned To</label>
              <input type="text" id="assignedTo" {...register('assignedTo', { required: true })} />
            </div>

            <div className="tasks-form-group">
              <label htmlFor="dueDate">Due Date</label>
              <input type="date" id="dueDate" {...register('dueDate', { required: true })} />
            </div>

            <div className="tasks-form-group">
              <label htmlFor="priority">Priority</label>
              <select id="priority" {...register('priority')}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="tasks-form-group">
              <label htmlFor="description">Description</label>
              <textarea id="description" {...register('description')} rows="3"></textarea>
            </div>

            <div className="tasks-form-check">
              <input type="checkbox" id="recurring" {...register('recurring')} />
              <label htmlFor="recurring">Recurring Task</label>
            </div>

            <button type="submit" className="tasks-submit-button">Add Task</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tasks;