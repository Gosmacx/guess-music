import { useState } from "react"

export default function App({ username, startGame }: { username: string | null, startGame: (e: string) => void }) {

    const [_username, setUsername] = useState<string>('')

    const enterCapture = (event: any) => {
        if (event.key == 'Enter') return startGame(event.target.value)
    }

    if (username) return <></>
    return (
        <section className='text-white self-center min-h-full w-full flex items-center justify-center' >
            <div className="flex items-center relative justify-center" >
                <input onChange={e => setUsername(e.target.value)} onKeyUp={enterCapture} maxLength={16} className="h-20 w-80 outline-none text-4xl text-center rounded-tl-3xl rounded-bl-3xl text-black" type="text" placeholder="Username"></input>
                <button onClick={() => startGame(_username)} className="h-20 w-16 bg-amber-500 transition-all hover:bg-amber-400 rounded-tr-3xl rounded-br-3xl" >
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto" height="48" width="48" fill="#fff"><path d="M18.9 35.7 7.7 24.5 9.85 22.35 18.9 31.4 38.1 12.2 40.25 14.35Z" /></svg>
                </button>
            </div>
        </section>
    )
}