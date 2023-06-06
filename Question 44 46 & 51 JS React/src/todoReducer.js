/* eslint-disable no-case-declarations */
/* cSpell:ignore todo, todos */
export default function todoReducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            const newTodo = {
                id: Math.trunc(Date.now() / 1000),
                content: action.content,
            }

            return [...state, newTodo]
        case 'DELETE':
            const filteredTodos = state.filter((todo) => todo.id !== action.id)

            return filteredTodos
        default:
            return state
    }
}
