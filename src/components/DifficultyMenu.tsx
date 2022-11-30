import Difficulties from '../config/Difficulty';
import { CardType } from '../types/card';

type DifficultyMenuProps = {
  difficultySelected: (difficulty: number) => void;
  savedGame: (load: boolean) => void;
  loadGame: CardType[] | undefined;
};

export default function DifficultyMenu({
  difficultySelected,
  savedGame,
  loadGame,
}: DifficultyMenuProps) {
  const loadSavedGame = loadGame;
  return (
    <div className='difficultyContainer bg-svBlue rounded-lg text-svDarkBlue p-6 max-w-lg w-[90vw] text-center'>
      <h1 className='text-white mb-2 text-4xl font-bold text-center'>
        Secret Memory
      </h1>
      {loadSavedGame !== undefined && loadSavedGame.length > 0 ? (
        <>
          <p className='text-white text-center text-lg'>
            Wil je verder gaan met je opgeslagen spel?
          </p>
          <div className='grid text-lg'>
            <div className='difficultyButton' onClick={(e) => savedGame(true)}>
              <p>Ja graag!</p>
            </div>
            <div className='difficultyButton' onClick={(e) => savedGame(false)}>
              <p>Nee, doe maar een nieuw spel</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className='text-white text-center text-lg'>
            Kies een niveau om het Secret Memory spel te starten
          </p>

          <div className='grid text-lg'>
            <div
              className='difficultyButton'
              onClick={(e) => difficultySelected(Difficulties.EASY)}
            >
              <p>Appeltje eitje (easy)</p>
              <p>{Difficulties.EASY * 2} kaartjes</p>
            </div>
            <div
              className='difficultyButton'
              onClick={(e) => difficultySelected(Difficulties.MEDIUM)}
            >
              <p>Niet heeeel moeilijk (medium)</p>
              <p>{Difficulties.MEDIUM * 2} kaartjes</p>
            </div>
            <div
              className='difficultyButton'
              onClick={(e) => difficultySelected(Difficulties.HARD)}
            >
              <p>Dit is wat lastiger (hard)</p>
              <p>{Difficulties.HARD * 2} kaartjes</p>
            </div>
            <div
              className='difficultyButton'
              onClick={(e) => difficultySelected(Difficulties.EXTREME)}
            >
              <p>Alleen voor extreem knappe koppen (extreme)</p>
              <p>{Difficulties.EXTREME * 2} kaartjes</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
