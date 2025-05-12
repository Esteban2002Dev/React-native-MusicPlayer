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
    dateAdded?: Date;
    isFavorite?: boolean;
    uri: string;
}