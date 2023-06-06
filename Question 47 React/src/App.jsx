import { useState } from 'react';

export default function App() {
    
    const [count, setCount] = useState(0)

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-300 to-teal-300 space-y-6">
            <h1 className="text-3xl font-bold">Counter App</h1>
            <div className="min-w-[10rem] text-6xl font-bold bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-4 rounded text-center">{count}</div>
            <div className="flex gap-4">
                <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => setCount(count - 10)}
                >
                -10
                </button>
                <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => setCount(count - 1)}
                >
                -1
                </button>
                <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => setCount(count + 1)}
                >
                +1
                </button>
                <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => setCount(count + 10)}
                >
                +10
                </button>
            </div>
            <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => setCount(0)}
            >
                Reset
            </button>
        </div>
    )
}