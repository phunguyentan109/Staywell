import React from 'react'
import CustomScrollbars from 'util/CustomScrollbars'

import Item from './Item'

const TodoItem = (({ toDos, onTodoSelect, onTodoChecked, onMarkAsStart }) => {
  return (
    <div className='gx-module-list'>
      <CustomScrollbars className='gx-module-content-scroll'>
        {toDos.map((todo, index) =>
          <Item key={index} index={index} todo={todo} onTodoSelect={onTodoSelect}
            onMarkAsStart={onMarkAsStart}
            onTodoChecked={onTodoChecked}/>
        )}
      </CustomScrollbars>
    </div>
  )
})

export default TodoItem
