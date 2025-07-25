import { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TaskTypeWithId } from './utils/ModifyElement.tsx'
import { TaskType } from './App.tsx'

export type createTaskFnType = (title: TaskType['title']) => void
type TodolistItemProps = {
  title: string
  tasks: TaskTypeWithId[]
  date?: string
  deleteTask: (taskId: string) => void
  changeFilter: (filter: string) => void
  createTask: createTaskFnType
}

type ButtonsType = {
  id?: string
  title: string
}

let buttonsData: ButtonsType[] = [
  { id: uuidv4(), title: 'All' },
  { id: uuidv4(), title: 'Active' },
  { id: uuidv4(), title: 'Completed' },
]

export const TodolistItem: FC<TodolistItemProps> = ({
  deleteTask,
  title,
  tasks,
  date,
  changeFilter,
  createTask,
}) => {
  const [taskTitle, setTaskTitle] = useState('')

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
  }

  const createTaskHandler = () => {
    createTask(taskTitle)
    setTaskTitle('')
  }

  const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      createTaskHandler()
    }
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>{date}</div>
      <div>
        <input
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyDown={createTaskOnEnterHandler}
        />
        <button onClick={createTaskHandler}>+</button>
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const deleteTaskHandler = () => {
              deleteTask(task.id)
            }
            return (
              <li key={task.id}>
                <input type='checkbox' checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={deleteTaskHandler}>x</button>
              </li>
            )
          })}
        </ul>
      )}

      <div>
        {buttonsData.map((button) => {
          return (
            <button key={button.id} onClick={() => changeFilter(button.title)}>
              {button.title}
            </button>
          )
        })}
      </div>
    </div>
  )
}
