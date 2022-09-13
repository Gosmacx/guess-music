import { Router, Request, Response } from "express";
import fetch from 'isomorphic-unfetch'
import spotify, { Preview } from 'spotify-url-info'
// import songs from '../songs.json'

const { getPreview, getTracks } = spotify(fetch)
const router = Router()

const baseURL = "https://open.spotify.com/track/";

const lists: {
    turkish: string[],
    global: string[]
} = {
    turkish: [],
    global: []
}

getTracks('https://open.spotify.com/playlist/3bC812XoLAW1i2YpitYJHz').then(list => {
    lists.turkish = list.map(i => i.id)
})

getTracks('https://open.spotify.com/playlist/37i9dQZF1DX4o1oenSJRJd').then(list => {
    lists.global = list.map(i => i.id)
})

router.get("/", (_, res) => {
    res.send("just dev.")
})

router.post("/getQuestion", async (req: Request, res: Response) => {
    let { type, listenedSongs } = req.body
    if (!listenedSongs || !type) return res.status(400).send("Bad field")

    /* Correctly random song fetching starts */

    // Create a list of previously dont listened songs.
    const list = lists[type].filter((song: string)=> !listenedSongs.includes(song))

    // Get a random song from the clean list.
    const randomSong = list[Math.floor(Math.random() * list.length)]
    if (!randomSong) return res.status(500).send("Unexpected error")

    // Get information about the obtained song.
    const succesTrack: Preview = await getPreview(baseURL + randomSong)


    /* Option creation begins */

    // The options are stored in this array in detail: options
    let options = []
    // Only the keys of the songs are stored in this list.
    const listForFilter = []

    // We push the resulting song to these lists before the process starts
    options.push(succesTrack)
    listForFilter.push(randomSong)

    for await (const _ of Array(3)) {
        let createClearList = lists[type].filter((song: string) => !listForFilter.includes(song))
        let getRandomOption = createClearList[Math.floor(Math.random() * createClearList.length)]
        let getSong = await getPreview(baseURL + getRandomOption)
        listForFilter.push(getRandomOption)
        options.push(getSong)
    }

    // Shuffle options array
    options = options.sort(() => Math.random() - 0.5)

    res.send({
        key: randomSong,
        song: succesTrack.audio,
        options: options
    })
})

export default router