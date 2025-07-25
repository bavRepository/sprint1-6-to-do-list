import { createTaskFnType, TodolistItem } from './TodolistItem.tsx'
import './App.css'
import {
  addIdToElementList,
  getId,
  TaskTypeWithId,
} from './utils/ModifyElement.tsx'
import { useState } from 'react'

const tasksWithNoId: TaskType[] = [
  { title: 'HTML&CSS', isDone: true },
  { title: 'JS', isDone: true },
  { title: 'ReactJS', isDone: false },
  { title: 'Redux', isDone: false },
  { title: 'Typescript', isDone: false },
  { title: 'RTK query', isDone: false },
]

export type TaskType = {
  title: string
  isDone: boolean
}

export type changeTaskStatusType = (id: string, status: boolean) => void

export const App = () => {
  let tasksData: TaskTypeWithId[] = addIdToElementList(tasksWithNoId)
  const [tasks, setTasks] = useState<TaskTypeWithId[]>(tasksData)
  const [filter, setFilter] = useState<string>('all')

  const deleteTask = (id: TaskTypeWithId['id']) => {
    const newTasks: TaskTypeWithId[] = tasks.filter((task) => task.id !== id)

    setTasks(newTasks)
  }

  const changeTaskStatus: changeTaskStatusType = (
    id: string,
    isDone: boolean,
  ) => {
    const task = tasks.find((task) => {
      return task.id === id
    })
    if (task) {
      task.isDone = isDone
    }

    setTasks([...tasks])
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

  const getFilteredTasks = (
    tasks: TaskTypeWithId[],
    filter: string,
  ): TaskTypeWithId[] => {
    if (filter === 'all') return tasks
    let newTasks
    if (filter === 'active') {
      newTasks = tasks.filter((task) => !task.isDone)
    } else {
      newTasks = tasks.filter((task) => task.isDone)
    }
    return newTasks
  }

  const filteredTasks: TaskTypeWithId[] = getFilteredTasks(tasks, filter)

  return (
    <div className='app'>
      <TodolistItem
        deleteTask={deleteTask}
        date={'22.06.85'}
        title='What to learn'
        tasks={filteredTasks}
        changeFilter={changeFilter}
        filter={filter}
        createTask={createTask}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  )
}
