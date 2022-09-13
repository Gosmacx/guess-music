export interface Song {
    title: string;
    type: string;
    track: string;
    artist: string;
    image: string;
    audio: string;
    link: string;
    embed: string;
    date: string;
    description: string;
}

export interface questionType {
    key: string;
    song: string;
    options: Song[];
}