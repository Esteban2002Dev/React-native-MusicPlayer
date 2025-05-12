import { Image, StyleSheet, View, FlatList } from 'react-native';
import { Header } from '@features/music-player/components/Header';
import { globalStyles } from '@config/theme/GlobalStyles.styles';
import React, { useEffect, useState } from 'react';
import { Appbar } from '@shared/components/Appbar';
import { COLORS } from '@config/theme/Colors';

const songs: ISong[] = [
    {
        id: "1",
        title: "Shape of You",
        artist: "Ed Sheeran",
        album: "Divide",
        genre: "Pop",
        duration: 233,
        filePath: "/music/shape-of-you.mp3",
        fileName: "shape-of-you.mp3",
        fileSize: 5200000,
        artwork: "https://link-to-artwork.com/shape-of-you.jpg",
        dateAdded: new Date("2025-05-01"),
        isFavorite: true,
        uri: "http://music.com/shape-of-you"
    },
    {
        id: "2",
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        genre: "R&B",
        duration: 200,
        filePath: "/music/blinding-lights.mp3",
        fileName: "blinding-lights.mp3",
        fileSize: 4500000,
        artwork: "https://link-to-artwork.com/blinding-lights.jpg",
        dateAdded: new Date("2025-05-02"),
        isFavorite: false,
        uri: "http://music.com/blinding-lights"
    },
    {
        id: "3",
        title: "Levitating",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        genre: "Pop",
        duration: 203,
        filePath: "/music/levitating.mp3",
        fileName: "levitating.mp3",
        fileSize: 4900000,
        artwork: "https://link-to-artwork.com/levitating.jpg",
        dateAdded: new Date("2025-05-03"),
        uri: "http://music.com/levitating"
    },
    {
        id: "4",
        title: "Good 4 U",
        artist: "Olivia Rodrigo",
        album: "SOUR",
        genre: "Pop Rock",
        duration: 210,
        filePath: "/music/good-4-u.mp3",
        fileName: "good-4-u.mp3",
        fileSize: 4700000,
        artwork: "https://link-to-artwork.com/good-4-u.jpg",
        dateAdded: new Date("2025-05-04"),
        isFavorite: true,
        uri: "http://music.com/good-4-u"
    },
    {
        id: "5",
        title: "Stay",
        artist: "The Kid LAROI, Justin Bieber",
        album: "F*ck Love 3",
        genre: "Pop",
        duration: 145,
        filePath: "/music/stay.mp3",
        fileName: "stay.mp3",
        fileSize: 4000000,
        artwork: "https://link-to-artwork.com/stay.jpg",
        dateAdded: new Date("2025-05-05"),
        uri: "http://music.com/stay"
    },
    {
        id: "6",
        title: "Industry Baby",
        artist: "Lil Nas X, Jack Harlow",
        album: "Montero",
        genre: "Hip-Hop",
        duration: 235,
        filePath: "/music/industry-baby.mp3",
        fileName: "industry-baby.mp3",
        fileSize: 5500000,
        artwork: "https://link-to-artwork.com/industry-baby.jpg",
        dateAdded: new Date("2025-05-06"),
        isFavorite: false,
        uri: "http://music.com/industry-baby"
    },
    {
        id: "7",
        title: "Kiss Me More",
        artist: "Doja Cat, SZA",
        album: "Planet Her",
        genre: "Pop",
        duration: 230,
        filePath: "/music/kiss-me-more.mp3",
        fileName: "kiss-me-more.mp3",
        fileSize: 4800000,
        artwork: "https://link-to-artwork.com/kiss-me-more.jpg",
        dateAdded: new Date("2025-05-07"),
        uri: "http://music.com/kiss-me-more"
    },
    {
        id: "8",
        title: "Montero (Call Me By Your Name)",
        artist: "Lil Nas X",
        album: "Montero",
        genre: "Hip-Hop",
        duration: 240,
        filePath: "/music/montero.mp3",
        fileName: "montero.mp3",
        fileSize: 5300000,
        artwork: "https://link-to-artwork.com/montero.jpg",
        dateAdded: new Date("2025-05-08"),
        uri: "http://music.com/montero"
    },
    {
        id: "9",
        title: "Peaches",
        artist: "Justin Bieber, Daniel Caesar, Giveon",
        album: "Justice",
        genre: "R&B",
        duration: 210,
        filePath: "/music/peaches.mp3",
        fileName: "peaches.mp3",
        fileSize: 4700000,
        artwork: "https://link-to-artwork.com/peaches.jpg",
        dateAdded: new Date("2025-05-09"),
        uri: "http://music.com/peaches"
    },
    {
        id: "10",
        title: "Levitating (Remix)",
        artist: "Dua Lipa, DaBaby",
        album: "Future Nostalgia (Remixes)",
        genre: "Pop",
        duration: 220,
        filePath: "/music/levitating-remix.mp3",
        fileName: "levitating-remix.mp3",
        fileSize: 5000000,
        artwork: "https://link-to-artwork.com/levitating-remix.jpg",
        dateAdded: new Date("2025-05-10"),
        uri: "http://music.com/levitating-remix"
    },
    {
        id: "11",
        title: "Watermelon Sugar",
        artist: "Harry Styles",
        album: "Fine Line",
        genre: "Pop",
        duration: 175,
        filePath: "/music/watermelon-sugar.mp3",
        fileName: "watermelon-sugar.mp3",
        fileSize: 4200000,
        artwork: "https://link-to-artwork.com/watermelon-sugar.jpg",
        dateAdded: new Date("2025-05-11"),
        uri: "http://music.com/watermelon-sugar"
    },
    {
        id: "12",
        title: "Save Your Tears",
        artist: "The Weeknd",
        album: "After Hours",
        genre: "Pop",
        duration: 215,
        filePath: "/music/save-your-tears.mp3",
        fileName: "save-your-tears.mp3",
        fileSize: 4600000,
        artwork: "https://link-to-artwork.com/save-your-tears.jpg",
        dateAdded: new Date("2025-05-12"),
        uri: "http://music.com/save-your-tears"
    },
    {
        id: "13",
        title: "Heat Waves",
        artist: "Glass Animals",
        album: "Dreamland",
        genre: "Indie Pop",
        duration: 240,
        filePath: "/music/heat-waves.mp3",
        fileName: "heat-waves.mp3",
        fileSize: 5000000,
        artwork: "https://link-to-artwork.com/heat-waves.jpg",
        dateAdded: new Date("2025-05-13"),
        uri: "http://music.com/heat-waves"
    },
    {
        id: "14",
        title: "Deja Vu",
        artist: "Olivia Rodrigo",
        album: "SOUR",
        genre: "Pop",
        duration: 220,
        filePath: "/music/deja-vu.mp3",
        fileName: "deja-vu.mp3",
        fileSize: 4600000,
        artwork: "https://link-to-artwork.com/deja-vu.jpg",
        dateAdded: new Date("2025-05-14"),
        uri: "http://music.com/deja-vu"
    },
    {
        id: "15",
        title: "Bad Habits",
        artist: "Ed Sheeran",
        album: "Equals",
        genre: "Pop",
        duration: 230,
        filePath: "/music/bad-habits.mp3",
        fileName: "bad-habits.mp3",
        fileSize: 4800000,
        artwork: "https://link-to-artwork.com/bad-habits.jpg",
        dateAdded: new Date("2025-05-15"),
        uri: "http://music.com/bad-habits"
    },
    {
        id: "16",
        title: "Don't Start Now",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        genre: "Pop",
        duration: 183,
        filePath: "/music/dont-start-now.mp3",
        fileName: "dont-start-now.mp3",
        fileSize: 4600000,
        artwork: "https://link-to-artwork.com/dont-start-now.jpg",
        dateAdded: new Date("2025-05-16"),
        uri: "http://music.com/dont-start-now"
    },
    {
        id: "17",
        title: "Stay With Me",
        artist: "Sam Smith",
        album: "In the Lonely Hour",
        genre: "Pop",
        duration: 250,
        filePath: "/music/stay-with-me.mp3",
        fileName: "stay-with-me.mp3",
        fileSize: 5100000,
        artwork: "https://link-to-artwork.com/stay-with-me.jpg",
        dateAdded: new Date("2025-05-17"),
        uri: "http://music.com/stay-with-me"
    },
    {
        id: "18",
        title: "Perfect",
        artist: "Ed Sheeran",
        album: "Divide",
        genre: "Pop",
        duration: 240,
        filePath: "/music/perfect.mp3",
        fileName: "perfect.mp3",
        fileSize: 5200000,
        artwork: "https://link-to-artwork.com/perfect.jpg",
        dateAdded: new Date("2025-05-18"),
        uri: "http://music.com/perfect"
    },
    {
        id: "19",
        title: "Lose Control",
        artist: "Meduza, Becky Hill, Goodboys",
        album: "Lose Control",
        genre: "House",
        duration: 215,
        filePath: "/music/lose-control.mp3",
        fileName: "lose-control.mp3",
        fileSize: 4800000,
        artwork: "https://link-to-artwork.com/lose-control.jpg",
        dateAdded: new Date("2025-05-19"),
        uri: "http://music.com/lose-control"
    },
    {
        id: "20",
        title: "Take My Breath",
        artist: "The Weeknd",
        album: "Dawn FM",
        genre: "Pop",
        duration: 220,
        filePath: "/music/take-my-breath.mp3",
        fileName: "take-my-breath.mp3",
        fileSize: 4900000,
        artwork: "https://link-to-artwork.com/take-my-breath.jpg",
        dateAdded: new Date("2025-05-20"),
        uri: "http://music.com/take-my-breath"
    }
];

