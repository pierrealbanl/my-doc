import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

module.exports = {
    title: 'Documentation',
    url: 'https://example.com',
    baseUrl: '/',
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    routeBasePath: '/',
                    sidebarPath: './sidebars.ts',
                },
                blog: false,
                theme: {
                    customCss: './src/css/global.css'
                },
            },
        ],
    ],

    themeConfig: {
        navbar: {
            items: [
                {
                    type: 'doc',
                    docId: 'intro',
                    position: 'left',
                    label: 'Documentation'
                },
            ],
        },
        colorMode: {
            defaultMode: 'light',
            disableSwitch: true,
            respectPrefersColorScheme: false,
        },
        prism: {
            theme: prismThemes.vsLight,
            additionalLanguages: ['java', 'haskell']
        },
    } satisfies Preset.ThemeConfig,
};
