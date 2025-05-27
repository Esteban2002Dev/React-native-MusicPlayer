/**
 * I18NEXT
 *
 * Version:
 * 25.2.0
 *
 * Package:
 * i18next
 *
 * Installation:
 * # npm install i18next --save
 *
 * Purpose:
 * Core internationalization (i18n) library used to manage translations, language detection,
 * and interpolation. It works independently of any frontend framework.
 *
 * Usage:
 * Use this package to manage multilingual content in your application.
 * Translations are typically stored in JSON files structured by language and namespace.
 * It provides utility functions to switch languages, manage fallback languages,
 * detect the user's language, and more.
 *
 * Common Features:
 * - Language switching
 * - Fallback support
 * - Pluralization
 * - Context-based translation
 * - Nested translation keys
 *
 * Documentation:
 * https://www.i18next.com/overview/getting-started
 */

/**
 * REACT-I18NEXT
 *
 * Version:
 * 15.5.2
 *
 * Package:
 * react-i18next
 *
 * Installation:
 * # npm install react-i18next --save
 *
 * Purpose:
 * React bindings for i18next. This package provides seamless integration of i18next
 * into React components through hooks, HOCs, and render props.
 *
 * Usage:
 * Use this package to easily access translations and change the language
 * inside React components using the `useTranslation` hook or `Trans` component.
 *
 * Features:
 * - React hook (`useTranslation`) for accessing translation functions
 * - `<Trans>` component for complex translations and markup
 * - Support for SSR and lazy loading
 * - Works with React Native and Web
 *
 * Documentation:
 * https://react.i18next.com/guides/quick-start
 */

/**
 * REACT-NATIVE-LOCALIZE
 *
 * Version:
 * ^3.4.1
 *
 * Package:
 * react-native-localize
 *
 * Installation:
 * # npm install react-native-localize --save
 * # npx pod-install (for iOS)
 *
 * Usage:
 * This package detects the device's locale settings (language, timezone, country, calendar, etc.)
 * to help personalize the app's experience for the user.
 *
 * It works great with translation libraries like `i18next`, allowing you to automatically set
 * the app's language based on the system preferences.
 *
 * Main features:
 * - Get the preferred system language(s)
 * - Detect changes in system locale (e.g. when the user changes the device language)
 * - Retrieve timezone, region, currency, and other localization info
 *
 * Documentation:
 * https://github.com/zoontek/react-native-localize
 */

import * as RNLocalize from 'react-native-localize';
import { initReactI18next } from 'react-i18next';
import i18next, { Resource } from 'i18next';

import tabsEn from '@navigation/locales/tabs-en.json';
import tabsEs from '@navigation/locales/tabs-es.json';

import musicPlayerEs from '@features/music-player/locales/music-player-es.json';
import musicPlayerEn from '@features/music-player/locales/music-player-en.json';

import settingsEn from '@features/settings/locales/settings-en.json';
import settingsEs from '@features/settings/locales/settings-es.json';

const locales = RNLocalize.getLocales();
const deviceLanguage = locales[0]?.languageCode || 'en';
const languageResources: Resource = {
    en: {
        tabs: tabsEn,
        musicPlayer: musicPlayerEn,
        settings: settingsEn
    }, 
    es: {
        tabs: tabsEs,
        musicPlayer: musicPlayerEs,
        settings: settingsEs
    }, 
}

i18next
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v4',
        resources: languageResources,
        lng: deviceLanguage,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        },
        debug: __DEV__
    });
export default i18next;