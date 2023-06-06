import { useRef, useState } from "react"
import KeypadButton from "./KeypadButton"
import './index.css'
import back from './back.svg'

export default function App() {

    const inputBox = useRef()
    const answerBox = useRef()

    const [answer, setAnswer] = useState('')
    const [backspaceHold, setBackspaceHold] = useState(false)

    async function fetchAndCalculate(expression) {
    
        const encodedExpr = encodeURIComponent(expression)
        const response = await fetch("http://api.mathjs.org/v4/?expr=" + encodedExpr)
        
        return await response.json()
    }
    
    function calculateExpression() {

        const expression = inputBox.current.value
        fetchAndCalculate(expression)
        
            .then((result) => {
                answerBox.current.classList.remove('text-[#F55050]')
                answerBox.current.classList.add('white')
                setAnswer(`= ${result}`)
            })
    
            .catch(() => {
                answerBox.current.classList.add('text-[#F55050]')
                answerBox.current.classList.remove('white')
                setAnswer('Format Error')
            })
    }

    function onKeypadButtonClick(event) {
        if (event.target.innerText === "=") {
            calculateExpression()
        }
        else if (event.target.className.includes("backspace")) {
            inputBox.current.value = inputBox.current.value.slice(0, -1)
        } else {
            const target = event.target.innerText
            inputBox.current.value += !isNaN(target) ? Number(target) : target
        }
        inputBox.current.focus()
    }

    async function onBackspaceClick() {

        setBackspaceHold(true)
        await sleep(1 * 1000)

        if (backspaceHold === true) {
            inputBox.current.value = '';
            setBackspaceHold(false)
        }
    }

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-[gray]">
            <div className="main-ui w-[400px] h-[85%] rounded-md overflow-hidden">
                <div className="input-output w-full h-[30%] bg-[#2d3033] flex flex-col items-center justify-center border-none">
                    <input  
                        className="w-full h-[46%] bg-[#2d3033] text-white caret-[#8ab4f8] py-[10px] text-5xl text-right border-none focus-visible:outline-none pr-4"
                        type="text" 
                        name="input-component" 
                        id="input-component"
                        inputMode="none" 
                        ref={inputBox} 
                        onKeyDown={(event) => {
                        if (event.code === "Enter" && inputBox.current.value)
                            calculateExpression()
                        }}
                    />
                    <div className="answer w-full h-[14%] bg-[#2d3033] text-white py-[10px] text-right text-4xl pr-4" ref={answerBox}>{answer}</div>
                </div>
                <div className="middle-component w-full h-[15%] text-center flex justify-evenly items-center">
                    {
                        ['%', '^', '(', ')', '!']
                        .map(i => 
                            <KeypadButton 
                                identifier={i} 
                                handler={onKeypadButtonClick} 
                                style={'w-1/5 h-full bg-[#174ea6] border-none'} 
                                key={i} 
                            />
                        )
                    }
                </div>
                <div className="lower-component w-full h-[55%] bg-[#202124] text-center flex items-center justify-center">
                    <div className="numbers w-[65%] h-full grid gap-0 grid-cols-3 grid-rows-4">
                        {
                            ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.']
                            .map(i => 
                                <KeypadButton 
                                    identifier={i} 
                                    handler={onKeypadButtonClick} 
                                    style={'text-white focus:bg-[#1e65d6]'}
                                    key={i}
                                />
                            )
                        }
                        <div className="do-nothing" />
                    </div>
                    <div className="operands w-[35%] h-full border-r-2 border-solid border-r-[#3e3e3e] grid gap-0 grid-cols-2 grid-rows-4">
                        <KeypadButton identifier={'/'} handler={onKeypadButtonClick} style={'operand text-[#8ab4f8] bg-[#202124] border-none focus:bg-[#3e3e3e]'}/>
                        <KeypadButton identifier={
                            <img 
                            src={back}
                            alt=""
                            className="backspace w-6 h-auto text-white fill-white"
                            id="backspace-button"
                            onMouseDown={onBackspaceClick}
                            onMouseUp={() => setBackspaceHold(false)}
                            onContextMenu={e => e.preventDefault()}
                        />
                        } handler={onKeypadButtonClick} style={'operand backspace'}>
                            
                        </KeypadButton>
                        <KeypadButton identifier={'*'} handler={onKeypadButtonClick} style={'operand text-[#8ab4f8] bg-[#202124] border-none focus:bg-[#3e3e3e]'}/>
                        <div className="do-nothing" />
                        <KeypadButton identifier={'-'} handler={onKeypadButtonClick} style={'operand text-[#8ab4f8] bg-[#202124] border-none focus:bg-[#3e3e3e]'}/>
                        <div className="do-nothing" />
                        <KeypadButton identifier={'+'} handler={onKeypadButtonClick} style={'operand text-[#8ab4f8] bg-[#202124] border-none focus:bg-[#3e3e3e]'}/>
                        <KeypadButton identifier={'='} handler={onKeypadButtonClick} style={'operand text-[#8ab4f8] bg-[#202124] border-none focus:bg-[#3e3e3e]'}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
