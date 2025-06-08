import { Image, StyleSheet, View, FlatList, Pressable } from 'react-native';
import { Header } from '@features/music-player/components/Header';
import { globalStyles } from '@config/theme/GlobalStyles.styles';
import React, { useEffect, useState } from 'react';
import { Appbar } from '@shared/components/Appbar';
import { COLORS } from '@config/theme/Colors';

/**
 * * To import images as modules we have to create the declarations file (declarations.d.ts)
 * * and declare the file type as module.
 */
import { useAppNavigation } from '@navigation/hooks/useAppNavigation';
import { MainButton } from '@shared/components/MainButton';
import { ISong } from '@shared/interfaces/song.interface';
import { SearchInput } from '../components/SearchInput';
import profileImg from '@assets/images/esteban.jpeg';
import { MusicItem } from '../components/MusicItem';
import { useSong } from '../store/song-store';
import { useTranslation } from 'react-i18next';

export function MusicListScreen() {
    const { navigation } = useAppNavigation();
    const { t } = useTranslation();

    const { songs, setSongs, playSong, playingSong } = useSong();
    const [searchText, setSearchText] = useState('');

    const [filteredSongs, setFilteredSongs] = useState<ISong[]>([]);

    useEffect(() => {
        setSongs();
    }, []);
    
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
                <Appbar />
                <View style={globalStyles.appContainer}>
                    <Header
                    title={t('music-list-screen.header.title', { ns: 'musicPlayer' })}
                    subtitle='Luis Esteban!'
                    description={t('music-list-screen.header.subtitle', { ns: 'musicPlayer' })}
                    rightContent={
                        // TODO: Make this a shared component (ex. <Avatar />)
                        <Pressable onPress={() => navigation.navigate('Settings')}>
                            <Image source={profileImg} style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                borderWidth: 2,
                                borderColor: COLORS.PURPLE.base
                            }} />
                        </Pressable>
                    } />
                    <View style={{
                        marginTop: 15
                    }}>
                        <SearchInput
                        placeholder={t('search-input.placeholder', { ns: 'musicPlayer' })}
                        icon='search'
                        text={searchText}
                        setText={setSearchText} />
                    </View>
                    <View style={styles.buttonsContainer}>
                        <View style={{flex: 2.5}}>
                            <MainButton
                            onPress={() => playSong(songs[0])}
                            label={t('button-text.play', { ns: 'musicPlayer' })}
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