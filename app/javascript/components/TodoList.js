import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios';
import styled from "styled-components"
// cf https://react-icons.github.io/react-icons/icons/im/
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im"
// cf https://react-icons.github.io/react-icons/icons/ai/
import { AiFillEdit } from "react-icons/ai"

const SearchAndButtton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SearchForm = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  margin: 10px 0;
  padding: 10px;
`

const RemoveAllButton = styled.button`
  width: 16%;
  height: 40px;
  background: #f54242;
  border: none;
  font-weight: 500;
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
`

// is_completedがtrueなら、opacity: 0.4;に
const TodoName = styled.span`
  font-size: 27px;
  ${({ is_completed }) => is_completed && `
    opacity: 0.4;
  `}
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 7px auto;
  padding: 10px;
  font-size: 25px;
`

const CheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  color: green;
  cursor: pointer;
`

const UncheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  cursor: pointer;
`

const EditButton = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`

const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [searchName, setSearchName] = useState("")

  // '/todos'(TodoListコンポーネント)が表示されると同時に以下が実行される
  useEffect(() => {
    // todos#indexにアクセスし、データを取得
    axios.get('/api/v1/todos')
    .then(resp => {
      console.log(resp.data)
      setTodos(resp.data);
    })
    .catch(e => {
      console.log(e);
    })
  }, [])

  const removeAllTodos = () => {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      // todos#destroy_allにアクセスし、データを一括削除
      axios.delete('/api/v1/todos/destroy_all')
      .then(resp => {
        setTodos([]);
      })
      .catch(e => {
        console.log(e);
      })
    }
  }
  
  // 動画ではtodoとindexを引数としていたが、今回はtodoのみで対応
  const updateIsCompleted = (todo) => {
    let data = {
      id: todo.id,
      name: todo.name,
      is_completed: !todo.is_completed
    }
    // todos#updateにアクセスし、レコードの更新
    axios.patch(`/api/v1/todos/${todo.id}`, data)
    .then(resp => {
      // 表示の更新(再レンダリング)
      const newTodos =todos.map((_todo) => {
        const updatedNewTodo = {...todo, is_completed: resp.data.is_completed}
        const newTodo = {..._todo}
        return _todo.id === todo.id ? updatedNewTodo : newTodo;
      })
      setTodos(newTodos)
    })
  }

  return (
    <>
      <h1>TodoList</h1>
      <SearchAndButtton>
        <SearchForm 
          type="text"
          placeholder="Search todo ..."
          onChange={(e) => setSearchName(e.target.value)}
        />
        <RemoveAllButton onClick={removeAllTodos}>
          Remove All
        </RemoveAllButton>
      </SearchAndButtton>

      <div>
        {todos.filter((todo) => {
          if(searchName === "") {
            return todo
          } else if (todo.name.toLowerCase().includes(searchName.toLocaleLowerCase())) {
            return todo
          }
        }).map((todo) => {
          return (
            <Row key={todo.id}>
              {todo.is_completed ? (
                <CheckedBox>
                  <ImCheckboxChecked onClick={() => updateIsCompleted(todo)} />
                </CheckedBox>
                ) : (
                  <UncheckedBox>
                  <ImCheckboxUnchecked onClick={() => updateIsCompleted(todo)} />
                </UncheckedBox>
              )}
              <TodoName is_completed={todo.is_completed}>
                {todo.name}
              </TodoName>
              <Link to={"/todos/" + todo.id + "/edit"} >
                <EditButton>
                  <AiFillEdit />
                </EditButton>
              </Link>
            </Row>
          )
        })
        }
      </div>
    </>
  )
}

export default TodoList
