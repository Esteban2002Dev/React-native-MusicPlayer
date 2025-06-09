import { IPlaylist } from '@shared/interfaces/music-player/playlist.interface';
import PlaylistIconOutline from '@assets/icons/playlist-outline.svg';
import { globalStyles } from '@config/theme/GlobalStyles.styles';
import { PlaylistItem } from '../components/PlaylistItem';
import { SearchInput } from '../components/SearchInput';
import { Appbar } from '@shared/components/Appbar';
import { useTranslation } from 'react-i18next';
import { View, FlatList } from 'react-native';
import { useSong } from '../store/song-store';
import { Header } from '../components/Header';
import { COLORS } from '@config/theme/Colors';
import React, { useState } from 'react';

export function PlaylistScreen() {
    const { playingSong } = useSong();
    const { t } = useTranslation();
    const [searchText, setSearchText] = useState('');
    const [filteredPlaylists, setFilteredPlaylists] = useState<IPlaylist[]>([{
        id: '1234-abcd',
        name: 'Playlist sembrar mushrooms 🍄',
        songs: [{}, {}]
        
    } as IPlaylist]);

    return (
        <View style={[globalStyles.container, globalStyles.background]}>
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
                        title={t(`playlists-screen.header.title`, { ns: 'musicPlayer' })}
                        subtitle={t(`playlists-screen.header.subtitle`, { ns: 'musicPlayer' })}
                        description={`${filteredPlaylists.length} ${t(`playlists-screen.header.description`, { ns: 'musicPlayer' })}`}
                        rightContent={
                            <PlaylistIconOutline
                                width={50}
                                height={50}
                                color={COLORS.PURPLE.base}
                            />
                        } />
                        <View style={{
                            marginTop: 15
                        }}>
                            <SearchInput
                            placeholder={t('playlists-screen.search-input.placeholder', { ns: 'musicPlayer' })}
                            icon='search'
                            text={searchText}
                            setText={setSearchText} />
                        </View>
                    </View>
                </View>
            }
            data={filteredPlaylists}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
                <View>
                    <PlaylistItem playlist={item} key={index} />
                </View>
            )} />
        </View>
    )
}
