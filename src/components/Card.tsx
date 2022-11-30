import { CardType } from '../types/card';

type CardProps = {
  card: CardType;
  cardClicked: (card: CardType) => void;
};

export default function Card({ card, cardClicked }: CardProps) {
  const handleClick = () => {
    if (card && card.clickable) cardClicked(card);
  };

  return (
    <div
      onClick={handleClick}
      className='card max-h-[100px] max-w-[100px] rounded-lg m-2 cursor-pointer flex justify-center items-center border-svBlue border-2'
      style={{ backgroundColor: card.flipped ? 'white' : '#0095FF' }}
    >
      {card.flipped ? (
        <img
          className='front h-full p-[5%] object-contain aspect-square'
          src={card.front}
        />
      ) : (
        <img
          className='front h-full p-[25%] object-contain aspect-square rounded-full'
          src={card.back}
        />
      )}
    </div>
  );
}
