import { useState, useEffect } from 'react'
import { questionType, Song } from '../models/index' 
import Option from './Option'

type Game = { 
    question: questionType;
    restartGame: (time: number) => void;
    music: HTMLAudioElement, 
    resetGame: (status: 'win' | 'lose') => void;
}

export default function App(
    { question, restartGame, music, resetGame }: Game) {

    const [countdown, setCountdown] = useState(2)
    const [started, setStarted] = useState<number>(0)

    useEffect(() => {

        if (!countdown) {
            music.play()
            setStarted(Date.now())
            return;
        }
        
        music.src = question.song

        const timer = setInterval(() => {
            setCountdown(countdown - 1)
        }, 1000);

        return () => clearInterval(timer)
    }, [music, countdown])

    const selectOption = (song: Song) => {
        if (song.audio == question.song) {
            restartGame(Date.now() - started)
            music?.pause()
        } else {
            resetGame('lose')
        }
    } 

    return (
        <div className="w-full h-screen flex items-center justify-center" >
            {countdown ?
                <span className='font-semibold text-9xl text-white ' > { countdown } </span> :
                <div className='flex flex-col items-cener justify-center gap-5 ' >

                    {
                        question.options.map((song, index) => {
                            return <Option key={index} song={song} selectOption={selectOption} />
                        })
                    }

                </div>
            }
        </div>
    )
}