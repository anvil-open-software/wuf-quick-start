export const NavigationItems =
    {
        'links': [
            {
                'link': '/',
                'label': 'Page 1',
                'icon': '&#xE88A;',
                'id': 'nav-example-page-1'
            },
            {
                'link': '/example-page-2',
                'label': 'Page 2',
                'icon': '&#xE42B;',
                'id': 'nav-example-page-2'
            },
            {
                'link': '/example-feature-module',
                'label': 'Feature Module',
                'icon': '&#xE875;',
                'id': 'nav-feature-module',
                'links': [
                    {
                        'link': '/example-feature-module/feature-module-page-1',
                        'label': 'Child Page 1',
                        'icon': '&#xE87C;',
                        'id': 'nav-feature-module-child-1'
                    },
                    {
                        'link': '/example-feature-module/feature-module-page-2',
                        'label': 'Child Page 2',
                        'icon': '&#xE87C;',
                        'id': 'nav-feature-module-child-2'
                    }
                ]
            }
        ]
    };
