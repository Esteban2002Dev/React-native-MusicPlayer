import { globalStyles } from '@config/theme/GlobalStyles.styles';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ConfigItem } from '../components/ConfigItem';
import { Appbar } from '@shared/components/Appbar';
import i18next from '@shared/services/i18next';
import { COLORS } from '@config/theme/Colors';
import React, { useState } from 'react';

export function AppSettingsScreen() {
    const [language, setLanguage] = useState(i18next.language);

    const changeLanguage = (lang: string) => {
        i18next.changeLanguage(lang);
        setLanguage(lang);
    };

    return (
        <ScrollView style={[globalStyles.container, globalStyles.background]}>
            <View>
                <Appbar showBackButton rightContent={
                    <View>
                        <Text style={styles.headerTitle}>Settings</Text>
                    </View>
                } />
                <View style={globalStyles.appContainer}>
                    <View style={{marginBottom: 10}}>
                        <ConfigItem
                            sectionTitle='Account'
                            itemTitle='My account'
                            actionText='Create an account'
                            startIconName='person'
                        />
                    </View>
                    <View style={{marginBottom: 10}}>
                        <ConfigItem
                            sectionTitle='Global configurations'
                            itemTitle='Language'
                            actionText={language}
                            startIconName='language'
                        />
                        <ConfigItem
                            itemTitle='Theme'
                            actionText='light-mode'
                            startIconName='moon'
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: COLORS.DARK.base
    },
    label: {
        fontSize: 18,
        marginBottom: 8
    },
    picker: {
        height: 50,
        width: '100%',
    }
});
