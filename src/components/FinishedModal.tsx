type FinishedModalProps = {
  newGame: () => void;
  moves: number;
};

export default function FinishedModal({ newGame, moves }: FinishedModalProps) {
  return (
    <div className='modal fixed top-0 left-0 right-0 bottom-0 bg-white/50 flex items-center justify-center text-center'>
      <div className='modalContent max-w-lg w-[90vw] bg-svBlue p-6 rounded-lg text-white'>
        <div className='modalHeader p-2.5'>
          <h1 className='modalTitle  mb-2 text-4xl font-bold text-center '>
            Gefeliciteerd!
          </h1>
        </div>
        <div className='modalBody p-2.5 text-lg'>
          <p>Je hebt een goed geheugen en alle kaartjes bij elkaar gevonden.</p>
          <p>In totaal had je {moves} beurten nodig.</p>
          <p>Heb je zin om nog een keertje te spelen?</p>
        </div>
        <div className='modalFooter'>
          <div
            className='difficultyButton border-svDarkBlue border-2 transition-all text-svDarkBlue'
            onClick={newGame}
          >
            <p>Start Nieuw Spel</p>
          </div>
        </div>
      </div>
    </div>
  );
}
