import type { TasksState, TaskType, Todolist } from '../App'
import { v1 } from 'uuid'

const initialState: TasksState = {}

export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
export type CreateTaskAction = ReturnType<typeof createTaskAC>
export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>

export const createTodolistAC = (id: string) => {
  return {
    type: 'create_todolist',
    payload: { id },
  } as const
}

export const deleteTodolistAC = (id: Todolist['id']) => {
  return {
    type: 'delete_todolist',
    payload: { id },
  } as const
}
export const deleteTaskAC = ({
  todolistId,
  taskId,
}: {
  todolistId: string
  taskId: string
}) => {
  return {
    type: 'delete_task',
    payload: { todolistId, taskId },
  } as const
}
export const createTaskAC = ({
  todolistId,
  title,
}: {
  todolistId: string
  title: string
}) => {
  return {
    type: 'create_task',
    payload: { todolistId, title },
  } as const
}

export const changeTaskStatusAC = ({
  todolistId,
  taskId,
  checked,
}: {
  todolistId: string
  taskId: string
  checked: boolean
}) => {
  return {
    type: 'update_taskStatus',
    payload: { todolistId, taskId, checked },
  } as const
}

export const changeTaskTitleAC = ({
  todolistId,
  taskId,
  title,
}: {
  todolistId: string
  taskId: string
  title: string
}) => {
  return {
    type: 'update_TaskTitle',
    payload: { todolistId, taskId, title },
  } as const
}

export const tasksReducer = (
  state: TasksState = initialState,
  action: Actions,
): TasksState => {
  switch (action.type) {
    case 'create_todolist': {
      return { ...state, [action.payload.id]: [] }
    }
    case 'delete_todolist': {
      const newState = { ...state }
      delete newState[action.payload.id]
      return newState
    }

    case 'create_task': {
      const newTask = {
        id: v1(),
        title: action.payload.title,
        isDone: false,
      }
      const newState = { ...state }
      const data: TaskType[] = newState[action.payload.todolistId]
        ? [...newState[action.payload.todolistId], newTask]
        : [newTask]

      return {
        ...state,
        [action.payload.todolistId]: data,
      }
    }
    case 'delete_task': {
      const newState = { ...state }
      const newTasksList: TaskType[] = newState[
        action.payload.todolistId
      ].filter((task) => task.id !== action.payload.taskId)
      return { ...newState, [action.payload.todolistId]: newTasksList }
    }
    case 'update_taskStatus': {
      const newState = { ...state }
      newState[action.payload.todolistId] = [
        ...newState[action.payload.todolistId],
      ]
      const newTask = newState[action.payload.todolistId].find(
        (task) => task.id === action.payload.taskId,
      )
      if (newTask) {
        newTask.isDone = action.payload.checked
      }

      return newState
    }
    case 'update_TaskTitle': {
      const newState = { ...state }
      const task = newState[action.payload.todolistId].find(
        (task) => task.id === action.payload.taskId,
      )
      if (task) {
        task.title = action.payload.title
      }
      return newState
    }

    default:
      return state
  }
}

type Actions =
  | CreateTodolistAction
  | DeleteTodolistAction
  | DeleteTaskAction
  | CreateTaskAction
  | ChangeTaskStatusAction
  | ChangeTaskTitleAction
