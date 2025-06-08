/**
 * Zustand
 * 
 * Version: 
 * 4.5.7
 * 
 * Package:
 * zustand
 * 
 * Installation:
 * # npm install zustand
 * 
 * Usage:
 * Using to manage the state of the music player
 * Documentation:
 * https://zustand.docs.pmnd.rs/getting-started/introduction
 */

import { ISong, ISongPlaying } from '@shared/interfaces/song.interface';
import { loadSongs } from '@features/music-player/services/music-player';
import { create } from 'zustand';

interface SongState {
    songs: ISong[];
    playingSong: ISongPlaying | null;
    
    setSongs: () => void;
    playSong: (song: ISong | null) => void;
    changePlayingSongState: (song: ISongPlaying) => void;
}

export const useSong = create<SongState>()((set, get) => ({
    songs: [],
    playingSong: null,
    setSongs: () => {
        const loaded = loadSongs();
        set({ songs: loaded });
    },
    playSong: (song: ISong | null) => {
        if (!song) return set({playingSong: null}); 
        set({playingSong: {... song, playing: true}});
    },
    changePlayingSongState: (song: ISongPlaying) => {
        set({playingSong: {... song, playing: !song.playing}});
    }
}))