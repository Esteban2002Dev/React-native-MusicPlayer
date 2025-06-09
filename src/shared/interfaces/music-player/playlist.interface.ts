import { ISong } from './song.interface';

export interface IPlaylist {
    id: string;
    name: string;
    description?: string;
    coverImage?: string;
    createdAt: number | Date;
    updatedAt?: number | Date;
    songs: ISong[];
    isFavorite?: boolean;
    isCustom?: boolean;
}
