export const calcAverage = (num, total) => {
  return +(num / total).toFixed(2);
};

export const calculateTopTournament = (players) => {
  if (players.length) {
    let sortedTournaments = players.sort(
      (a, b) =>
        calcAverage(b.tournaments_played.won, b.tournaments_played.total) -
        calcAverage(a.tournaments_played.won, a.tournaments_played.total),
    );
    return sortedTournaments[0].fullname;
  }
};
export const calculateTopOffense = (players) => {
  if (players.length) {
    let sortedOffense = players.sort(
      (a, b) =>
        calcAverage(b.goals.for, b.games_played.statistics.total) -
        calcAverage(a.goals.for, a.games_played.statistics.total),
    );
    return sortedOffense[0].fullname;
  }
};
export const calculateTopDefense = (players) => {
  if (players.length) {
    let sortedDefense = players.sort(
      (a, b) =>
        calcAverage(a.goals.against, a.games_played.statistics.total) -
        calcAverage(b.goals.against, b.games_played.statistics.total),
    );
    return sortedDefense[0].fullname;
  }
};
