import type { StrapiApp } from '@strapi/strapi/admin';
import './app.css';

export default {
    config: {
        locales: ['en'],
        theme: {
            light: {
                colors: {
                    primary100: '#f3f4f6',
                    primary200: '#e5e7eb',
                    primary500: '#171717',
                    primary600: '#171717',
                    primary700: '#000000',
                    buttonPrimary500: '#171717',
                    buttonPrimary600: '#000000',
                    neutral0: '#ffffff',
                    neutral100: '#f9fafb',
                    neutral150: '#f3f4f6',
                    neutral200: '#e5e7eb',
                    neutral500: '#737373',
                    neutral600: '#525252',
                    neutral700: '#404040',
                    neutral800: '#262626',
                    neutral900: '#171717',
                },
            },
            dark: {
                colors: {
                    neutral0: '#171717',
                    neutral100: '#212121',
                    neutral150: '#262626',
                    neutral200: '#323232',
                    neutral500: '#a3a3a3',
                    neutral600: '#d4d4d4',
                    neutral700: '#e5e5e5',
                    neutral800: '#fafafa',
                    neutral900: '#ffffff',
                    primary100: '#262626',
                    primary200: '#404040',
                    primary500: '#fafafa',
                    primary600: '#fafafa',
                    primary700: '#ffffff',
                    buttonPrimary500: '#fafafa',
                    buttonPrimary600: '#ffffff',
                    buttonNeutral0: '#212121',
                },
            },
        },
        translations: {
            en: {
                'Auth.form.welcome.title': 'Laravel Admin',
                'Auth.form.welcome.subtitle': 'Log in to your dashboard',
                'app.components.LeftMenu.navbrand.title': 'Laravel Admin',
            },
            dk: {
                'Auth.form.welcome.title': 'Laravel Admin',
                'Auth.form.welcome.subtitle': 'Log ind på dit dashboard',
                'app.components.LeftMenu.navbrand.title': 'Laravel Admin',
            },
        },
    },
    bootstrap(app: StrapiApp) {},
};
