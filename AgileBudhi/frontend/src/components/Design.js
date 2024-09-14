import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Moon, Sun, Share2, Zap, Plus, List, Kanban, Table } from 'lucide-react';

const AgileDesignDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [requirements, setRequirements] = useState('');
  const [deadline, setDeadline] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [tasks, setTasks] = useState({
    'To Do': [
      { id: 'task-1', content: 'Define project scope' },
      { id: 'task-2', content: 'Create user stories' },
    ],
    'In Progress': [
      { id: 'task-3', content: 'Design system architecture' },
    ],
    'Done': [
      { id: 'task-4', content: 'Stakeholder interviews' },
    ],
  });
  const [view, setView] = useState('kanban');
  const [openAddTask, setOpenAddTask] = useState(false);
  const [newTaskContent, setNewTaskContent] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState('To Do');

  useEffect(() => {
    const timer = setTimeout(() => {
      setAiSuggestion(`Based on the SDLC case study for Project X:
1. Implement Agile Scrum methodology
2. Set up CI/CD pipeline for faster iterations
3. Conduct weekly sprint planning and retrospectives
4. Utilize behavior-driven development (BDD)
5. Implement automated testing at all levels
6. Use microservices architecture for scalability`);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleShare = () => {
    alert('Sharing functionality would be implemented here.');
  };

  const generateAiSuggestion = () => {
    setAiSuggestion('Processing...');
    setTimeout(() => {
      setAiSuggestion(`Updated AI suggestion based on your input:
1. Prioritize user authentication and authorization
2. Implement real-time collaboration features
3. Design for mobile-first approach
4. Integrate error logging and monitoring
5. Plan for data migration from legacy systems
6. Implement progressive web app (PWA) capabilities`);
    }, 2000);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;

    if (sourceColumn === destColumn) {
      const newColumn = Array.from(tasks[sourceColumn]);
      const [reorderedItem] = newColumn.splice(source.index, 1);
      newColumn.splice(destination.index, 0, reorderedItem);

      setTasks({
        ...tasks,
        [sourceColumn]: newColumn,
      });
    } else {
      const sourceItems = Array.from(tasks[sourceColumn]);
      const destItems = Array.from(tasks[destColumn]);
      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, movedItem);

      setTasks({
        ...tasks,
        [sourceColumn]: sourceItems,
        [destColumn]: destItems,
      });
    }
  };

  const handleAddTask = () => {
    if (newTaskContent.trim() !== '') {
      const newTask = {
        id: `task-${Date.now()}`,
        content: newTaskContent,
      };
      setTasks(prevTasks => ({
        ...prevTasks,
        [newTaskStatus]: [...prevTasks[newTaskStatus], newTask],
      }));
      setNewTaskContent('');
      setOpenAddTask(false);
    }
  };

  const renderKanbanBoard = () => (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-between space-x-4">
        {Object.entries(tasks).map(([columnId, column]) => (
          <Droppable droppableId={columnId} key={columnId}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`flex-1 p-4 rounded-lg ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-100'
                } ${snapshot.isDraggingOver ? 'bg-opacity-60' : ''}`}
              >
                <h3 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{columnId}</h3>
                {column.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-2 mb-2 rounded ${
                          darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                        } ${snapshot.isDragging ? 'shadow-lg' : 'shadow'}`}
                      >
                        {task.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );

  const renderTableView = () => (
    <div className={`overflow-x-auto ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Task</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
          {Object.entries(tasks).flatMap(([status, taskList]) =>
            taskList.map(task => (
              <tr key={task.id}>
                <td className="px-6 py-4 whitespace-nowrap">{task.content}</td>
                <td className="px-6 py-4 whitespace-nowrap">{status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  const renderListView = () => (
    <ul className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
      {Object.entries(tasks).flatMap(([status, taskList]) =>
        taskList.map(task => (
          <li key={task.id} className="py-4">
            <div className={`flex justify-between ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <span>{task.content}</span>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{status}</span>
            </div>
          </li>
        ))
      )}
    </ul>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Agile Design Dashboard</h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'}`}
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        <div className={`p-6 rounded-lg shadow-lg mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-2xl font-semibold mb-4">SDLC Case Study: Project X</h2>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Business Requirements</label>
            <textarea
              className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
              rows="4"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Enter project requirements..."
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Project Deadline</label>
            <input
              type="date"
              className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={generateAiSuggestion}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              <Zap size={20} className="mr-2" />
              Generate AI Suggestion
            </button>
            <button
              onClick={handleShare}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              <Share2 size={20} className="mr-2" />
              Share Requirements
            </button>
          </div>
        </div>

        {aiSuggestion && (
          <div className={`p-6 rounded-lg shadow-lg mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-xl font-semibold mb-2">AI Suggestion:</h3>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              {aiSuggestion}
            </p>
          </div>
        )}

        <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Task Management</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setView('kanban')}
                className={`p-2 rounded ${view === 'kanban' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
              >
                <Kanban size={20} />
              </button>
              <button
                onClick={() => setView('table')}
                className={`p-2 rounded ${view === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
              >
                <Table size={20} />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded ${view === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
              >
                <List size={20} />
              </button>
              <button
                onClick={() => setOpenAddTask(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} className="mr-2" />
                Add Task
              </button>
            </div>
          </div>
          {view === 'kanban' && renderKanbanBoard()}
          {view === 'table' && renderTableView()}
          {view === 'list' && renderListView()}
        </div>
      </div>

      {openAddTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} w-96`}>
            <h3 className="text-xl font-semibold mb-4">Add New Task</h3>
            <input
              type="text"
              className={`w-full p-2 mb-4 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
              placeholder="Task description"
              value={newTaskContent}
              onChange={(e) => setNewTaskContent(e.target.value)}
            />
            <select
              className={`w-full p-2 mb-4 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
              value={newTaskStatus}
              onChange={(e) => setNewTaskStatus(e.target.value)}
            >
              {Object.keys(tasks).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setOpenAddTask(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgileDesignDashboard;