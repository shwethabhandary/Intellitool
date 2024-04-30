import React, { useState, useEffect } from 'react';
import { Checkbox, IconButton, Button, Input, Select } from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';


const Task = () => {
    const [assignments, setAssignments] = useState([]);
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');
    const [filter, setFilter] = useState({ week: '', course: '', grade: '' });

    const goToTaskView = () => {
        navigate('TaskView'); // Navigate to the taskview page
    };

    useEffect(() => {
        const fetchAssignments = async () => {
            const assignmentsData = [
                { id: 1, courseName: 'Calculus', professor: 'Dr. Smith', description: 'Chapter 5 Integral Problems', dueDate: '2024-04-25', grade: Math.floor(Math.random() * 40) + 60 + '%', completed: false },
                { id: 2, courseName: 'Literature', professor: 'Prof. Johnson', description: 'Essay on Modernism', dueDate: '2024-04-24', grade: Math.floor(Math.random() * 40) + 60  + '%', completed: false },
                { id: 3, courseName: 'Chemistry', professor: 'Dr. Lee', description: 'Lab report on titration', dueDate: '2024-04-23', grade: Math.floor(Math.random() * 40) + 60 + '%', completed: false },
            ];
            setAssignments(assignmentsData);
        };

        fetchAssignments();
    }, []);

    const handleToggleAssignment = id => {
        const updatedAssignments = assignments.map(assignment =>
            assignment.id === id ? { ...assignment, completed: !assignment.completed } : assignment
        );
        setAssignments(updatedAssignments);
    };

    const handleAddTodo = () => {
        const newEntry = { id: Date.now(), task: newTodo, completed: false };
        setTodos([...todos, newEntry]);
        setNewTodo('');
    };

    const handleToggleTodo = id => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    const startEditTodo = (todo) => {
        setEditId(todo.id);
        setEditText(todo.task);
    };

    const handleEditTodo = () => {
        const updatedTodos = todos.map(todo =>
            todo.id === editId ? { ...todo, task: editText } : todo
        );
        setTodos(updatedTodos);
        setEditId(null);
        setEditText('');
    };

    const handleDeleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
                {/* Assignments Section */}
                <div className="bg-white p-4 shadow rounded-lg">
                    <h2 className="text-lg font-semibold mb-3">Weekly Assignments</h2>
                    <div className="mb-3 flex space-x-2">
    <Select placeholder="Filter by week" onChange={(e) => setFilter({ ...filter, week: e.target.value })} className="w-40">
        <option value="1">Week 1</option>
        <option value="2">Week 2</option>
        {/* Add more weeks as needed */}
    </Select>
    <Select placeholder="Filter by course" onChange={(e) => setFilter({ ...filter, course: e.target.value })} className="w-40">
        <option value="Calculus">Calculus</option>
        <option value="Literature">Literature</option>
        {/* Add more courses as needed */}
    </Select>
</div>

                    {assignments.map((assignment) => (
                        <div key={assignment.id} className={`p-3 mb-2 bg-gray-100 rounded-lg ${assignment.completed ? 'line-through' : ''}`}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold">{assignment.courseName} - {assignment.professor}</h3>
                                    <p>{assignment.description}</p>
                                    <p>Current Grade: {assignment.grade}</p>
                                    <p>Assignment Deadline: {assignment.dueDate}</p>
                                </div>
                                <div>
                                    <Checkbox isChecked={assignment.completed} onChange={() => handleToggleAssignment(assignment.id)} size="lg" />
                                </div>
                            </div>
                            <Button size="xs" colorScheme="blue">Ask AI</Button>
                        </div>
                    ))}
                </div>

                {/* Todo Section */}
                <div className="bg-white p-4 shadow rounded-lg">
                    <h2 className="text-lg font-semibold mb-3">Personal To-Do List</h2>
                    <div className="mb-4 flex">
                        <Input
                            placeholder="Add new todo"
                            value={newTodo}
                            onChange={e => setNewTodo(e.target.value)}
                            className="flex-1 border p-1 rounded mr-2"
                        />
                        <IconButton
                            aria-label="Add todo"
                            icon={<AddIcon />}
                            onClick={handleAddTodo}
                        />
                    </div>
                    {todos.map((todo) => (
                        <div key={todo.id} className="flex items-center justify-between mb-2 bg-gray-100 p-2 rounded-lg">
                            {editId === todo.id ? (
                                <>
                                    <Input
                                        value={editText}
                                        onChange={e => setEditText(e.target.value)}
                                        className="flex-1"
                                    />
                                    <IconButton aria-label="Save edit" icon={<EditIcon />} onClick={handleEditTodo} />
                                </>
                            ) : (
                                <>
                                    <span className={`flex-1 ${todo.completed ? 'line-through' : ''}`}>{todo.task}</span>
                                    <Checkbox isChecked={todo.completed} onChange={() => handleToggleTodo(todo.id)} />
                                    <IconButton aria-label="Edit todo" icon={<EditIcon />} onClick={() => startEditTodo(todo)} />
                                    <IconButton aria-label="Delete todo" icon={<DeleteIcon />} onClick={() => handleDeleteTodo(todo.id)} />
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Task;
