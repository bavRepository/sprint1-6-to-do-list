import { ChangeEvent, FC } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TaskTypeWithId } from './utils/ModifyElement.tsx'
import {
  changeTaskTitleType,
  FilterValues,
  TaskType,
  Todolist,
} from './App.tsx'
import Button from '@mui/material/Button'
import { EditableSpan } from './EditableSpan.tsx'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import { containerSx } from './TodolistItem.styles.ts'
import Box from '@mui/material/Box'
import { getListItemSx } from './TodolistItem.styles.ts'
import { CreateItemForm } from './CreateIteamForm.tsx'

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

  const createTaskHandler = (taskTitle: string) => {
    createTask(id, taskTitle)
  }

  const changeTaskStatusHandler = (
    e: ChangeEvent<HTMLInputElement>,
    taskId: string,
  ) => {
    changeTaskStatus(id, taskId, e.currentTarget.checked)
  }

  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(id, filter)
  }

  const deleteTodolistHandler = () => {
    deleteTodolist(id)
  }

  const changeTodolistTitleHandler = (title: string) => {
    changeTodoListTitle(id, title)
  }

  return (
    <div className={'todoItem'}>
      <div className={'container'}>
        <h3>
          <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
        </h3>
        <IconButton onClick={deleteTodolistHandler}>
          <DeleteIcon />
        </IconButton>
      </div>
      <div>{date}</div>
      <CreateItemForm onCreateItem={createTaskHandler} />
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasks.map((task) => {
            const deleteTaskHandler = () => {
              deleteTask(id, task.id)
            }
            const changeTaskTitleHandler = (title: string) => {
              changeTaskTitle(id, task.id, title)
            }
            return (
              <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                <div>
                  <Checkbox
                    checked={task.isDone}
                    onChange={(e) => changeTaskStatusHandler(e, task.id)}
                  />
                  <EditableSpan
                    value={task.title}
                    onChange={changeTaskTitleHandler}
                  />
                </div>
                <IconButton onClick={deleteTaskHandler}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            )
          })}
        </List>
      )}

      <div>
        <Box sx={containerSx}>
          {buttonsData.map((button) => {
            return (
              <Button
                key={button.id}
                variant={filter === button.filter ? 'outlined' : 'text'}
                color={'primary'}
                onClick={() => changeFilterHandler(button.filter)}
              >
                {button.title}
              </Button>
            )
          })}
        </Box>
      </div>
    </div>
  )
}
