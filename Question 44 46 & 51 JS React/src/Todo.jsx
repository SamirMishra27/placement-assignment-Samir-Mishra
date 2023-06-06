import { useContext } from 'react'
import { UiThemeContext } from './themeContext'

export default function TodoComponent({ todo, editThisTodo, dispatch }) {
    const theme = useContext(UiThemeContext)

    return (
        <article
            className={
                ' p-2 rounded-xl border-[1px] border-solid ' +
                'flex items-center justify-between space-x-2' +
                (theme === 'DARK'
                    ? ' bg-theme-semi-dark border-theme-bright'
                    : ' bg-theme-semi-bright border-theme-dark')
            }
            data-id={todo.id}>
            <p className=" w-[32rem] whitespace-nowrap xs:whitespace-normal overflow-x-hidden text-ellipsis">
                {todo.content}
            </p>
            <div className=" flex space-x-4">
                <button
                    className={
                        theme === 'DARK'
                            ? ' hover:text-slate-300 active:text-slate-100'
                            : 'hover:text-slate-600 active:text-slate-900'
                    }
                    onClick={editThisTodo}>
                    Edit
                </button>
                <button
                    className={
                        theme === 'DARK'
                            ? ' hover:text-slate-300 active:text-slate-100'
                            : 'hover:text-slate-600 active:text-slate-900'
                    }
                    onClick={() => dispatch({ type: 'DELETE', id: todo.id })}>
                    Delete
                </button>
            </div>
        </article>
    )
}
