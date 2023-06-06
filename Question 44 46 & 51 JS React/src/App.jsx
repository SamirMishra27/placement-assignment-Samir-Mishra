/* cSpell:ignore todo, todos */
import { useReducer, useRef, useState } from 'react'
import './index.css'
import { defaultTodos } from './defaultTodos'
import TodoComponent from './Todo'
import todoReducer from './todoReducer'
import { UiThemeContext } from './themeContext'

export default function App() {
    const [todos, dispatch] = useReducer(todoReducer, defaultTodos)
    const inputBoxRef = useRef('')
    const [theme, setTheme] = useState('LIGHT') //'DARK'

    function saveNewTodo() {
        if (!inputBoxRef.current.value) return

        dispatch({
            type: 'CREATE',
            content: inputBoxRef.current.value,
        })
        inputBoxRef.current.value = ''
    }

    function editThisTodo(event) {
        event.preventDefault()

        const todoId = Number(event.target.parentNode.parentNode.dataset.id)
        const todoContent = todos.filter((todo) => todo.id == todoId)[0].content

        if (!todoContent) return

        inputBoxRef.current.value = todoContent
        dispatch({
            type: 'DELETE',
            id: todoId,
        })
    }

    return (
        <UiThemeContext.Provider value={theme}>
            <main
                className={
                    ' w-full h-[100vh] flex flex-col items-center justify-start pt-4 pb-4 space-y-4 overflow-hidden' +
                    (theme === 'DARK'
                        ? ' bg-theme-dark text-slate-50'
                        : ' bg-theme-bright text-slate-950')
                }>
                <button
                    className={
                        ' absolute right-4 top-4 w-24 h-8 rounded-xl text-lg text-center font-medium' +
                        (theme === 'DARK'
                            ? ' bg-theme-semi-bright text-slate-950'
                            : ' bg-theme-semi-dark text-slate-50')
                    }
                    onClick={() => setTheme(theme === 'DARK' ? 'LIGHT' : 'DARK')}>
                    {theme}
                </button>
                <h1 className=" text-4xl text-center font-semibold">Manage Your Todos</h1>
                <section className=" flex items-center justify-evenly p-2 space-x-4">
                    <form
                        className=" flex flex-col items-start justify-evenly"
                        onSubmit={(e) => {
                            e.preventDefault()
                            saveNewTodo()
                        }}>
                        <label htmlFor="text" className=" text-lg">
                            Enter your todo
                        </label>
                        <input
                            type="text"
                            className=" w-[32rem] h-8 rounded-md text-black px-1 outline-none"
                            ref={inputBoxRef}
                        />
                    </form>
                    <button
                        className={
                            ' w-24 h-8 rounded-xl text-xl text-center font-medium' +
                            (theme === 'DARK'
                                ? ' bg-theme-semi-bright text-slate-950'
                                : ' bg-theme-semi-dark text-slate-50')
                        }
                        onClick={saveNewTodo}>
                        SAVE
                    </button>
                </section>
                <section className=" flex flex-col items-center justify-evenly space-y-4 px-2 py-4 overflow-y-auto">
                    {todos.map((todo) => (
                        <TodoComponent
                            key={todo.id}
                            todo={todo}
                            editThisTodo={editThisTodo}
                            dispatch={dispatch}
                        />
                    ))}
                </section>
            </main>
        </UiThemeContext.Provider>
    )
}
