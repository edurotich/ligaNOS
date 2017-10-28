export interface Head2Head {
    fixture: {
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
        homeTeamName: string;
        awayTeamName: string;
        result: {
            goalsHomeTeam: number;
            goalsAwayTeam: number;
        },
        odds: number
    };
    head2head: {
        count: number;
        timeFrameStart: Date;
        timeFrameEnd: Date;
        homeTeamWins: number;
        awayTeamWins: number;
        draws: number;
        lastHomeWinHomeTeam: number;
        lastWinHomeTeam: number;
        lastAwayWinAwayTeam: {
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
            homeTeamName: string;
            awayTeamName: string;
            result: {
                goalsHomeTeam: number;
                goalsAwayTeam: number;
                halfTime: {
                    goalsHomeTeam: number;
                    goalsAwayTeam: number;
                }
            },
            odds: {
                homeWin: number;
                draw: number;
                awayWin: number;
            }
        },
        lastWinAwayTeam: {
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
            homeTeamName: string;
            awayTeamName: string;
            result: {
                goalsHomeTeam: number;
                goalsAwayTeam: number;
                halfTime: {
                    goalsHomeTeam: number;
                    goalsAwayTeam: number;
                }
            },
            odds: {
                homeWin: number;
                draw: number;
                awayWin: number;
            }
        },
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
                homeTeamName: string;
                awayTeamName: string;
                result: {
                    goalsHomeTeam: number;
                    goalsAwayTeam: number;
                    halfTime: {
                        goalsHomeTeam: number;
                        goalsAwayTeam: number;
                    }
                },
                odds: {
                    homeWin: number;
                    draw: number;
                    awayWin: number;
                }
            }
        ];
    };
}
