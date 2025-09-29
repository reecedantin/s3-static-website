import { useState } from 'react'
import { Authenticator } from '@aws-amplify/ui-react'
import { get, post, put, del } from 'aws-amplify/api'
import '@aws-amplify/ui-react/styles.css'
import './App.css'

interface Todo {
  todoId: string
  text: string
  completed: boolean
  createdAt: string
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await get({
        apiName: 'TodosAPI',
        path: '/todos'
      }).response
      const data = await response.body.json() as unknown as Todo[]
      setTodos(data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    } finally {
      setLoading(false)
    }
  }

  const createTodo = async () => {
    if (!newTodo.trim()) return
    
    try {
      const response = await post({
        apiName: 'TodosAPI',
        path: '/todos',
        options: {
          body: { text: newTodo }
        }
      }).response
      const todo = await response.body.json() as unknown as Todo
      setTodos([...todos, todo])
      setNewTodo('')
    } catch (error) {
      console.error('Error creating todo:', error)
    }
  }

  const updateTodo = async (todo: Todo) => {
    try {
      await put({
        apiName: 'TodosAPI',
        path: `/todos/${todo.todoId}`,
        options: {
          body: { ...todo, completed: !todo.completed }
        }
      }).response
      setTodos(todos.map(t => 
        t.todoId === todo.todoId ? { ...t, completed: !t.completed } : t
      ))
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const deleteTodo = async (todoId: string) => {
    try {
      await del({
        apiName: 'TodosAPI',
        path: `/todos/${todoId}`
      }).response
      setTodos(todos.filter(t => t.todoId !== todoId))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="app">
          <header>
            <h1>Todo App</h1>
            <div>
              <span>Welcome, {user?.signInDetails?.loginId}</span>
              <button onClick={signOut} style={{ marginLeft: '10px' }}>
                Sign Out
              </button>
            </div>
          </header>

          <main>
            <div className="todo-form">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo..."
                onKeyDown={(e) => e.key === 'Enter' && createTodo()}
              />
              <button onClick={createTodo}>Add Todo</button>
              <button onClick={fetchTodos} disabled={loading}>
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>

            <div className="todos">
              {todos.map((todo) => (
                <div key={todo.todoId} className={`todo ${todo.completed ? 'completed' : ''}`}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => updateTodo(todo)}
                  />
                  <span>{todo.text}</span>
                  <button onClick={() => deleteTodo(todo.todoId)}>Delete</button>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}
    </Authenticator>
  )
}

export default App
