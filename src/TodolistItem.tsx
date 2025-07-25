import { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TaskTypeWithId } from './utils/ModifyElement.tsx'
import { changeTaskStatusType, TaskType } from './App.tsx'
import { Button } from './Button.tsx'

export type createTaskFnType = (title: TaskType['title']) => void
type TodolistItemProps = {
  title: string
  tasks: TaskTypeWithId[]
  date?: string
  deleteTask: (taskId: string) => void
  changeFilter: (filter: string) => void
  filter: string
  createTask: createTaskFnType
  changeTaskStatus: changeTaskStatusType
}

type ButtonsType = {
  id?: string
  title: string
  filter: 'all' | 'active' | 'completed'
}

let buttonsData: ButtonsType[] = [
  { id: uuidv4(), title: 'All', filter: 'all' },
  { id: uuidv4(), title: 'Active', filter: 'active' },
  { id: uuidv4(), title: 'Completed', filter: 'completed' },
]

export const TodolistItem: FC<TodolistItemProps> = ({
  deleteTask,
  title,
  tasks,
  date,
  changeFilter,
  createTask,
  changeTaskStatus,
  filter,
}) => {
  const [taskTitle, setTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
    setError(null)
  }

  const createTaskHandler = () => {
    if (taskTitle.trim() !== '') {
      createTask(taskTitle)
      setTaskTitle('')
    } else {
      setError('Title is required!')
    }
  }

  const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      createTaskHandler()
    }
  }

  const changeTaskStatusHandler = (
    id: string,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    changeTaskStatus(id, e.currentTarget.checked)
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>{date}</div>
      <div>
        <input
          className={error ? 'error' : ''}
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyDown={createTaskOnEnterHandler}
        />

        <button onClick={createTaskHandler}>+</button>
        {error && <p className={'error-message'}>{error}</p>}
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
              <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <input
                  type='checkbox'
                  checked={task.isDone}
                  onChange={(e) => changeTaskStatusHandler(task.id, e)}
                />
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
            <Button
              key={button.id}
              className={filter === button.filter ? 'active-filter' : ''}
              onClick={() => changeFilter(button.filter)}
              title={button.title}
            />
          )
        })}
      </div>
    </div>
  )
}
