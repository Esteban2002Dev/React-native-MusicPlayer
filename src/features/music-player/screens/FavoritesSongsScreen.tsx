import { globalStyles } from '@config/theme/GlobalStyles.styles';
import { ISong } from '@shared/interfaces/song.interface';
import { SearchInput } from '../components/SearchInput';
import { MusicItem } from '../components/MusicItem';
import { IonIcon } from '@shared/components/IonIcon';
import { Appbar } from '@shared/components/Appbar';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, FlatList } from 'react-native';
import { useSong } from '../store/song-store';
import { Header } from '../components/Header';
import { COLORS } from '@config/theme/Colors';

export function FavoritesSongsScreen() {
    const { t } = useTranslation();

    const { songs, playingSong } = useSong();
    const [searchText, setSearchText] = useState('');

    const [filteredSongs, setFilteredSongs] = useState<ISong[]>([]);
    
    useEffect(() => {
        setFilteredSongs(songs);
    }, [songs]);

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
            paddingBottom: playingSong ? 140 : 80,
        }}
        style={[globalStyles.container, globalStyles.background]}
        ListHeaderComponent={
            <View>
                <Appbar showBackButton />
                <View style={globalStyles.appContainer}>
                    <Header
                    title={t(`favorites-screen.header.title`, { ns: 'musicPlayer' })}
                    subtitle={t(`favorites-screen.header.subtitle`, { ns: 'musicPlayer' })}
                    description={songs ? `${songs.length} ${t(`favorites-screen.header.description`, { ns: 'musicPlayer' })}` : ''}
                    rightContent={
                        <IonIcon
                            name="heart"
                            color={COLORS.CORAL[200]}
                            size={50}
                            duration={1000}
                            pulseAnimation
                        />
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
