type Start = { 
    game: boolean, 
    startGame: (e: boolean) => void 
}

export default function App({ game, startGame }: Start) {
    if (game) return <></>
    return (
        <section className='text-white self-center min-h-full w-full flex items-center justify-center' >
            <div className="flex items-center relative justify-center" >
                <button onClick={() => startGame(true)} className="h-20 flex gap-5 drop-shadow-lg items-center justify-center w-96 bg-slate-900 transition-all hover:bg-slate-800 rounded-full" >
                    <span className="text-3xl " >Start</span>
                </button>
            </div>
        </section>
    )
}