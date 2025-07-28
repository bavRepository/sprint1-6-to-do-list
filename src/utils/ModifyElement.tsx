import { v4 as uuidv4 } from 'uuid'
import { TaskType } from '../App.tsx'

export type TaskTypeWithId = TaskType & { id: string }

export const getId = () => {
  return uuidv4()
}
