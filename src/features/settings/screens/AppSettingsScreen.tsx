import { globalStyles } from '@config/theme/GlobalStyles.styles';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ConfigItem } from '../components/ConfigItem';
import { Appbar } from '@shared/components/Appbar';
import i18next from '@shared/services/i18next';
import { useTranslation } from 'react-i18next';
import { COLORS } from '@config/theme/Colors';
import React, { useState } from 'react';

export function AppSettingsScreen() {
    const { t } = useTranslation();
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
                        <Text textBreakStrategy='highQuality' style={styles.headerTitle}>{t('app-settings-screen.header.title', { ns: 'settings' })}</Text>
                    </View>
                } />
                <View style={globalStyles.appContainer}>
                    <View style={{marginBottom: 10}}>
                        <ConfigItem
                            sectionTitle={t('app-settings-screen.sections.account', { ns: 'settings' })}
                            itemTitle={t('app-settings-screen.items.my-account.title', { ns: 'settings' })}
                            actionText={t('app-settings-screen.items.my-account.action', { ns: 'settings' })}
                            startIconName='person'
                        />
                    </View>
                    <View style={{marginBottom: 10}}>
                        <ConfigItem
                            sectionTitle={t('app-settings-screen.sections.global-configurations', { ns: 'settings' })}
                            itemTitle={t('app-settings-screen.items.language.title', { ns: 'settings' })}
                            actionText={language}
                            startIconName='language'
                            onPress={() => language === 'es' ? changeLanguage('en') : changeLanguage('es')}
                        />
                        <ConfigItem
                            itemTitle={t('app-settings-screen.items.theme.title', { ns: 'settings' })}
                            actionText={t('app-settings-screen.items.theme.light', { ns: 'settings' })}
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
