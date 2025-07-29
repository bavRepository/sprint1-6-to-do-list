import { ChangeEvent, useState } from 'react'

type EditableSpanProps = {
  value: string
  onChange: (title: string) => void
}

export const EditableSpan = ({ value, onChange }: EditableSpanProps) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [title, setTitle] = useState(value)
  const turnOnEditMode = () => {
    setIsEditMode(true)
  }

  const turnOffEditMode = () => {
    setIsEditMode(false)
    onChange(title)
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return (
    <>
      {isEditMode ? (
        <input
          value={title}
          autoFocus
          onBlur={turnOffEditMode}
          onChange={changeTitle}
        />
      ) : (
        <span onDoubleClick={turnOnEditMode}>{value}</span>
      )}
    </>
  )
}
