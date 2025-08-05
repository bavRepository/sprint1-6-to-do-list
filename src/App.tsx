import { TodolistItem } from './TodolistItem.tsx'
import './App.css'
import { getId } from './utils/ModifyElement.tsx'
import { useState } from 'react'
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

type ThemeMode = 'dark' | 'light'

export type FilterValues = 'all' | 'active' | 'completed'

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

const todolistId1 = getId()
const todolistId2 = getId()

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

export const App = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ])

  const [tasks, setTasks] = useState<TasksState>({
    [todolistId1]: [
      { id: getId(), title: 'HTML&CSS', isDone: true },
      { id: getId(), title: 'JS', isDone: true },
      { id: getId(), title: 'ReactJS', isDone: false },
    ],
    [todolistId2]: [
      { id: getId(), title: 'Rest API', isDone: true },
      { id: getId(), title: 'GraphQL', isDone: false },
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
    const todolistTasks = tasks[todolistId]
    const newTodolistTasks = todolistTasks.filter((task) => task.id !== taskId)
    tasks[todolistId] = newTodolistTasks
    setTasks({ ...tasks })
  }

  const createTask = (todolistId: string, title: string) => {
    const newTask = { id: getId(), title, isDone: false }
    const todolistTasks = tasks[todolistId]
    tasks[todolistId] = [newTask, ...todolistTasks]
    setTasks({ ...tasks })
  }

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean,
  ) => {
    const todolistTasks = tasks[todolistId]
    const newTodolistTasks = todolistTasks.map((task) =>
      task.id == taskId ? { ...task, isDone } : task,
    )
    tasks[todolistId] = newTodolistTasks
    setTasks({ ...tasks })
  }

  const changeTaskTitle: changeTaskTitleType = (todolistId, id, title) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((task) =>
        task.id === id ? { ...task, title } : task,
      ),
    })
  }

  // TodoList CRUD
  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter((todolist) => todolist.id !== todolistId))
    delete tasks[todolistId]
    setTasks({ ...tasks })
  }

  const createTodoListHandler = (title: string) => {
    const id = getId()
    const newTodolist: Todolist = { id, title, filter: 'all' }

    const newTaskObj = { ...tasks, [id]: [] }
    setTodolists([newTodolist, ...todolists])
    setTasks(newTaskObj)
  }

  const changeTodoListFilter = (todolistId: string, filter: FilterValues) => {
    setTodolists(
      todolists.map((todolist) =>
        todolist.id === todolistId ? { ...todolist, filter } : todolist,
      ),
    )
  }

  const changeTodoListTitle = (todolistId: string, title: string) => {
    setTodolists(
      todolists.map((todolist) =>
        todolist.id === todolistId ? { ...todolist, title } : todolist,
      ),
    )
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
            <CreateItemForm onCreateItem={createTodoListHandler} />
          </Grid>
          <Grid container spacing={4}>
            {todolists.map((todolist) => {
              const todolistTasks = tasks[todolist.id]
              let filteredTasks = todolistTasks
              if (todolist.filter === 'active') {
                filteredTasks = todolistTasks.filter((task) => !task.isDone)
              }
              if (todolist.filter === 'completed') {
                filteredTasks = todolistTasks.filter((task) => task.isDone)
              }

              return (
                <Grid key={todolist.id}>
                  <Paper sx={{ p: '0 20px 20px 20px' }}>
                    <TodolistItem
                      todolist={todolist}
                      changeTodoListTitle={changeTodoListTitle}
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
