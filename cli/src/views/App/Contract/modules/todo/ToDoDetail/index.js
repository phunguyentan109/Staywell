import React, { useState, useEffect, useCallback } from 'react'
import { Avatar, Badge, Col, DatePicker, Input, Menu, Row } from 'antd'
import Moment from 'moment'
import CustomScrollbars from 'util/CustomScrollbars'

import labels from '../../../components/Todo/data/labels'
import users from '../../../components/Todo/data/users'
import ConversationCell from './ConversationCell'

const { TextArea } = Input

// export default function ToDoDetail({ onToDoUpdate, onDeleteToDo, ...props }) {
//   const [todo, setTodo] = useState({})
//   const [title, setTitle] = useState('')
//   const [notes, setNotes] = useState('')
//   const [anchorEl, setAnchorEl] = useState(null)
//   const [userMenu, setUserMenu] = useState(false)
//   const [labelMenu, setLabelMenu] = useState(false)
//   const [editTitle, setEditTitle] = useState(false)
//   const [editNote, setEditNote] = useState(false)
//   const [message, setMessage] = useState('')
//   const [conversation, setConversation] = useState('')
//   const [user, setUser] = useState([])
//
//   const load = useCallback(async() => {
//     setTodo(props.todo)
//     setTitle(props.todo.title)
//     setNotes(props.todo.notes)
//     setConversation(props.conversation)
//
//     handleRequestClose()
//
//     if (todo.user > 0) {
//       let user = users.find((user) => user.id === todo.user)
//       setUser(user)
//     }
//   }, [handleRequestClose])
//
//   useEffect(() => {
//     load()
//   }, [load])
//
//   function handleRequestClose() {
//     setUserMenu(false)
//     setLabelMenu(false)
//   }
//
//   function handleLabelClick(event) {
//     setLabelMenu(true)
//     setAnchorEl(event.currentTarget)
//   }
//
//   function handleUserClick(event) {
//     setUserMenu(true)
//     setAnchorEl(event.currentTarget)
//   }
//
//   function _handleKeyPress(e) {
//     if (e.key === 'Enter') {
//       submitComment()
//     }
//   }
//
//   function handleEditTitle() {
//     if (editTitle) {
//       const todo = todo
//       todo.title = title
//
//       onToDoUpdate(todo)
//     }
//     setEditTitle(!editTitle)
//   }
//
//   function handleEditNote() {
//     if (notes) {
//       const todo = todo
//       todo.note = notes
//
//       onToDoUpdate(todo)
//     }
//     setEditNote(!editNote)
//   }
//
//   function handleDueDateChange(date) {
//     setTodo({ ...todo, dueDate: date })
//   }
//
//   // function handleChange(event) {
//   //   const [name, value] = event.target
//   //
//   //   setState({ [name]: value })
//   // };
//
//   function optionMenu() {
//     return (
//       <Menu
//         id='label-menu' onClick={this.handleRequestClose}
//         onClose={this.handleRequestClose}>
//         {users.map((user, index) =>
//           <Menu.Item key={index} value={user.id}>
//             <div className='gx-d-flex gx-user-name gx-align-items-center'>
//               <Avatar src={user.thumb} alt={user.name}/><h4>{user.name}</h4>
//             </div>
//           </Menu.Item>
//         )}
//       </Menu>
//     )
//   }
//
//   // function labelMenu() {
//   //   return (
//   //     <Menu id='label-menu' onClick={handleRequestClose()}>
//   //       {labels.map(label =>
//   //         <Menu.Item key={label.id}>
//   //           {label.title}
//   //         </Menu.Item>,
//   //       )}
//   //     </Menu>
//   //   )
//   // }
//
//   function submitComment() {
//     if (message !== '') {
//       const updatedConversation = conversation.concat({
//         'name': user.name,
//         'thumb': user.avatar,
//         'message': message,
//         'sentAt': Moment().format('ddd DD, YYYY, hh:mm:ss A'),
//       })
//       setConversation(updatedConversation)
//       setMessage('')
//     }
//   }
//
//   function updateMessageValue(evt) {
//     setMessage(evt.target.value)
//   }
//
//   return (
//     <div className='gx-module-detail gx-module-list'>
//       <CustomScrollbars className='gx-todo-detail-content-scroll'>
//         <div className='gx-module-detail-item gx-module-detail-header'>
//           <Row>
//             <Col xs={24} sm={12} md={17} lg={12} xl={17}>
//               <div className='gx-flex-row'>
//                 <div className='gx-user-name gx-mr-md-4 gx-mr-2 gx-my-1'
//                   onClick={handleUserClick}>
//
//                   {user === null ? <h4 className='gx-mb-0 gx-pointer'>Assign User </h4> :
//                     <div className='gx-flex-row gx-align-items-center gx-pointer'>
//                       <Avatar className='gx-mr-2' src={user.thumb} alt={user.name}/>
//                       <h4 className='gx-mb-0'>{user.name}</h4>
//                     </div>}
//                 </div>
//                 <DatePicker className='gx-module-date gx-my-1'
//                   defaultValue={
//                     todo.dueDate !== null
//                       ? Moment(todo.dueDate, 'dddd, MMMM DD, YYYY h:mm a')
//                       : undefined
//                   }
//                   invalidLabel='Due Date'
//                   format='MMMM DD, YYYY'
//                   onChange={handleDueDateChange.bind(this)}
//                   animateYearScrolling={false}/>
//               </div>
//             </Col>
//
//             <Col xs={24} sm={12} md={7} lg={12} xl={7}>
//               <div className='gx-flex-row gx-justify-content-between'>
//                 <i className='gx-icon-btn icon icon-trash' onClick={() => {
//                   onDeleteToDo(todo)
//                 }}/>
//
//                 <span className='gx-d-block' onClick={() => {
//                   todo.starred = !todo.starred
//                   onToDoUpdate(todo)
//                 }}>
//                   {todo.starred ?
//                     <i className='gx-icon-btn icon icon-star'/> :
//                     <i className='gx-icon-btn icon icon-star-o'/>
//                   }
//
//                 </span>
//
//                 <span className='gx-d-block' onClick={() => {
//                   todo.important = !todo.important
//                   onToDoUpdate(todo)
//                 }}>
//                   {todo.important ?
//                     <i className='gx-icon-btn icon icon-important'/> :
//                     <i className='gx-icon-btn icon icon-important-o'/>
//                   }
//                 </span>
//                 <span className='gx-d-block' onClick={handleLabelClick}>
//                   <i className='gx-icon-btn icon icon-tag'/>
//                 </span>
//               </div>
//             </Col>
//           </Row>
//         </div>
//
//         <div className='gx-module-detail-item'>
//
//           <div className='gx-mb-md-4 gx-mb-2'>
//             {
//               labels.map((label, index) => {
//                 return (todo.labels).includes(label.id) &&
//                   <Badge key={index} count={label.title} style={{ backgroundColor: label.color }}/>
//               })
//             }
//           </div>
//
//           <div className='gx-form-group gx-flex-row gx-align-items-center gx-mb-0 gx-flex-nowrap'>
//             <div onClick={(event) => {
//               todo.completed = !todo.completed
//               onToDoUpdate(todo)
//             }}>
//               {
//                 todo.completed
//                   ? <span className='
//                       gx-border-2
//                       gx-size-30
//                       gx-rounded-circle
//                       gx-text-green
//                       gx-border-green
//                       gx-d-block
//                       gx-text-center
//                       gx-pointer'
//                   >
//                     <i className='icon icon-check'/>
//                   </span>
//                   : <span className='
//                      gx-border-2
//                      gx-size-30
//                      gx-rounded-circle
//                      gx-text-muted
//                      gx-border-grey
//                      gx-d-block
//                      gx-text-center
//                      gx-pointer'
//                   >
//                     <i className='icon icon-check'/>
//                   </span>
//               }
//             </div>
//             {
//               editTitle
//                 ? <div className='
//                   gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap'
//                 >
//                   <div className='gx-col'>
//                     <Input
//                       fullWidth
//                       className='gx-task-title'
//                       id='required'
//                       placeholder='Title'
//                       onChange={(event) => setTitle(event.target.value)}
//                       defaultValue={title}
//                     />
//                   </div>
//                   <span className='gx-d-block gx-size-40 gx-text-center gx-pointer'
//                     onClick={handleEditTitle}
//                   >
//                     <i className='gx-icon-btn icon icon-edit'/>
//                   </span>
//                 </div>
//
//                 :<div className='gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap'>
//                   <div className='gx-task-title gx-col'>
//                     {title}
//                   </div>
//                   <span className='gx-d-block gx-size-40 gx-text-center gx-pointer'
//                     onClick={handleEditTitle}
//                   >
//                     <i className='gx-icon-btn icon icon-edit'/>
//                   </span>
//                 </div>
//             }
//           </div>
//         </div>
//
//         <div className='gx-module-detail-item gx-mb-md-4 gx-mb-2'>
//           {
//             editNote
//               ? <div className='gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap'>
//                 <div className='gx-task-input gx-col'>
//                   <Input
//                     fullWidth
//                     id='required'
//                     placeholder='Note'
//                     onChange={(event) => setNotes(event.target.value)}
//                     defaultValue={notes}/>
//                 </div>
//
//                 <span className='gx-d-block gx-size-40 gx-text-center gx-pointer' onClick={handleEditNote}>
//                   <i className='gx-icon-btn icon icon-edit'/>
//                 </span>
//               </div>
//               :<div className='gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap'>
//                 <div className='gx-task-des gx-col'>
//                   {notes === '' ? 'Add note here' : notes}
//                 </div>
//                 <span className='gx-d-block gx-size-40 gx-text-center gx-pointer'
//                   onClick={handleEditNote}
//                 >
//                   <i className='gx-icon-btn icon icon-edit'/>
//                 </span>
//               </div>
//           }
//         </div>
//         <div className='gx-module-detail-item'>
//           <h3 className='gx-mb-0 gx-mb-sm-1'>Comments</h3>
//         </div>
//         {
//           conversation.map((conversation, index) => <ConversationCell key={index} conversation={conversation}/>)
//         }
//       </CustomScrollbars>
//
//       <div className='gx-chat-main-footer gx-todo-main-footer'>
//         <div className='gx-flex-row gx-align-items-center'>
//           <div className='gx-col'>
//             <div className='gx-form-group'>
//               <TextArea className='gx-border-0 ant-input gx-chat-textarea'
//                 id='required'
//                 onKeyUp={_handleKeyPress.bind(this)}
//                 onChange={updateMessageValue.bind(this)}
//                 value={message}
//                 rows={2}
//                 placeholder='Type and hit enter to send message'
//               />
//             </div>
//           </div>
//
//           <div className='gx-chat-sent'
//             onClick={submitComment.bind(this)}
//             aria-label='Send message'
//           >
//             <i className='gx-icon-btn icon icon-sent'/>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

