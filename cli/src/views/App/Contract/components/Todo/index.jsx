import React, { useState, useEffect, useCallback } from 'react'
import { Button, Checkbox, Drawer, Dropdown, Menu, message } from 'antd'

import CustomScrollbars from 'util/CustomScrollbars'

import {
  DEFAULT_TODO,
  DEFAULT_FILTERS,
  DEFAULT_LABELS,
  DEFAULT_OPTIONS,
  DEFAULT_TODO_CONVERSATION
} from '../../modules/const'

import CreateContract from '../../modules/CreateContract'
import TodoItem from '../../modules/todo/TodoItem'
import AppModuleHeader from 'components/AppModuleHeader'
import IntlMessages from 'util/IntlMessages'
import CircularProgress from 'components/CircularProgress/index'
import Auxiliary from 'util/Auxiliary'

const ITEM_HEIGHT = 34

export default function ToDo({}) {
  const [searchTodo, setSearchTodo] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [loader, setLoader] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [drawerState, setDrawerState] = useState(false)
  const [optionName, setOptionName] = useState('None')
  const [anchorEl, setAnchorEl] = useState(null)
  const [allToDos, setAllToDos] = useState(DEFAULT_TODO)
  const [currentTodo, setCurrentTodo] = useState(null)
  const [user, setUser] = useState({
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    avatar: 'https://via.placeholder.com/150x150'
  })
  const [selectedToDos, setSelectedToDos] = useState(0)
  const [labelMenuState, setLabelMenuState] = useState(false)
  const [optionMenuState, setOptionMenuState] = useState(false)
  const [toDos, setToDos] = useState(DEFAULT_TODO)
  const [filter, setFilter] = useState(-1)
  const [todoConversation, setTodoConversation] = useState(DEFAULT_TODO_CONVERSATION)
  const [conversation, setConversation] = useState(null)
  const [addTodo, setAddTodo] = useState(false)
  const [selectedSectionId, setSelectedSectionId] = useState('')
  const [options, setOptions] = useState(DEFAULT_OPTIONS)
  const [labels, setLabels] = useState(DEFAULT_LABELS)
  const [filters, setFilters] = useState(DEFAULT_FILTERS)


  const load = useCallback(async () => {
    manageHeight()
  }, [manageHeight])

  useEffect(() => {
    load()
  }, [load])

  function manageHeight() {
  }

  function onSortEnd({ oldIndex, newIndex }) {
    setToDos(toDos, oldIndex, newIndex)
  }

  function onLabelSelect(event) {
    setAnchorEl(event.currentTarget)
    setLabelMenuState(!labelMenuState)
  }

  function onOptionMenuSelect(event) {
    setAnchorEl(event.currentTarget)
    setOptionMenuState(!optionMenuState)
  }

  function onOptionMenuItemSelect(e) {
    switch (e.key) {
    case 'All':
      handleRequestClose()
      getAllTodo()
      break
    case 'None':
      handleRequestClose()
      getUnselectedAllTodo()
      break
    case 'Starred':
      handleRequestClose()
      getStarredToDo()
      break
    case 'Unstarred':
      handleRequestClose()
      getUnStarredTodo()
      break
    case 'Important':
      handleRequestClose()
      getImportantToDo()
      break
    case 'Unimportant':
      handleRequestClose()
      getUnimportantToDo()
      break
    default:
      return ''
    }
  }

  function onLabelMenuItemSelect(e) {
    const label = +e.key
    handleRequestClose()
    const toDos = allToDos.map(todo => {
      if (todo.selected) {
        if (todo.labels.includes(label.id)) {
          return { ...todo, labels: removeLabel(todo, label.id) }
        } else {
          return { ...todo, labels: addLabel(todo, label.id) }
        }
      } else {
        return todo
      }
    })

    setAlertMessage('Label Updated Successfully')
    setShowMessage(true)
    setAllToDos(toDos)
    setToDos(toDos)
  }

  function onLabelUpdate(data, label) {
    if (data.labels.includes(label.id)) {
      data.labels = removeLabel(data, label.id)
    } else {
      data.labels = addLabel(data, label.id)
    }

    handleRequestClose()

    const toDos = allToDos.map(todo => {
      if (todo.id === data.id) {
        return data
      } else {
        return todo
      }
    })

    setAlertMessage('Label Updated Successfully')
    setShowMessage(true)
    setCurrentTodo(data)
    setAllToDos(toDos)
    setToDos(toDos)
  }

  function onMarkAsStart(data) {
    const toDos = allToDos.map(todo => {
      if (todo.id === data.id) {
        return data
      } else {
        return todo
      }
    })

    setAlertMessage('Label Updated Successfully')
    setShowMessage(true)
    setAllToDos(toDos)
    setToDos(toDos)
  }

  function onToDoUpdate(data) {
    handleRequestClose()
    const toDos = allToDos.map(todo => {
      if (todo.id === data.id) {
        return data
      } else {
        return todo
      }
    })

    setAlertMessage('Label Updated Successfully')
    setShowMessage(true)
    setCurrentTodo(data)
    setAllToDos(toDos)
    setToDos(toDos)
  }


  function onDeleteToDo(data) {
    let selectedToDos = 0
    const toDos = allToDos.map(todo => {
      if (todo.selected) {
        selectedToDos++
      }
      if (data.id === todo.id) {
        if (todo.selected) {
          selectedToDos--
        }
        return { ...todo, deleted: true }
      } else {
        return todo
      }
    })

    setAlertMessage('Label Deleted Successfully')
    setShowMessage(true)
    setAllToDos(toDos)
    selectedToDos(selectedToDos)
    setCurrentTodo(null)
    setToDos(toDos.filter((todo) => !todo.deleted))
  }

  function onTodoChecked(data) {
    data.selected = !data.selected
    let selectedToDos = 0
    let todox
    if(toDos.length > 0) {
      todox = toDos.map(todo => {
        if (todo.selected) {
          selectedToDos++
        }
        if (todo.id === data.id) {
          if (todo.selected) {
            selectedToDos++
          }
          return data
        } else {
          return todo
        }
      })
    }

    setSelectedToDos(selectedToDos)
    setToDos(todox)
  }

  function onAllTodoSelect() {
    const selectAll = selectedToDos < toDos.length
    if (selectAll) {
      getAllTodo()
    } else {
      getUnselectedAllTodo()
    }
  }

  function onTodoAdd(data) {
    setToDos(allToDos.concat(data))
    setAllToDos(allToDos.concat(data))
  }

  function onTodoSelect(todo) {
    let conversationList = getToDoConversation(todo.id)
    if (conversationList) {
      conversationList = conversationList.conversationData
    } else {
      conversationList = []
    }

    setCurrentTodo(todo)
    setLoader(true)
    setConversation(conversationList)

    setTimeout(() => {
      setLoader(false)
    }, 1500)
  }

  function onToggleDrawer() {
    setDrawerState(!drawerState)
  }

  function handleRequestClose() {
    setShowMessage(false)
    setAddTodo(false)
    setLabelMenuState(false)
    setOptionMenuState(false)
  }

  function getAllTodo() {
    let toDos = allToDos.map((todo) => todo ? {
      ...todo,
      selected: true
    } : todo)

    setSelectedToDos(toDos.length)
    setAllToDos(toDos)
    setToDos(toDos)
    setOptionName('All')
  }

  function getUnselectedAllTodo() {
    let toDos = allToDos.map((todo) => todo ? {
      ...todo,
      selected: false
    } : todo)

    setSelectedToDos(0)
    setAllToDos(toDos)
    setToDos(toDos)
    setOptionName('None')
  }

  function getStarredToDo() {
    let selectedToDos = 0
    let toDos = allToDos.map((todo) => {
      if (todo.starred) {
        selectedToDos++
        return { ...todo, selected: true }
      }
      return { ...todo, selected: false }
    })

    setSelectedToDos(selectedToDos)
    setAllToDos(toDos)
    setToDos(toDos.filter(todo => !todo.deleted))

    return toDos
  }

  function getUnStarredTodo() {
    let selectedToDos = 0
    let toDos = allToDos.map((todo) => {
      if (!todo.starred) {
        selectedToDos++
        return { ...todo, selected: true }
      }
      return { ...todo, selected: false }
    })

    setSelectedToDos(selectedToDos)
    setAllToDos(toDos)
    setToDos(toDos.filter(todo => !todo.deleted))
    setOptionName('Unstarred')

    return toDos
  }

  function getImportantToDo() {
    let selectedToDos = 0
    let toDos = allToDos.map((todo) => {
      if (todo.important) {
        selectedToDos++
        return { ...todo, selected: true }
      }
      return { ...todo, selected: false }
    })

    setSelectedToDos(selectedToDos)
    setAllToDos(toDos)
    setToDos(toDos.filter(todo => !todo.deleted))
    setOptionName('Important')

    return toDos
  }

  function getUnimportantToDo() {
    let selectedToDos = 0
    let toDos = allToDos.map((todo) => {
      if (!todo.important) {
        selectedToDos++
        return { ...todo, selected: true }
      }
      return { ...todo, selected: false }
    })

    setSelectedToDos(selectedToDos)
    setAllToDos(toDos)
    setToDos(toDos.filter(todo => !todo.deleted))
    setOptionName('Unimportant')

    return toDos
  }

  function getNavFilters() {
    return filters.map((filter, index) =>
      <li key={index} onClick={() => {
        const filterMails = allToDos.filter(todo => {
          if (filter.id === 0 && todo.starred) {
            return todo
          } else if (filter.id === 1 && todo.important) {
            return todo
          } else if (filter.id === 2 && todo.important) {
            return todo
          } else if (filter.id === 3 && todo.important) {
            return todo
          } else if (filter.id === 4 && todo.completed) {
            return todo
          } else if (filter.id === 5 && todo.deleted) {
            return todo
          } else
            return todo
        })

        setLoader(true)
        setCurrentTodo(null)
        setFilter(filter.id)
        setToDos(filterMails)

        setTimeout(() => {
          setLoader(false)
        }, 1500)
      }}>

        <span className={filter.id === selectedSectionId ? 'gx-link active' : 'gx-link'}>
          <i className={`icon icon-${filter.icon}`}/>
          <span>{filter.title}</span>
        </span>
      </li>
    )
  }

  function getNavLabels() {
    return labels.map((label, index) =>
      <li key={index} onClick={() => {
        const filterMails = allToDos.filter(todo => todo.labels.includes(label.id))

        setLoader(true)
        setCurrentTodo(null)
        setToDos(filterMails)

        setTimeout(() => {
          setLoader(false)
        }, 1500)
      }}>
        <span className='gx-link'>
          <i className={`icon icon-circle gx-text-${label.color}`}/>
          <span>{label.title}</span>
        </span>
      </li>
    )
  }

  function ToDoSideBar() {
    return <div className='gx-module-side'>
      <div className='gx-module-side-header'>
        <div className='gx-module-logo'>
          <i className='icon icon-wysiwyg gx-mr-3'/>
          <span>CONTRACTS</span>
        </div>

      </div>
      <div className='gx-module-side-content'>
        <CustomScrollbars className='gx-module-side-scroll'>
          <div className='gx-module-add-task'>
            {/*<Button variant='raised' type='primary' className='gx-btn-block'*/}
            {/*  onClick={() => {*/}
            {/*    setAddTodo(true)*/}
            {/*  }}>*/}
            {/*  <span>ADD CONTRACT</span>*/}
            {/*</Button>*/}
            <CreateContract/>
          </div>
          <ul className='gx-module-nav'>

            <li onClick={() => {
              setCurrentTodo(null)
              setToDos(allToDos)
            }}>
              <span className='gx-link active'>
                <i className='icon icon-all-contacts gx-pt-1'/>
                <span><IntlMessages id='todo.all'/></span>
              </span>
            </li>

            <li className='gx-module-nav-label'>
              <span>Room</span>
            </li>

            {getNavFilters()}

            <li className='gx-module-nav-label'>
              <span>Tags</span>
            </li>
            {getNavLabels()}
          </ul>
        </CustomScrollbars>
      </div>
    </div>
  }

  function funcSearchTodo(searchText) {
    if (searchText === '') {
      setToDos(allToDos.filter((todo) => !todo.deleted))
    } else {
      const searchToDos = allToDos.filter((todo) =>
        !todo.deleted && todo.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
      setToDos(searchToDos)
    }
  }

  function showToDos({ currentTodo, toDos, conversation, user }) {
    return currentTodo === null
      && <TodoItem toDos={toDos}
        onSortEnd={onSortEnd}
        onMarkAsStart={onMarkAsStart.bind(this)}
        onTodoSelect={onTodoSelect.bind(this)}
        onTodoChecked={onTodoChecked.bind(this)}
        useDragHandle={true}/>
  }

  function optionMenu() {
    return (
      <Menu id='option-menu'
        onClick={onOptionMenuItemSelect.bind(this)}
        onClose={handleRequestClose}
        style={{ maxHeight: ITEM_HEIGHT * 5.5 }}>
        {
          options.map(option =>
            <Menu.Item key={option.title}>
              {option.title}
            </Menu.Item>,
          )
        }
      </Menu>)
  }

  function labelMenu() {
    return (
      <Menu id='label-menu'
        onClick={onLabelMenuItemSelect.bind(this)}
        onClose={handleRequestClose}
        style={{ maxHeight: ITEM_HEIGHT * 4.5 }}>
        {
          labels.map(label =>
            <Menu.Item key={label}>
              {label.title}
            </Menu.Item>,
          )
        }
      </Menu>)
  }

  function getToDoConversation(id) {
    return todoConversation.find((conversation) => conversation.id === id)
  }

  function removeLabel(todo, label) {
    todo.labels.splice(todo.labels.indexOf(label), 1)
    return todo.labels
  }

  function addLabel(todo, label) {
    todo.labels = todo.labels.concat(label)
    return todo.labels
  }

  function updateSearch(evt) {
    setSearchTodo(evt.target.value)
    funcSearchTodo(evt.target.value)
  }

  return(
    <div className='gx-main-content'>
      <div className='gx-app-module'>
        <div className='gx-d-block gx-d-lg-none'>
          <Drawer
            placement='left'
            closable={false}
            visible={drawerState}
            onClose={onToggleDrawer.bind(this)}>
            {ToDoSideBar()}
          </Drawer>
        </div>
        <div className='gx-module-sidenav gx-d-none gx-d-lg-flex'>
          {ToDoSideBar()}
        </div>

        <div className='gx-module-box'>
          <div className='gx-module-box-header'>

            <span className='gx-drawer-btn gx-d-flex gx-d-lg-none'>
              <i className='icon icon-menu gx-icon-btn' aria-label='Menu'
                onClick={onToggleDrawer.bind(this)}
              />
            </span>
            <AppModuleHeader
              placeholder='Search To Do'
              user={user}
              onChange={updateSearch.bind(this)}
              value={searchTodo}
            />
          </div>
          <div className='gx-module-box-content'>
            {currentTodo === null ?
              <div className='gx-module-box-topbar gx-module-box-topbar-todo'>
                {toDos.length > 0 ?
                  <Auxiliary>
                    <Checkbox className='gx-icon-btn' color='primary'
                      indeterminate={selectedToDos > 0 && selectedToDos < toDos.length}
                      checked={selectedToDos > 0}
                      onChange={onAllTodoSelect.bind(this)}
                      value='SelectMail'/>
                    <Dropdown overlay={optionMenu()} placement='bottomRight' trigger={['click']}>
                      <div>
                        <span className='gx-px-2'> {optionName}</span>
                        <i className='icon icon-charvlet-down'/>
                      </div>
                    </Dropdown>
                  </Auxiliary> : null}

                {( selectedToDos > 0) &&

                    <Dropdown overlay={labelMenu()} placement='bottomRight' trigger={['click']}>
                      <i className='gx-icon-btn icon icon-tag'/>
                    </Dropdown>
                }
              </div>
              :
              <div className='gx-module-box-topbar'>
                <i className='icon icon-arrow-left gx-icon-btn' onClick={() => {
                  setCurrentTodo(null)
                }}/>
              </div>
            }

            {
              loader
                ? <div className='gx-loader-view'>
                  <CircularProgress/>
                </div>
                : showToDos({ currentTodo, toDos, conversation, user })
            }
          </div>
        </div>
      </div>
      {showMessage && message.info(<span id='message-id'>{alertMessage}</span>, 3, handleRequestClose)}
    </div>
  )
}
