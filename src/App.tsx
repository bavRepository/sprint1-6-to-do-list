import { createTaskFnType, TodolistItem } from './TodolistItem.tsx'
import './App.css'
import {
  addIdToElementList,
  getId,
  TaskTypeWithId,
} from './utils/ModifyElement.tsx'
import { useState } from 'react'

export type TaskType = {
  title: string
  isDone: boolean
}

const tasksWithNoId: TaskType[] = [
  { title: 'HTML&CSS', isDone: true },
  { title: 'JS', isDone: true },
  { title: 'ReactJS', isDone: false },
  { title: 'Redux', isDone: false },
  { title: 'Typescript', isDone: false },
  { title: 'RTK query', isDone: false },
]

export const App = () => {
  let tasksData: TaskTypeWithId[] = addIdToElementList(tasksWithNoId)
  const [tasks, setTasks] = useState<TaskTypeWithId[]>(tasksData)
  const [filter, setFilter] = useState<string>('All')

  const deleteTask = (id: TaskTypeWithId['id']) => {
    const newTasks: TaskTypeWithId[] = tasks.filter((task) => task.id !== id)

    setTasks(newTasks)
  }

  const changeFilter = (filter: string) => {
    setFilter(filter)
  }

  const createTask: createTaskFnType = (title) => {
    setTasks([
      ...tasks,
      {
        id: getId(),
        title,
        isDone: false,
      },
    ])
  }

  let filteredTasks: TaskTypeWithId[] = tasks
  if (filter === 'Active') {
    filteredTasks = tasks.filter((task) => !task.isDone)
  }
  if (filter === 'Completed') {
    filteredTasks = tasks.filter((task) => task.isDone)
  }

  return (
    <div className='app'>
      <TodolistItem
        deleteTask={deleteTask}
        date={'22.06.85'}
        title='What to learn'
        tasks={filteredTasks}
        changeFilter={changeFilter}
        createTask={createTask}
      />
    </div>
  )
}
