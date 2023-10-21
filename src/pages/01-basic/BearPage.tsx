import { useShallow } from 'zustand/react/shallow';
import { WhiteCard } from '../../components';
import { useBearsStore } from '../../stores/bears/bears.store';

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <BlackBears />

        <PolarBears />

        <PandaBears />

        <BearsDisplay />
      </div>
    </>
  );
};

export const BlackBears = () => {
  // Refactorización:
  // No solo por motivos de legibilidad. También hace que solo
  // se renderice este componente en vez de todo el componente BearPage.

  // Consumir el store.
  // Notar que NO hacemos desestructuración.
  // Se puede hacer pero la documentación NO lo recomienda.
  const blackBears = useBearsStore((state) => state.blackBears);
  const increaseBlackBears = useBearsStore((state) => state.increaseBlackBears);

  // Si hacemos la desestructuración veremos que funciona pero tiene un problema:
  // useBearsStore((state) => state) usa TODO el estado por lo que, cuando
  // cambia el estado de otro oso se renderiza también el BlackBear.
  //
  // const { blackBears, increaseBlackBears } = useBearsStore((state) => state);
  //
  // La desestructuración sigue siendo posible con la técnica de useShallow, pero
  // no merece la pena.
  // useShallow lo veremos más adelante.

  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increaseBlackBears(+1)}> +1 </button>
        <span className="text-3xl mx-2 lg:mx-10"> {blackBears} </span>
        <button onClick={() => increaseBlackBears(-1)}> -1 </button>
      </div>
    </WhiteCard>
  );
};

export const PolarBears = () => {
  const polarBears = useBearsStore((state) => state.polarBears);
  const increasePolarBears = useBearsStore((state) => state.increasePolarBears);

  return (
    <WhiteCard centered>
      <h2>Osos Polares</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePolarBears(+1)}> +1 </button>
        <span className="text-3xl mx-2 lg:mx-10"> {polarBears} </span>
        <button onClick={() => increasePolarBears(-1)}> -1 </button>
      </div>
    </WhiteCard>
  );
};

export const PandaBears = () => {
  const pandaBears = useBearsStore((state) => state.pandaBears);
  const increasePandaBears = useBearsStore((state) => state.increasePandaBears);

  return (
    <WhiteCard centered>
      <h2>Osos Pandas</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePandaBears(+1)}> +1 </button>
        <span className="text-3xl mx-2 lg:mx-10"> {pandaBears} </span>
        <button onClick={() => increasePandaBears(-1)}> -1 </button>
      </div>
    </WhiteCard>
  );
};

export const BearsDisplay = () => {
  // doNothing crea un nuevo arreglo en memoria con la misma
  // información de bears, es decir, no cambia el estado.
  //
  // useShallow analiza las propiedades del objeto bears y confirmará si realmente
  // cambiaron. Si cambian se renderiza el componente. Si no cambiaron no lanza
  // el re-render.
  const bears = useBearsStore(useShallow((state) => state.bears));
  const doNothing = useBearsStore((state) => state.doNothing);

  const addBear = useBearsStore((state) => state.addBear);
  const clearBears = useBearsStore((state) => state.clearBears);

  return (
    <WhiteCard>
      <h1>Osos</h1>
      <button onClick={doNothing}>No hace nada</button>
      <button className="mt-2" onClick={addBear}>
        Agregar Oso
      </button>
      <button className="mt-2" onClick={clearBears}>
        Borrar Osos
      </button>

      <pre>{JSON.stringify(bears, null, 2)}</pre>
    </WhiteCard>
  );
};
