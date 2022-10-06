import { Dispatch, SetStateAction } from 'react'

type Table = { 
    game: boolean, 
    setType: Dispatch<SetStateAction<"global" | "turkish">>, 
    music: any 
}

export default function App({ game, setType, music }: Table) {

    if (game) return <></>
    return (
        <section className='glasBackground h-3/4 w-96 border-2 border-gray-300 drop-shadow-lg text-white md:absolute left-10 flex items-center flex-col rounded-sm rounded-tl-none shadow ' >
            <h1 className='text-lg font-semibold py-2 w-full text-center ' >Info</h1>

            <div className='grow w-full flex flex-col items-center overflow-y-auto px-6 pt-4 gap-6 ' >
                <div className="flex items-center justify-between w-full " >
                    <span>Select List Type:</span>
                    <select onChange={(e: any) => setType(e.target.value)} className="text-black w-32" >
                        <option value="global">Global</option>
                        <option value="turkish">Turkish</option>
                    </select>
                </div>
                <div className="flex items-center justify-between w-full">
                    <span>Set Music Volume: </span>
                    <input type="range" defaultValue='99' onChange={(e: any) => music.volume = e.target.value / 100} min="1" max="99" id="myRange" />
                </div>
                <div className='w-full' >
                    <ul className='list-disc flex flex-col gap-4 ' >
                        <li>The game consists of 5 rounds.</li>
                        <li>The faster you answer, the more points you get.</li>
                        <li>If you answer incorrectly, you will lose the game completely.</li>
                    </ul>
                </div>
            </div>

        </section>
    )
}