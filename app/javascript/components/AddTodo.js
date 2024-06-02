import React, { useState } from 'react'
import axios from "axios"
import styled from "styled-components"
// フラッシュメッセージ
// import { toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import { FiSend } from 'react-icons/fi'
// React Router v6では、withRouterではなくuseNavigateをimport
import { useNavigate } from 'react-router-dom';

const InputAndButton = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`

const InputName = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  padding: 2px 7px;
`

const Button = styled.button`
  font-size: 20px;
  border: none;
  border-radius: 3px;
  margin-left: 10px;
  padding: 2px 10px;
  background: #1E90FF;
  color: #fff;
  text-align: center;
  cursor: pointer;
  ${({ disabled }) => disabled && `
    opacity: 0.5;
    cursor: default;
  `}
`

const Icon = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`

// フラッシュメッセージを表示
// TODO ToastContainerに移行
// toast.configure();

const AddTodo = () => {
  const [todo, setTodo] = useState({id: null, name: "", is_completed: false})
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    // const { name, value } = e.target;
    // // [name]は、todoオブジェクトのnameカラム
    // setTodo({...todo, [name]: value})

    setTodo({...todo, name: e.target.value})
  }

  const saveTodo = () =>{
    let data = {
      name: todo.name
    }
    
    // todos#createにアクセス
    axios.post('/api/v1/todos', data)
    .then(resp => {
      setTodo({
        id: resp.data.id,
        name: resp.data.name,
        is_completed: resp.data.is_completed
      })
      // TODO フラッシュメッセージを表示
      // toast.success('Todo successfully created!');

      // リダイレクト処理
      // props.history.push('/todos');
      // React Router v6では以下
      navigate('/todos');
    })
    .catch(e => {
      console.log(e)
    })
  }

  return (
    <>
      <h1>New Todo</h1>
      <InputAndButton>
        <InputName 
          type="text"
          required
          value={todo.name}
          name="name"
          onChange={handleInputChange}
        />
        <Button
          onClick={saveTodo}
          // || 以降について 行頭から行末までの間の空白のみの入力を許可しない
          disabled={(!todo.name || /^\s*$/.test(todo.name))}
        >
          <Icon>
            <FiSend />
          </Icon>
        </Button>
      </InputAndButton>
    </>
  )
}

export default AddTodo;
