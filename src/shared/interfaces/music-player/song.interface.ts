export interface ISong {
    id: string;
    title: string;
    artist: string;
    album?: string;
    genre?: string;
    duration: number;
    filePath: string;
    fileName: string;
    fileSize?: number;
    artwork?: string;
    dateAdded?: number | Date;
    isFavorite?: boolean;
    uri: string;
    trackNumber?: number;
}

export interface ISongPlaying extends ISong {
    playing?: boolean;
}