import { type ChangeEvent, type KeyboardEvent, useState } from 'react'
import TextField from '@mui/material/TextField'
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'

type Props = {
  onCreateItem: (title: string) => void
}

export const CreateItemForm = ({ onCreateItem }: Props) => {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const createItemHandler = () => {
    const trimmedTitle = title.trim()
    if (trimmedTitle !== '') {
      onCreateItem(trimmedTitle)
      setTitle('')
    } else {
      setError('Title is required')
    }
  }

  const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
    setError(null)
  }

  const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createItemHandler()
    }
  }

  const isButtonDisabled = title.length > 15

  return (
    <div>
      <TextField
        label={'Enter a title'}
        variant={'outlined'}
        className={error ? 'error' : ''}
        value={title}
        size={'small'}
        error={!!error || isButtonDisabled}
        helperText={error}
        onChange={changeItemTitleHandler}
        onKeyDown={createItemOnEnterHandler}
      />
      <IconButton
        onClick={createItemHandler}
        color={'primary'}
        disabled={isButtonDisabled}
      >
        <AddBoxIcon />
      </IconButton>
      {title.length > 15 && (
        <div style={{ color: 'red' }}>Title length too long</div>
      )}
      {!!title.length && title.length <= 15 && (
        <div>Amount of charters (15 - {title.length})</div>
      )}
    </div>
  )
}
