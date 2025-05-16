import { ISong } from '@shared/interfaces/song.interface';
import songsJson from '../../../../temp/data/songs.json';

export function loadSongs(): ISong[] {
    return songsJson;
}