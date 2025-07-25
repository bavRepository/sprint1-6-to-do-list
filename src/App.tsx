import { TodolistItem } from './TodolistItem.tsx'
import { v4 as uuidv4 } from 'uuid'
import './App.css'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TaskProps = {}

export const App = () => {
  const tasks1: TaskType[] = [
    { id: uuidv4(), title: 'HTML&CSS', isDone: true },
    { id: uuidv4(), title: 'JS', isDone: true },
    { id: uuidv4(), title: 'ReactJS', isDone: false },
    { id: uuidv4(), title: 'Redux', isDone: false },
    { id: uuidv4(), title: 'Typescript', isDone: false },
    { id: uuidv4(), title: 'RTK query', isDone: false },
  ]

  return (
    <div className='app'>
      <TodolistItem date={'22.06.85'} title='What to learn' tasks={tasks1} />
    </div>
  )
}
