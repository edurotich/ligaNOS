export interface LeagueTable {
    links: {
      self: {
        href: string;
      },
      competition: {
        href: string;
      }
    };
    leagueCaption: string;
    matchday: number;
    standing: [
    {
      links: {
        team: {
          href: string;
        }
      },
      position: number;
      teamName: string;
      crestURI: string;
      playedGames: number;
      points: number;
      goals: number;
      goalsAgainst: number;
      goalDifference: number;
      wins: number;
      draws: number;
      losses: number;
      home: {
        goals: number;
        goalsAgainst: number;
        wins: number;
        draws: number;
        losses: number;
      },
      away: {
        goals: number;
        goalsAgainst: number;
        wins: number;
        draws: number;
        losses: number;
      }
    }];
  }
