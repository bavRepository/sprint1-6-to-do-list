import { TodolistItem } from './TodolistItem.tsx'
import './App.css'
import { getId } from './utils/ModifyElement.tsx'
import { useState } from 'react'

export type FilterValues = 'all' | 'active' | 'completed'

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

const todolistId1 = getId()
const todolistId2 = getId()

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksState = {
  [key: string]: TaskType[]
}

export const App = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ])

  const [tasks, setTasks] = useState<TasksState>({
    [todolistId1]: [
      { id: getId(), title: 'HTML&CSS', isDone: true },
      { id: getId(), title: 'JS', isDone: true },
      { id: getId(), title: 'ReactJS', isDone: false },
    ],
    [todolistId2]: [
      { id: getId(), title: 'Rest API', isDone: true },
      { id: getId(), title: 'GraphQL', isDone: false },
    ],
  })

  const deleteTask = (todolistId: string, taskId: string) => {
    const todolistTasks = tasks[todolistId]
    const newTodolistTasks = todolistTasks.filter((task) => task.id !== taskId)
    tasks[todolistId] = newTodolistTasks
    setTasks({ ...tasks })
  }

  const createTask = (todolistId: string, title: string) => {
    const newTask = { id: getId(), title, isDone: false }
    const todolistTasks = tasks[todolistId]
    tasks[todolistId] = [newTask, ...todolistTasks]
    setTasks({ ...tasks })
  }

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean,
  ) => {
    const todolistTasks = tasks[todolistId]
    const newTodolistTasks = todolistTasks.map((task) =>
      task.id == taskId ? { ...task, isDone } : task,
    )
    tasks[todolistId] = newTodolistTasks
    setTasks({ ...tasks })
  }

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    setTodolists(
      todolists.map((todolist) =>
        todolist.id === todolistId ? { ...todolist, filter } : todolist,
      ),
    )
  }

  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter((todolist) => todolist.id !== todolistId))
    delete tasks[todolistId]
    setTasks({ ...tasks })
  }

  return (
    <div className='app'>
      {todolists.map((todolist) => {
        const todolistTasks = tasks[todolist.id]
        let filteredTasks = todolistTasks
        if (todolist.filter === 'active') {
          filteredTasks = todolistTasks.filter((task) => !task.isDone)
        }
        if (todolist.filter === 'completed') {
          filteredTasks = todolistTasks.filter((task) => task.isDone)
        }

        return (
          <TodolistItem
            key={todolist.id}
            todolist={todolist}
            tasks={filteredTasks}
            deleteTask={deleteTask}
            changeFilter={changeFilter}
            createTask={createTask}
            changeTaskStatus={changeTaskStatus}
            deleteTodolist={deleteTodolist}
          />
        )
      })}
    </div>
  )
}
