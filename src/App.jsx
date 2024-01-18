import { useEffect, useState } from 'react'
import { formatearDinero, calcularTotalPagar, cacularMensual } from './helpers/index.js'

function App() {

  const [ cantidad, setCantidad ] = useState(10000);
  const [plazo, setPlazo] = useState(6)
  const [total, setTotal] = useState(0)
  const [mensual, setMensual] = useState(0)

  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  function handleClickDecremento() {
    const valor = cantidad - STEP;
    

    if(cantidad <= 0){
      alert('Cantidad no Valida')
      return
    }

    setCantidad(valor)
  }

  function handleClickIncremento() {
    const valor = cantidad + STEP;

    if(cantidad >= 20000){
      alert('Cantidad no Valida')
      return
    }

    setCantidad(valor)
  }

  useEffect(() => {
      const totalC = calcularTotalPagar(cantidad, plazo)
      setTotal(totalC)

  }, [cantidad, plazo])

  useEffect(() => {
    const definitivo = cacularMensual(total, plazo)
    setMensual(definitivo)


    console.log('total')
}, [cantidad, plazo, total])

  return (
    <div className='my-20 bg-white max-w-lg m-auto rounded-md shadow p-10'>
        <h1 className='my-5 text-center text-4xl text-gray-500 font-extrabold'>
          Cuanto <span className='text-indigo-600'>Dinero</span> Necesitas ?
        </h1>

        <div className='flex justify-between my-6'>
            <button
              type='button'
              className='h-10 w-10 flex justify-center items-center text-white bg-lime-400 font-bold text-2xl rounded-full hover:outline-none hover:ring-2 hover:ring-offset-2 hover:bg-lime-500'
              onClick={handleClickDecremento}
            >
              -
            </button>
            <button
              type='button'
              className='h-10 w-10 flex justify-center items-center text-white bg-lime-400 font-bold text-2xl rounded-full hover:outline-none hover:ring-2 hover:ring-offset-2 hover:bg-lime-500'
              onClick={handleClickIncremento}
            >
              +
            </button>
        </div>

        <input 
          type="range" 
          className='w-full bg-gray-200 h-6 accent-lime-500 hover:accent-lime-600'
          onChange={e => setCantidad(+e.target.value)}
          min={MIN}
          max={MAX}
          value={cantidad}   
          step={STEP}
        />

        <p className='text-center my-10 text-5xl font-extrabold text-indigo-600'>{formatearDinero(cantidad)}</p>

        <h2 className='text-center text-2xl text-gray-500 font-extrabold'>
          Elige un <span className='text-indigo-600'>Plazo</span> a pagar
        </h2>

        <select
          className='mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg font-bold text-center text-xl text-gray-500'
          onChange={e => setPlazo(+e.target.value)}
          value={plazo}
        >
          <option value="6">6 Meses</option>
          <option value="12">12 Meses</option>
          <option value="24">24 Meses</option>
        </select>

        <div className='my-5 space-y-3 p-5 bg-gray-50'>
          <h2 className='text-center text-2xl text-gray-500 font-extrabold'>
            Resumen <span className='text-indigo-600'>de pagos</span>
          </h2>

          <p className='text-xl text-center text-gray-500 font-bold'>{plazo} Meses</p>
          <p className='text-xl text-center text-gray-500 font-bold'> {formatearDinero(total)} Total a pagar</p>
          <p className='text-xl text-center text-gray-500 font-bold'> {formatearDinero(mensual)} Mensuales</p>
        </div>
    </div>
  )
}

export default App
