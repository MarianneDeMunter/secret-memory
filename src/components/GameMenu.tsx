type GameMenuProps = {
  newGame: () => void;
  saveGame: () => void;
  moves: number;
};

export default function GameMenu({ newGame, saveGame, moves }: GameMenuProps) {
  return (
    <div className='header grid grid-cols-3 justify-items-center items-center text-svDarkBlue bg-svBlue h-fit max-h-28 w-full absolute top-0 left-0 '>
      <div
        className='difficultyButton menuButton border-svDarkBlue border-2 transition-all'
        onClick={newGame}
      >
        <p>Nieuw Spel Starten</p>
      </div>
      <div className='difficultyButton menuButton movesCounter pointer-events-none '>
        <p>Aantal zetten</p>
        <p>{moves}</p>
      </div>
      <div
        className='difficultyButton menuButton border-svDarkBlue border-2 transition-all '
        onClick={saveGame}
      >
        <p>Spel Opslaan</p>
      </div>
    </div>
  );
}
