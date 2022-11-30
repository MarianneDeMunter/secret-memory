import Card from './Card';

import { cards, CardType, MatchedCardType } from '../types/card';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { shuffle } from '../utils/shuffle';
import { memoryCards } from '../utils/memoryCards';
import Difficulties from '../config/Difficulty';
import DifficultyMenu from './DifficultyMenu';
import GameMenu from './GameMenu';
import FinishedModal from './FinishedModal';

export default function MemoryBoard() {
  const [gameCards, setGameCards] = useState<CardType[]>();
  const [difficulty, setDifficulty] = useState<number | null>();
  const [gridContainer, setGridContainer] = useState<CSSProperties>();
  const [selectedCard, setSelectedCard] = useState<undefined | CardType>();
  const [matchedCards, setMatchedCards] = useState<MatchedCardType[]>([]);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [savedGameCards, setSavedGameCards] = useState<CardType[]>();
  const [savedMatchedCards, setSavedMatchedCards] = useState<MatchedCardType[]>(
    [],
  );
  const [loadSavedGame, setLoadSavedGame] = useState<boolean>();
  const [moves, setMoves] = useState<number>(0);

  useEffect(() => {
    if (localStorage.getItem('savedGameCards')) {
      const savedGameCards = JSON.parse(
        localStorage.getItem('savedGameCards') || 'null',
      );
      const savedMatchedCards = JSON.parse(
        localStorage.getItem('savedMatchedCards') || 'null',
      );

      setSavedGameCards(savedGameCards);
      setSavedMatchedCards(savedMatchedCards);
    }
  }, []);

  useEffect(() => {
    if (loadSavedGame) {
      setGameCards(savedGameCards);
      setMatchedCards(savedMatchedCards);
      setDifficulty(savedGameCards!.length / 2);
    } else if (loadSavedGame === false) {
      setGameCards([]);
      setSavedGameCards([]);
      setMatchedCards([]);
      setSavedGameCards([]);
      setDifficulty(null);
    }
  }, [loadSavedGame, setLoadSavedGame]);

  useEffect(() => {
    if (difficulty && loadSavedGame !== true) {
      const gameCards = shuffle(
        memoryCards(shuffle(cards).slice(0, difficulty)),
      );
      setGameCards(gameCards);
    }
    if (difficulty) {
      if (difficulty === Difficulties.EXTREME) {
        const gridContainer = {
          gridTemplateColumns: 'repeat(6, 1fr)',
          marginTop: '165px',
        };
        setGridContainer(gridContainer);
      } else if (difficulty === Difficulties.HARD) {
        const gridContainer = { gridTemplateColumns: 'repeat(5, 1fr)' };
        setGridContainer(gridContainer);
      } else if (difficulty === Difficulties.MEDIUM) {
        const gridContainer = { gridTemplateColumns: 'repeat(3, 1fr)' };
        setGridContainer(gridContainer);
      } else if (difficulty === Difficulties.EASY) {
        const gridContainer = { gridTemplateColumns: 'repeat(2, 1fr)' };
        setGridContainer(gridContainer);
      }
    }
  }, [difficulty, loadSavedGame]);

  useEffect(() => {
    if (
      gameCards &&
      gameCards.length > 0 &&
      matchedCards.length === gameCards?.length
    ) {
      setGameFinished(true);
    }
  }, [matchedCards]);

  const cardClicked = (currentCardClicked: CardType) => {
    setGameCards((prev) =>
      prev?.map((card) =>
        card.id === currentCardClicked.id
          ? { ...card, flipped: true, clickable: false }
          : card,
      ),
    );

    if (!selectedCard) {
      setSelectedCard({ ...currentCardClicked });
    } else {
      setMoves(moves + 1);
      gameCards?.map((card) => (card.clickable = false));
      if (currentCardClicked.id === selectedCard?.matchId) {
        const matchedCardsArray = [...matchedCards];
        matchedCardsArray.push(
          { id: currentCardClicked.id },
          { id: selectedCard.id },
        );
        setMatchedCards(matchedCardsArray);

        setSelectedCard(undefined);
        gameCards?.map((card) => (card.clickable = true));
      } else {
        setTimeout(() => {
          setGameCards((prev) =>
            prev?.map((card) =>
              card.id === selectedCard.id || card.id === currentCardClicked.id
                ? { ...card, flipped: false, clickable: true }
                : card,
            ),
          );
          gameCards?.map((card) => (card.clickable = true));
        }, 1000);

        setSelectedCard(undefined);
      }
    }
  };

  const newGame = () => {
    setDifficulty(null);
    setGameCards([]);
    setSavedGameCards([]);
    setMatchedCards([]);
    setSavedMatchedCards([]);
    setGameFinished(false);
  };

  const saveGame = () => {
    if (gameCards) {
      setSavedGameCards(gameCards);
      setSavedMatchedCards(matchedCards);
    }
  };

  useEffect(() => {
    if (gameCards) {
      window.localStorage.setItem('savedGameCards', JSON.stringify(gameCards));
      window.localStorage.setItem(
        'savedMatchedCards',
        JSON.stringify(matchedCards),
      );
    }
  }, [savedGameCards, savedMatchedCards]);

  useEffect(() => {
    if (gameCards?.length === 0 && savedGameCards?.length === 0)
      window.localStorage.clear();
  }, [savedGameCards]);

  return (
    <div className='grid h-full place-content-center'>
      {difficulty ? (
        <>
          <GameMenu newGame={newGame} saveGame={saveGame} moves={moves} />
          <div className='memoryboard grid' style={gridContainer}>
            {gameCards?.map((card) => (
              <Card key={card.id} card={card} cardClicked={cardClicked} />
            ))}
          </div>
        </>
      ) : (
        <DifficultyMenu
          difficultySelected={setDifficulty}
          savedGame={setLoadSavedGame}
          loadGame={savedGameCards}
        />
      )}
      {gameFinished && <FinishedModal newGame={newGame} moves={moves} />}
    </div>
  );
}
