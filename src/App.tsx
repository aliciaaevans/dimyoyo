import { useState } from 'react';
import DimensionViews from './components/DimensionViews';
import YoyoTable from './components/YoyoTable';
import Yoyo from './types/Yoyo';

function App() {
  const [yoyos, setYoyos] = useState<Yoyo[]>([]);

  const updateYoyo = (yoyo: Yoyo) => {
    // Map old array to new array with replaced yoyo
    let found: boolean = false;

    const newYoyos: Yoyo[] = yoyos.map<Yoyo>((item) => {
      if (yoyo.id === item.id) {
        found = true;
        return yoyo;
      } else {
        return item;
      }
    });
    if (!found) newYoyos.push(yoyo);
    setYoyos(newYoyos);
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-4">🪀 DimYoyo: Yo-yo Dimension Comparison Tool 🪀</h1>
      <YoyoTable updateYoyo={updateYoyo} yoyos={yoyos} />
      <DimensionViews yoyos={yoyos}></DimensionViews>
    </>
  );
}

export default App;
