import { useState } from "react"

type Start = { 
    game: boolean, 
    startGame: (e: boolean) => void 
}

export default function App({ game, startGame }: Start) {

    const enterCapture = (event: any) => {
        if (event.key == 'Enter') return startGame(true)
    }

    if (game) return <></>
    return (
        <section className='text-white self-center min-h-full w-full flex items-center justify-center' >
            <div className="flex items-center relative justify-center" >
                <button onClick={() => startGame(true)} className="h-20 flex gap-5 items-center justify-center w-96 bg-amber-500 transition-all hover:bg-amber-400 rounded-3xl" >
                    <span className="text-3xl " >Start</span>
                </button>
            </div>
        </section>
    )
}