import { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TaskTypeWithId } from './utils/ModifyElement.tsx'
import {
  changeTaskTitleType,
  FilterValues,
  TaskType,
  Todolist,
} from './App.tsx'
import { Button } from './Button.tsx'
import { EditableSpan } from './EditableSpan.tsx'

export type createTaskFnType = (title: TaskType['title']) => void
type TodolistItemProps = {
  todolist: Todolist
  deleteTodolist: (todolistId: string) => void
  tasks: TaskTypeWithId[]
  date?: string
  deleteTask: (todolistId: string, taskId: string) => void
  changeFilter: (id: string, filter: FilterValues) => void
  createTask: (todolistId: string, title: string) => void
  changeTaskTitle: changeTaskTitleType
  changeTodoListTitle: (todolistId: string, title: string) => void
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    isDone: boolean,
  ) => void
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

export const TodolistItem: FC<TodolistItemProps> = (props) => {
  const [taskTitle, setTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
    setError(null)
  }

  const {
    deleteTask,
    todolist: { id, title, filter },
    deleteTodolist,
    tasks,
    date,
    changeFilter,
    createTask,
    changeTaskStatus,
    changeTaskTitle,
    changeTodoListTitle,
  } = props

  const createTaskHandler = () => {
    if (taskTitle.trim() !== '') {
      createTask(id, taskTitle)
      setTaskTitle('')
    } else {
      setError('Title is required!')
    }
  }

  const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && taskTitle && taskTitle.length <= 15) {
      createTaskHandler()
    }
  }

  const changeTaskStatusHandler = (
    taskId: string,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    changeTaskStatus(id, taskId, e.currentTarget.checked)
  }

  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(id, filter)
  }

  const deleteTodolistHandler = () => {
    deleteTodolist(id)
  }

  const isButtonAddTaskDisabled = !taskTitle.length || taskTitle.length > 15

  const changeTodolistTitleHandler = (title: string) => {
    changeTodoListTitle(id, title)
  }

  return (
    <div>
      <div className={'container'}>
        <h3>
          <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
        </h3>
        <Button title={'x'} onClick={deleteTodolistHandler} />
      </div>
      <div>{date}</div>
      <div>
        <input
          className={error ? 'error' : ''}
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyDown={createTaskOnEnterHandler}
        />

        <button onClick={createTaskHandler} disabled={isButtonAddTaskDisabled}>
          +
        </button>
        {error && <p className={'error-message'}>{error}</p>}
        {!taskTitle && <div>Please, enter title</div>}
        {taskTitle.length > 15 && (
          <div style={{ color: 'red' }}>Title length too long</div>
        )}
        {!!taskTitle.length && taskTitle.length <= 15 && (
          <div>Amount of charters (15 - {taskTitle.length}</div>
        )}
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const deleteTaskHandler = () => {
              deleteTask(id, task.id)
            }
            const changeTaskTitleHandler = (title: string) => {
              changeTaskTitle(id, task.id, title)
            }
            return (
              <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <input
                  type='checkbox'
                  checked={task.isDone}
                  onChange={(e) => changeTaskStatusHandler(task.id, e)}
                />
                <EditableSpan
                  value={task.title}
                  onChange={changeTaskTitleHandler}
                />
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
              onClick={() => changeFilterHandler(button.filter)}
              title={button.title}
            />
          )
        })}
      </div>
    </div>
  )
}
