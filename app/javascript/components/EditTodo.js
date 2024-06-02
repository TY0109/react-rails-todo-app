import React, { useState, useEffect } from 'react'
import axios from "axios"
import styled from 'styled-components'
// import { toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// React Router v6では、paramsの取得にuseParamsを使用
import { useParams, useNavigate  } from 'react-router-dom';

const InputName = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  padding: 2px 7px;
  margin: 12px 0;
`

const CurrentStatus = styled.div`
  font-size: 19px;
  margin: 8px 0 12px 0;
  font-weight: bold;
`

const IsCompletedButton = styled.button`
  color: #fff;
  font-weight: 500;
  font-size: 17px;
  padding: 5px 10px;
  background: #f2a115;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`

const UpdateButton = styled.button`
  color: #fff;
  font-weight: 500;
  font-size: 17px;
  padding: 5px 10px;
  margin: 0 10px;
  background: #0ac620;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`

const DeleteButton = styled.button`
  color: #fff;
  font-weight: 500;
  font-size: 17px;
  padding: 5px 10px;
  background: #f54242;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`

// toast.configure()

function EditTodo() {
  const [currentTodo, setCurrentTodo] = useState({id: null, name: "", is_completed: false})
  const navigate = useNavigate();

  // useEffect(() => {
  //   getTodo(props.match.params.id)
  // }, [props.match.params.id])
  
  // React Router v6では、以下で対応
  ////////////////////////////////////////////////////
  const { id } = useParams();
  
  // '/todos/:id/edit'(EditTodoコンポーネント)が表示されると同時に以下が実行される
  useEffect(() => {
    // todos#showにアクセスし、データを取得
    axios.get(`/api/v1/todos/${id}`)
    .then(resp => {
      setCurrentTodo(resp.data)
    })
    .catch(e => {
      console.log(e)
    })
  }, [id]);
  
  ////////////////////////////////////////////////////

  const handleInputChange = (e) => {
    // const { name, value } = e.target;
    // [name]は、currentTodoオブジェクトのnameカラム
    // setCurrentTodo({ ...currentTodo, [name]: value })

    setCurrentTodo({...currentTodo, name: e.target.value})
  }

  const updateIsCompleted = todo => {
    var data = {
      id: todo.id,
      name : todo.name,
      is_completed: !todo.is_completed
    }
    axios.patch(`/api/v1/todos/${todo.id}`, data)
    .then(resp => {
      setCurrentTodo(resp.data)
    })
  }

  const updateTodo = () => {
    // todos#updateにアクセスし、データを更新
    axios.patch(`/api/v1/todos/${currentTodo.id}`, currentTodo)
    .then(resp => {
      // toast.success('Todo successfully updated!');

      // props.history.push('/todos')
      navigate('/todos');
    })
    .catch(e => {
      console.log(e)
    })
  }

  const deleteTodo = () => {
    const sure = window.confirm('Are you sure?')
    if (sure) {
      // todos#deleteにアクセスし、データを削除
      axios.delete(`/api/v1/todos/${currentTodo.id}`)
      .then(resp => {
        navigate('/todos');
      })
      .catch(e => {
        console.log(e)
      })
    }
  }
  return (
    <>
      <h1>Editing Todo</h1>
      <div>
        <div>
          <label htmlFor="name">Current Name</label>
          <InputName
            type="text"
            name="name"
            value={currentTodo.name}
            onChange={handleInputChange}
          />
          <div>
            <span>Current Status</span><br/>
            <CurrentStatus>
              {currentTodo.is_completed ? "Completed" : "Uncompleted" }
            </CurrentStatus>
          </div>
        </div>
        {currentTodo.is_completed ? (
          <IsCompletedButton onClick={() => updateIsCompleted(currentTodo)}>
            Uncompleted
          </IsCompletedButton>
        ) : (
          <IsCompletedButton onClick={() => updateIsCompleted(currentTodo)}>
            Completed
          </IsCompletedButton>
        )}
        <UpdateButton onClick={updateTodo}>
          Update
        </UpdateButton>
        <DeleteButton onClick={deleteTodo}>
          Delete
        </DeleteButton>
      </div>
    </>
  )
}

export default EditTodo
