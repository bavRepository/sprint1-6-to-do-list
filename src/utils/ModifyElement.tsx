import { v4 as uuidv4 } from 'uuid'
import { TaskType } from '../App.tsx'

export type TaskTypeWithId = TaskType & { id: string }

export const getId = () => {
  return uuidv4()
}

export const addIdToElementList: (
  elementList: TaskType[],
) => TaskTypeWithId[] = (elementList) => {
  return elementList.map((item) => {
    return { id: uuidv4(), ...item }
  })
}
