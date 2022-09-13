import { Song } from '../models/index'

export default function App({ song, selectOption } : { song: Song, selectOption: (song: Song) => void }) {

    return (
        <button onClick={() => selectOption(song)} className='w-96 h-16 bg-gray-100 rounded-3xl shadow shadow-black transition-all hover:bg-gray-300 active:scale-90 flex items-center justify-between px-6 ' >
            <span className='text-amber-500 font-semibold overflow-hidden text-ellipsis whitespace-nowrap ' > { song.title } - { song.artist } </span>
            <img src={song.image} width="60" className='rounded-xl' />
        </button>
    )

}