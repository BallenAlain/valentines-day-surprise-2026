import { useState } from 'react';
import p1 from './assets/1.png';
import p2 from './assets/2.png';
import p3 from './assets/3.png';
import p4 from './assets/4.png';
import p5 from './assets/5.png';
import p6 from './assets/6.gif';
import p7 from './assets/7.png';
import p8 from './assets/8.png';
import tongue from './assets/tongue.png';

const images = [
  p1,
  p3,
  p1,
  p5,
  p4,
  p2,
  p1,
  p4,
  p3,
  p6,
]

const noText = [
  'No',
  'Are you sure?',
  'No',
  'Are you sure?',
  'MEANIE',
  'You missed!',
  ':P',
  'STOOPID NOT ALLOWED',
  'STOOPID YOU GOT VIRUS 🦠',
  'brownie disapproves'
]

const itineraryItems = [
  'Explore St. Jacobs market & brunch',
  'Yummy meat @ Guelph for snack',
  'Buy some jollibee???',
  'Go home and make homemade fruit jam',
  'Exchange our little gifts',
  'Cuddle time',
  'Movie night????',
  'Tubing da next day'
]

function Firework({ delay }: { delay: number }) {
  const [position] = useState(() => ({
    left: Math.random() * 100,
    top: Math.random() * 80 + 10,
  }));

  return (
    <div
      className="absolute animate-ping"
      style={{
        left: `${position.left}%`,
        top: `${position.top}%`,
        animationDelay: `${delay}ms`,
        animationDuration: '1.5s',
      }}
    >
      <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
    </div>
  );
}

// Generate random images once outside component
const generateRandomImages = () => {
  const imgs = [];
  const imagePool = [p8, p2, p1];
  for (let i = 0; i < 40; i++) {
    imgs.push({
      src: imagePool[Math.floor(Math.random() * imagePool.length)],
      left: Math.random() * 90,
      top: Math.random() * 90,
      rotation: Math.random() * 360,
    });
  }
  return imgs;
};

export default function App() {
  const [seqNum, setSeqNum] = useState(0);
  const [height, setHeight] = useState(48);
  const [width, setWidth] = useState(100);
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const [imagePos, setImagePos] = useState({ x: 0, y: 0 });
  const [showImage, setShowImage] = useState(false);
  const [yes, setYes] = useState(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(itineraryItems.length).fill(false));
  const [randomImages] = useState(() => generateRandomImages());

  const handleNoClick = (e: React.MouseEvent) => {
    setWidth(width + 20);
    setHeight(height + 5);
    const newSeq = seqNum + 1;
    setSeqNum(newSeq);

    if (newSeq >= 2 && newSeq <= 9) {
      const offsetX = Math.random() > 0.5 ? Math.random() * 300 + 100 : -(Math.random() * 300 + 100);
      const offsetY = Math.random() > 0.5 ? Math.random() * 200 + 100 : -(Math.random() * 200 + 100);
      setButtonPos({ x: offsetX, y: offsetY });
    }

    if (newSeq === 6) {
      setImagePos({ x: e.clientX, y: e.clientY });
      setShowImage(true);
    }

    if (newSeq === 8) {
      alert("MEANIE BEAN MEANIE BEAN NOT ALLOWED NOT ALLOWED. YOU GOT THE TEENY CHEESY MEANIE BEANIE VIRUS")
    }
  }

  const getNoButtonStyle = () => {
    if (seqNum < 2) return {};
    
    return {
      position: 'relative' as const,
      left: `${buttonPos.x}px`,
      top: `${buttonPos.y}px`,
    };
  };

  const toggleItem = (index: number) => {
    const newChecked = [...checkedItems];
    newChecked[index] = !newChecked[index];
    setCheckedItems(newChecked);
  };

  if (yes) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-pink-500 flex items-center justify-center relative overflow-hidden">
        {/* Fireworks */}
        {Array.from({ length: 20 }).map((_, i) => (
          <Firework key={i} delay={i * 200} />
        ))}

        {/* Random scattered images */}
        {randomImages.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt="celebration"
            className="absolute w-20 h-20 object-cover rounded-lg opacity-70"
            style={{
              left: `${img.left}%`,
              top: `${img.top}%`,
              transform: `rotate(${img.rotation}deg)`,
            }}
          />
        ))}

        {/* Main content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 relative z-10">
          <div className="flex justify-center mb-6">
            <img
              src={p7}
              alt="Celebration!"
              className="w-48 h-48 object-cover rounded-2xl shadow-lg"
            />
          </div>
          
          <h1 className="text-4xl font-bold text-center text-pink-600 mb-2">
            YAYYY! 🎉
          </h1>
          <p className="text-center text-gray-700 mb-6 text-lg">
            Our Valentine's Day Itinerary
          </p>

          <div className="space-y-3">
            {itineraryItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors cursor-pointer"
                onClick={() => toggleItem(index)}
              >
                <input
                  type="checkbox"
                  checked={checkedItems[index]}
                  onChange={() => toggleItem(index)}
                  className="w-5 h-5 text-pink-600 rounded cursor-pointer"
                />
                <span className={`text-gray-800 ${checkedItems[index] ? 'line-through text-gray-400' : ''}`}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-2xl font-bold text-pink-600">I LOVE YOU! 💕</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-300 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-64 h-64 bg-pink-200 rounded-lg flex items-center justify-center">
          <img
            src={images[seqNum]}
            alt="help!"
            className="w-64 h-64 rounded-lg object-cover"
          />
        </div>
        <p className="mt-4 text-pink-600 text-2xl font-bold">Will you be my Ballentine?</p>
        <div className="flex gap-4 mt-6 relative">
          <button 
            className={`bg-green-500 hover:bg-green-600 disabled:hover:bg-red-400 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-colors hover:cursor-pointer`} 
            style={{ width: `${width}px`, height: `${height}px` }}
            onClick={() => {setYes(true)}}
          >
            Yes
          </button>
          <button
            className="bg-red-500 max-h-12 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:not-disabled:bg-red-600"
            onClick={handleNoClick}
            disabled={seqNum === 9}
            style={getNoButtonStyle()}
          >
            {noText[seqNum]}
          </button>
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-colors hover:cursor-pointer" 
            onClick={() => { setWidth(100); setHeight(48); setSeqNum(0); setShowImage(false); setButtonPos({ x: 0, y: 0 }); }}
          >
            reset
          </button>
        </div>
        
        {seqNum === 2 && (
          <p className="text-pink-700 font-semibold mt-2">Did u click da wrong button?</p>
        )}
      </div>

      {showImage && (
        <img
          src={tongue}
          alt="You missed!"
          className="w-32 h-32 rounded-lg object-cover fixed pointer-events-none"
          style={{ left: `${imagePos.x - 64}px`, top: `${imagePos.y - 64}px` }}
        />
      )}
    </div>
  );
}