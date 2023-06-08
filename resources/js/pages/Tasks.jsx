import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Tasks() {

    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/api/tasks')
        .then(response => {
            
            setTasks(response.data.data)
        })
        .catch(error => console.error(error));
    }, []);
    const taskList = tasks.map((task) =>
        <li key={task.id}> {task.attributes.name}</li>
    );
    return (
        <ul>{taskList}</ul>
    )
}
