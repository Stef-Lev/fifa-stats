import React from 'react';

function PlayerDataItem({ player }) {
  const games = player.games_played.statistics;
  const gameWinPercent =
    (parseInt(games.won) / parseInt(games.total)) * 100 || 0;
  const tournamentWinPercent =
    (parseInt(player.tournaments_played.won) /
      parseInt(player.tournaments_played.total)) *
      100 || 0;

  return (
    <div>
      <p>{player.name}</p>
      <p>Games played: {games.total}</p>
      <p>Games won: {games.won}</p>
      <p>Games drawn: {games.drawn}</p>
      <p>Games lost: {games.lost}</p>
      <p>Success Rate: {gameWinPercent}%</p>
      <p>Goals for: {player.goals.for}%</p>
      <p>Goals against: {player.goals.against}%</p>
      <p>Tournaments played: {player.tournaments_played.total}</p>
      <p>Tournaments won: {player.tournaments_played.won}</p>
      <p>Success Rate: {tournamentWinPercent}%</p>
      <hr />
    </div>
  );
}

export default PlayerDataItem;
