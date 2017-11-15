export interface TeamPlayers {
    _links: {
        self: {
          href: string;
        },
        team: {
          href: string;
        }
      };
      count: number;
      players: [
        {
          name: string;
          position: string;
          jerseyNumber: number;
          dateOfBirth: Date;
          nationality: string;
          contractUntil: Date;
          marketValue: number;
        }
    ];
}
