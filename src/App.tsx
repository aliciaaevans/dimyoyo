import { Field, Label, Switch } from '@headlessui/react';
import DimensionViews from './components/DimensionViews';
import YoyoTable from './components/YoyoTable';
import useYoyoReducer from './hooks/useYoyoReducer';
import useStoreLocally from './hooks/useStoreLocally';

function App() {
  const [storeLocally, setStoreLocally] = useStoreLocally();
  const [yoyos, dispatch] = useYoyoReducer(storeLocally);

  return (
    <>
      <Field>
        <Switch
          checked={storeLocally}
          onChange={setStoreLocally}
          className="ml-4 mt-4 mr-2 group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-500"
        >
          <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
        </Switch>
        <Label>Save to browser</Label>
      </Field>
      <h1 className="text-2xl font-bold text-center mt-4">🪀 DimYoyo: Yo-yo Dimension Comparison Tool 🪀</h1>
      <YoyoTable dispatch={dispatch} yoyos={yoyos} />
      <DimensionViews yoyos={yoyos}></DimensionViews>
    </>
  );
}

export default App;
