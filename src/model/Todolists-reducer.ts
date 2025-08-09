import { FilterValues, Todolist } from '../App.tsx'
import { v1 } from 'uuid'

const initialState: Todolist[] = []

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAction = ReturnType<
  typeof changeTodolistFilterAC
>

export const deleteTodolistAC = (id: string) => {
  return { type: 'delete_todolist', payload: { id } } as const
}

export const createTodolistAC = (title: string) => {
  const id = v1()
  return { type: 'create_todolist', payload: { title, id } } as const
}

export const changeTodolistTitleAC = ({
  id,
  title,
}: {
  id: string
  title: string
}) => {
  return {
    type: 'change_todolistTitle',
    payload: { title, id } as const,
  } as const
}

export const changeTodolistFilterAC = ({
  id,
  filter,
}: {
  id: string
  filter: FilterValues
}) => {
  return {
    type: 'change_todolistFilter',
    payload: { id, filter } as const,
  } as const
}

type Actions =
  | DeleteTodolistAction
  | CreateTodolistAction
  | ChangeTodolistTitleAction
  | ChangeTodolistFilterAction

export const todolistsReducer = (
  state: Todolist[] = initialState,
  action: Actions,
): Todolist[] => {
  switch (action.type) {
    case 'delete_todolist':
      return state.filter((todolist) => {
        return todolist.id !== action.payload.id
      })
    case 'create_todolist':
      const newTodolist: Todolist = {
        id: action.payload.id,
        title: action.payload.title,
        filter: 'all',
      }
      return [...state, newTodolist]
    case 'change_todolistTitle':
      return state.map((todolist) => {
        return todolist.id === action.payload.id
          ? { ...todolist, title: action.payload.title }
          : todolist
      })
    case 'change_todolistFilter':
      return state.map((todolist) => {
        return todolist.id === action.payload.id
          ? { ...todolist, filter: action.payload.filter }
          : todolist
      })
    default:
      return state
  }
}
