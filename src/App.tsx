import DimensionViews from './components/DimensionViews';
import YoyoTable from './components/YoyoTable';
import useYoyoReducer from './hooks/useYoyoReducer';

function App() {
  const [yoyos, dispatch] = useYoyoReducer();

  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-4">🪀 DimYoyo: Yo-yo Dimension Comparison Tool 🪀</h1>
      <YoyoTable dispatch={dispatch} yoyos={yoyos} />
      <DimensionViews yoyos={yoyos}></DimensionViews>
    </>
  );
}

export default App;
