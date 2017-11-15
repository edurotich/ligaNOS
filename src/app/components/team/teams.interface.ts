export interface Teams {
    _links: {
        self: {
            href: string;
        },
        competition: {
            href: string;
        }
    };
    count: number;
    teams: [
        {
            _links: {
                self: {
                    href: string;
                },
                fixtures: {
                    href: string;
                },
                players: {
                    href: string;
                }
            },
            name: string;
            code: number;
            shortName: string;
            squadMarketValue: number;
            crestUrl: string;
        }
    ];
}
