export default function KeypadButton({ identifier, handler, style }) {
    return <div 
        className={
            'button text-[32px] flex items-center justify-center focus-visible:outline-none ' + style
        }
            onClick={handler} 
        >
            {identifier}
        </div>
}