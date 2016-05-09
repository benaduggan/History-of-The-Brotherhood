(function () {
    'use strict';

    angular
        .module('broho')
        .config(configureDoormanApp);

    function configureDoormanApp($mdThemingProvider) {
        createTheme($mdThemingProvider);
    }

    function createTheme($mdThemingProvider) {

        // Create color palette. Used http://knizia.biz/mcg to
        // generate 50 - 900. Borrowed A# values from Light Blue palette.
        $mdThemingProvider.definePalette('brohoGreen', {
            '50': 'DEECF4',
            '100': 'B1D1E4',
            '200': '81B4D3',
            '300': '4E96C2',
            '400': '297FB5',
            '500': '23B04A',
            '600': '036099',
            '700': '025588',
            '800': '024B77',
            '900': '023758',
            'A100': '80d8ff',
            'A200': '40c4ff',
            'A400': '00b0ff',
            'A700': '0091ea',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50', '100', '200', 'A100', 'A300', 'A400']
        });

        $mdThemingProvider.definePalette('brohoBlue', {
            '50': 'DEECF4',
            '100': 'B1D1E4',
            '200': '81B4D3',
            '300': '4E96C2',
            '400': '297FB5',
            '500': '20BCBB',
            '600': '036099',
            '700': '20BCBB',
            '800': '024B77',
            '900': '023758',
            'A100': '80d8ff',
            'A200': '40c4ff',
            'A400': '00b0ff',
            'A700': '0091ea',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50', '100', '200', 'A100', 'A300', 'A400']
        });

        $mdThemingProvider.definePalette('brohoRed', {
            '50': 'DEECF4',
            '100': 'B1D1E4',
            '200': '81B4D3',
            '300': '4E96C2',
            '400': '297FB5',
            '500': '20BCBB',
            '600': 'BE4329',
            '700': '20BCBB',
            '800': '024B77',
            '900': '023758',
            'A100': '80d8ff',
            'A200': '40c4ff',
            'A400': '00b0ff',
            'A700': '0091ea',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50', '100', '200', 'A100', 'A300', 'A400']
        });


        // Define our overall theme.
        $mdThemingProvider.theme('default')
            .primaryPalette('brohoGreen', {
                default: '500'
            })
            .accentPalette('brohoBlue', {
                default: '500'
            })
            .warnPalette('brohoRed', {
                default: '600'
            });
    }
})();
