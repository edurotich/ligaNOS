export interface Team {
    _links: {
        self: {
            href: string;
        },
        fixtures: {
            href: string;
        },
        players: {
            href: string
        }
    };
    name: string;
    code: null;
    shortName: string;
    squadMarketValue: number;
    crestUrl: string;
}