class ToDoDetail extends React.Component {
  constructor(props) {
    super(props)
    const { title, notes } = props.todo
    const { conversation } = props
    this.state = {
      todo: props.todo,
      title,
      notes,
      anchorEl: undefined,
      userMenu: false,
      labelMenu: false,
      editTitle: false,
      editNote: false,
      message: '',
      conversation
    }
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }

  handleRequestClose = () => {
    this.setState({ userMenu: false, labelMenu: false })
  };

  handleLabelClick = event => {
    this.setState({ labelMenu: true, anchorEl: event.currentTarget })
  };

  handleUserClick = event => {
    this.setState({ userMenu: true, anchorEl: event.currentTarget })
  };

  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.submitComment()
    }
  };

  handleEditTitle = () => {
    if (this.state.editTitle) {
      const todo = this.state.todo
      todo.title = this.state.title
      this.props.onToDoUpdate(todo)
    }
    this.setState({
      editTitle: !this.state.editTitle
    })
  };

  handleEditNote = () => {
    if (this.state.note) {
      const todo = this.state.todo
      todo.note = this.state.note
      this.props.onToDoUpdate(todo)
    }
    this.setState({
      editNote: !this.state.editNote
    })
  };

  handleDueDateChange = (date) => {
    this.setState({
      todo: { ...this.state.todo, dueDate: date }
    })
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  };

  optionMenu = () => {
    return (<Menu
      id='label-menu' onClick={this.handleRequestClose}
      onClose={this.handleRequestClose}>
      {users.map((user, index) =>
        <Menu.Item key={index} value={user.id}>
          <div className='gx-d-flex gx-user-name gx-align-items-center'>
            <Avatar src={user.thumb} alt={user.name}/><h4>{user.name}</h4>
          </div>
        </Menu.Item>
      )}

    </Menu>)
  };

  labelMenu = () => {
    return (<Menu id='label-menu' onClick={this.handleRequestClose()}>
      {labels.map(label =>
        <Menu.Item key={label.id}>
          {label.title}
        </Menu.Item>,
      )}
    </Menu>)
  };

  submitComment() {
    if (this.state.message !== '') {
      const updatedConversation = this.state.conversation.concat({
        'name': this.props.user.name,
        'thumb': this.props.user.avatar,
        'message': this.state.message,
        'sentAt': Moment().format('ddd DD, YYYY, hh:mm:ss A'),
      })
      this.setState({
        conversation: updatedConversation,
        message: '',
      })
    }
  }

  updateMessageValue(evt) {
    this.setState({
      message: evt.target.value
    })
  }

  render() {
    const { onToDoUpdate, onDeleteToDo } = this.props
    const { todo, editNote, editTitle, title, notes, message, conversation } = this.state
    let user = null
    if (todo.user > 0)
      user = users.find((user) => user.id === todo.user)

    return (
      <div className='gx-module-detail gx-module-list'>
        <CustomScrollbars className='gx-todo-detail-content-scroll'>
          <div className='gx-module-detail-item gx-module-detail-header'>
            <Row>
              <Col xs={24} sm={12} md={17} lg={12} xl={17}>
                <div className='gx-flex-row'>
                  <div className='gx-user-name gx-mr-md-4 gx-mr-2 gx-my-1'
                    onClick={this.handleUserClick}>

                    {user === null ? <h4 className='gx-mb-0 gx-pointer'>Assign User </h4> :
                      <div className='gx-flex-row gx-align-items-center gx-pointer'>
                        <Avatar className='gx-mr-2' src={user.thumb} alt={user.name}/>
                        <h4 className='gx-mb-0'>{user.name}</h4>
                      </div>}
                  </div>
                  <DatePicker className='gx-module-date gx-my-1'
                    defaultValue={
                      todo.dueDate !== null
                        ? Moment(todo.dueDate, 'dddd, MMMM DD, YYYY h:mm a')
                        : undefined
                    }
                    invalidLabel='Due Date'
                    format='MMMM DD, YYYY'
                    onChange={this.handleDueDateChange.bind(this)}
                    animateYearScrolling={false}/>
                </div>
              </Col>

              <Col xs={24} sm={12} md={7} lg={12} xl={7}>
                <div className='gx-flex-row gx-justify-content-between'>
                  <i className='gx-icon-btn icon icon-trash' onClick={() => {
                    onDeleteToDo(todo)
                  }}/>

                  <span className='gx-d-block' onClick={() => {
                    todo.starred = !todo.starred
                    onToDoUpdate(todo)
                  }}>
                    {todo.starred ?
                      <i className='gx-icon-btn icon icon-star'/> :
                      <i className='gx-icon-btn icon icon-star-o'/>
                    }

                  </span>

                  <span className='gx-d-block' onClick={() => {
                    todo.important = !todo.important
                    onToDoUpdate(todo)
                  }}>
                    {todo.important ?
                      <i className='gx-icon-btn icon icon-important'/> :
                      <i className='gx-icon-btn icon icon-important-o'/>
                    }

                  </span>
                  <span className='gx-d-block' onClick={this.handleLabelClick}>
                    <i className='gx-icon-btn icon icon-tag'/>
                  </span>


                </div>
              </Col>
            </Row>
          </div>

          <div className='gx-module-detail-item'>

            <div className='gx-mb-md-4 gx-mb-2'>
              {labels.map((label, index) => {
                return (todo.labels).includes(label.id) &&
                  <Badge key={index} count={label.title} style={{ backgroundColor: label.color }}/>
              })}
            </div>

            <div className='gx-form-group gx-flex-row gx-align-items-center gx-mb-0 gx-flex-nowrap'>
              <div onClick={(event) => {
                todo.completed = !todo.completed
                onToDoUpdate(todo)
              }}>
                {todo.completed ?
                  <span className='
                    gx-border-2
                    gx-size-30
                    gx-rounded-circle
                    gx-text-green
                    gx-border-green
                    gx-d-block
                    gx-text-center
                    gx-pointer'
                  >
                    <i className='icon icon-check'/>
                  </span>
                  : <span className='
                     gx-border-2
                     gx-size-30
                     gx-rounded-circle
                     gx-text-muted
                     gx-border-grey
                     gx-d-block
                     gx-text-center
                     gx-pointer'
                  >
                    <i className='icon icon-check'/>
                  </span>
                }
              </div>
              {editTitle ?
                <div className='gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap'>
                  <div className='gx-col'>
                    <Input
                      fullWidth
                      className='gx-task-title'
                      id='required'
                      placeholder='Title'
                      onChange={(event) => this.setState({ title: event.target.value })}
                      defaultValue={title}/>
                  </div>

                  <span className='gx-d-block gx-size-40 gx-text-center gx-pointer'
                    onClick={this.handleEditTitle}>
                    <i className='gx-icon-btn icon icon-edit'/>
                  </span>
                </div> :
                <div className='gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap'>
                  <div className='gx-task-title gx-col'>
                    {title}
                  </div>
                  <span className='gx-d-block gx-size-40 gx-text-center gx-pointer'
                    onClick={this.handleEditTitle}>
                    <i className='gx-icon-btn icon icon-edit'/>
                  </span>

                </div>}
            </div>

          </div>

          <div className='gx-module-detail-item gx-mb-md-4 gx-mb-2'>
            {editNote ?
              <div className='gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap'>
                <div className='gx-task-input gx-col'>
                  <Input
                    fullWidth
                    id='required'
                    placeholder='Note'
                    onChange={(event) => this.setState({ notes: event.target.value })}
                    defaultValue={notes}/>
                </div>

                <span className='gx-d-block gx-size-40 gx-text-center gx-pointer' onClick={this.handleEditNote}>
                  <i className='gx-icon-btn icon icon-edit'/>
                </span>
              </div> :
              <div className='gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap'>
                <div className='gx-task-des gx-col'>
                  {notes === '' ? 'Add note here' : notes}
                </div>
                <span className='gx-d-block gx-size-40 gx-text-center gx-pointer'
                  onClick={this.handleEditNote}>
                  <i className='gx-icon-btn icon icon-edit'/>
                </span>

              </div>}
          </div>
          <div className='gx-module-detail-item'>
            <h3 className='gx-mb-0 gx-mb-sm-1'>Comments</h3>
          </div>
          {conversation.map((conversation, index) =>
            <ConversationCell key={index} conversation={conversation}/>
          )}
        </CustomScrollbars>

        <div className='gx-chat-main-footer gx-todo-main-footer'>
          <div className='gx-flex-row gx-align-items-center'>
            <div className='gx-col'>
              <div className='gx-form-group'>
                <TextArea className='gx-border-0 ant-input gx-chat-textarea'
                  id='required'
                  onKeyUp={this._handleKeyPress.bind(this)}
                  onChange={this.updateMessageValue.bind(this)}
                  value={message}
                  rows={2}
                  placeholder='Type and hit enter to send message'/>
              </div>
            </div>

            <div className='gx-chat-sent'
              onClick={this.submitComment.bind(this)}
              aria-label='Send message'>
              <i className='gx-icon-btn icon icon-sent'/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ToDoDetail
