import { useEffect, useState } from 'react'
import Start from '../components/Start'
import Table from '../components/Table'
import Game from '../components/Game'
import Alert from '../components/Alert'
import axios from '../utils/axios'
import { questionType } from '../models/index'

function App() {

  const [game, setGame] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [listenedSongs, setListened] = useState<string[]>([])
  const [question, setQuestion] = useState<questionType | null>(null)
  const [music, setMusic] = useState<HTMLAudioElement>(document.createElement('audio'))
  const [point, setPoint] = useState<number>(0)
  const [round, setRound] = useState<number>(0)
  const [alert, toggleAlert] = useState<boolean>(false)
  const [type, setType] = useState<'turkish' | 'global'>('global')

  const getQuestion = () => {
    axios.post('/getQuestion', {
      type: type,
      listenedSongs
    })
      .then(response => {
        music.src = response.data.song
        music.oncanplay = () => {
          setQuestion(response.data)
          setLoading(false)
          setListened(e => [...e, response.data.key])
        }
      })
      .catch(() => {
        resetGame('lose')
      });
  }

  const startGame = (e: boolean) => {
    setLoading(true)
    setGame(e);
    getQuestion()
  }

  const restartGame = (time: number) => {
    if (round > 3) {
      toggleAlert(true)
      resetGame('win')
      return
    }
    setPoint(point + Math.round(100000 / time))
    setLoading(true)
    setQuestion(null)
    getQuestion()
    setRound(round + 1)
  }

  const resetGame = (status: 'win' | 'lose') => {
    setLoading(false)
    setGame(false)
    setQuestion(null)
    setListened([])
    setRound(0)
    if (status == 'lose') setPoint(0)
    music.pause()
    music.src = ''
    toggleAlert(true)
  }

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col md:flex-row bg-fixed ">
      <div className='text-white font-semibold text-2xl absolute drop-shadow-lg w-full top-3 text-center flex gap-5 items-center justify-center' >
        <span>G U E S S</span>
        <span>M U S I C</span>
      </div>

      {/* Game Start Screen */}
      {loading ?
        <div className='w-14 h-14 animate-spin rounded-full border-t-2 border-slate-900 ' ></div> :
        <Start game={game} startGame={startGame} />
      }

      {/* Game Screen */}
      {question ?
        <Game 
          music={music} 
          question={question} 
          restartGame={restartGame} 
          resetGame={resetGame}
        /> :
        <></>
      }

      {/* Last Players Table */}
      <Table game={game} setType={setType} music={music} />

      {/* Alert Box */}
      <Alert 
        point={point} 
        alert={alert} 
        toggleAlert={toggleAlert} 
        setPoint={setPoint}
      />
    </div>
  )
}

export default App
