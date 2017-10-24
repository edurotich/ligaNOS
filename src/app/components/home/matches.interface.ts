export interface Matches {
  _links: {
    self: {
      href: string;
    },
    competition: {
      href: string;
    }
  };
  count: number;
  fixtures: [
    {
      _links: {
        self: {
          href: string;
        },
        competition: {
          href: string;
        },
        homeTeam: {
          href: string;
        },
        awayTeam: {
          href: string;
        }
      },
      date: Date;
      status: string;
      matchday: number;
      homeTeamName: number;
      awayTeamName: number;
      result: {
        goalsHomeTeam: number;
        goalsAwayTeam: number;
        halfTime: {
          goalsHomeTeam: number;
          goalsAwayTeam: number;
        }
      }
      odds: number;
    }];
}
