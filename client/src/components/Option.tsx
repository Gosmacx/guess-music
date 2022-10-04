import { Song } from '../models/index'

type Option = { 
    song: Song, 
    selectOption: (song: Song) => void 
}

export default function App({ song, selectOption } : Option) {

    return (
        <button onClick={() => selectOption(song)} className='w-96 h-16 bg-gray-100 rounded-full drop-shadow-lg transition-all hover:bg-gray-300 active:scale-90 flex items-center justify-between px-6 ' >
            <span className='text-slate-900 font-semibold overflow-hidden text-ellipsis whitespace-nowrap ' > { song.title } - { song.artist } </span>
            <img src={song.image} width="60" className='rounded-xl' />
        </button>
    )

}