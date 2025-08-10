import { TodolistItem } from './TodolistItem.tsx'
import './App.css'
import { useReducer, useState } from 'react'
import { CreateItemForm } from './CreateIteamForm.tsx'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { containerSx } from './TodolistItem.styles.ts'
import { NavButton } from './NavButton.ts'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
  todolistsReducer,
} from './model/Todolists-reducer.ts'
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTaskAC,
  deleteTaskAC,
  tasksReducer,
} from './model/tasks-reducer.ts'
import { v1 } from 'uuid'

type ThemeMode = 'dark' | 'light'

export type FilterValues = 'all' | 'active' | 'completed'

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksState = {
  [key: string]: TaskType[]
}

export type changeTaskTitleType = (
  todolistId: string,
  taskId: string,
  title: string,
) => void

const todolistId1 = v1()
const todolistId2 = v1()

export const App = () => {
  const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
    { id: todolistId1, title: 'What to learn', filter: 'all' },

    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ])

  const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [todolistId1]: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    [todolistId2]: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  })

  const [themeMode, setThemeMode] = useState<ThemeMode>('light')

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#087EA4',
      },
    },
  })
  // TaskList CRUD
  const changeMode = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light')
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    dispatchToTasks(deleteTaskAC({ todolistId, taskId }))
  }

  const createTask = (todolistId: string, title: string) => {
    dispatchToTasks(createTaskAC({ todolistId, title }))
  }

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean,
  ) => {
    dispatchToTasks(changeTaskStatusAC({ todolistId, taskId, isDone }))
  }

  const changeTaskTitle: changeTaskTitleType = (
    todolistId: string,
    taskId: string,
    title: string,
  ) => {
    dispatchToTasks(changeTaskTitleAC({ todolistId, taskId, title }))
  }

  // TodoList CRUD

  const createTodolist = (title: string) => {
    const actionToDoList = createTodolistAC(title)
    dispatchToTodolists(actionToDoList)
    const actionTasksNewItemId = createTodolistAC(actionToDoList.payload.id)
    dispatchToTasks(actionTasksNewItemId)
  }

  const deleteTodolist = (id: string) => {
    const action = deleteTodolistAC(id)
    dispatchToTodolists(action)
    const actionDelTasks = deleteTodolistAC(id)
    dispatchToTasks(actionDelTasks)
  }

  const changeTodoListFilter = (id: string, filter: FilterValues) => {
    const action = changeTodolistFilterAC({ id, filter })
    dispatchToTodolists(action)
  }

  const changeTodolistTitle = (todolistId: string, title: string) => {
    const action = changeTodolistTitleAC({ id: todolistId, title })
    dispatchToTodolists(action)
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position='static' sx={{ mb: '30px' }}>
          <Toolbar>
            <Container maxWidth={'lg'} sx={containerSx}>
              <IconButton color='inherit'>
                <MenuIcon />
              </IconButton>
              <div>
                <NavButton>Sign in</NavButton>
                <NavButton>Sign up</NavButton>
                <NavButton background={theme.palette.primary.dark}>
                  Faq
                </NavButton>
                <Switch color={'default'} onChange={changeMode} />
              </div>
            </Container>
          </Toolbar>
        </AppBar>
        <Container maxWidth={'lg'}>
          <Grid container sx={{ mb: '30px' }}>
            <CreateItemForm onCreateItem={createTodolist} />
          </Grid>
          <Grid container spacing={4}>
            {todolists.map((todolist) => {
              const todolistTasks = tasks[todolist.id]
              let filteredTasks = todolistTasks
              if (todolistTasks) {
                if (todolist.filter === 'active') {
                  filteredTasks = todolistTasks.filter((task) => !task.isDone)
                }
                if (todolist.filter === 'completed') {
                  filteredTasks = todolistTasks.filter((task) => task.isDone)
                }
              }

              return (
                <Grid key={todolist.id}>
                  <Paper sx={{ p: '0 20px 20px 20px' }}>
                    <TodolistItem
                      todolist={todolist}
                      changeTodolistTitle={changeTodolistTitle}
                      tasks={filteredTasks}
                      deleteTask={deleteTask}
                      changeFilter={changeTodoListFilter}
                      createTask={createTask}
                      changeTaskStatus={changeTaskStatus}
                      deleteTodolist={deleteTodolist}
                      changeTaskTitle={changeTaskTitle}
                    />
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  )
}