/**
 * * To import images as modules we have to create the declarations file (declarations.d.ts)
 * * and declare the file type as module.
 */
import { MainButton } from '@shared/components/MainButton';
import { ISong } from '@shared/interfaces/song.interface';
import { SearchInput } from '../components/SearchInput';
import profileImg from '@assets/images/esteban.jpeg';
import { MusicItem } from '../components/MusicItem';

export function MusicListScreen() {
    const [searchText, setSearchText] = useState('');

    const [filteredSongs, setFilteredSongs] = useState<ISong[]>(songs);

    useEffect(() => {
        const normalized = searchText.trim().toLowerCase();
        const results = songs.filter(
            song =>
            song.title.toLowerCase().includes(normalized) ||
            song.artist.toLowerCase().includes(normalized)
        );
        setFilteredSongs(results);
    }, [searchText]);

    return (
        <FlatList
        contentContainerStyle={{
            paddingBottom: 80,
        }}
        style={[globalStyles.container, globalStyles.background]}
        ListHeaderComponent={
            <View>
                <Appbar showBackButton />
                <View style={globalStyles.appContainer}>
                    <Header
                    title='Good Morning'
                    subtitle='Luis Esteban!'
                    description='Listen to your music.'
                    rightContent={
                        // TODO: Make this a shared component (ex. <Avatar />)
                        <View>
                            <Image source={profileImg} style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                borderWidth: 2,
                                borderColor: COLORS.PURPLE.base
                            }} />
                        </View>
                    } />
                    <View style={{
                        marginTop: 15
                    }}>
                        <SearchInput
                        placeholder='Search your music...'
                        icon='search'
                        text={searchText}
                        setText={setSearchText} />
                    </View>
                    <View style={styles.buttonsContainer}>
                        <View style={{flex: 2.5}}>
                            <MainButton
                            label='Play'
                            color={COLORS.PURPLE.base}
                            icon='play-circle-outline' />
                        </View>
                        <View style={{flex: 1.5}}>
                            <MainButton
                            color={COLORS.GREY.base}
                            textColor={COLORS.DARK.base}
                            icon='shuffle-outline' />
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>

                    </View>
                </View>
            </View>
        }
        data={filteredSongs}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
            <MusicItem item={item} index={index + 1} />
        )} />
    )
}

const styles = StyleSheet.create({
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginTop: 15
    }
});