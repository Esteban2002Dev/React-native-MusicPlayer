import { ISong } from '@shared/interfaces/music-player/song.interface';
import songsJson from '../../../../temp/data/songs.json';

export function loadSongs(): ISong[] {
    return songsJson;
}