import { FC } from 'react'
import { TaskType } from './App.tsx'
import { v4 as uuidv4 } from 'uuid'

type TodolistItemProps = {
  title: string
  tasks: TaskType[]
  date?: string
}

type ButtonsType = {
  id: string
  title: string
}

const buttonsData: ButtonsType[] = [
  { id: uuidv4(), title: 'All' },
  { id: uuidv4(), title: 'Active' },
  { id: uuidv4(), title: 'Completed' },
]

export const TodolistItem: FC<TodolistItemProps> = ({ title, tasks, date }) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>{date}</div>
      <div>
        <input />
        <button>+</button>
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            return (
              <li key={task.id}>
                <input type='checkbox' checked={task.isDone} />
                <span>task.title</span>
              </li>
            )
          })}
        </ul>
      )}

      <div>
        {buttonsData.map((button) => {
          return <button key={button.id}>{button.title}</button>
        })}
      </div>
    </div>
  )
}
