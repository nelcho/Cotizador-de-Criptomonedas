import { useEffect, useState } from 'react'
import styled from "@emotion/styled"
import Error from './Error'
import useSelectMonedas from "../hooks/useSelectMonedas"
import {monedas} from "../data/monedas"

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFFFFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {

    const [error, setError] = useState(false)
  
    const [criptos, setCriptos] = useState([])
  
    const [moneda, SelectMonedas] = useSelectMonedas("Elige tu Moneda", monedas)
  
    const [criptoMoneda, SelectCriptoMonedas] = useSelectMonedas("Elige tu Cripto Moneda", criptos)

    useEffect(() => {
        const consultarAPI = async () => {
          const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=50&tsym=USD"
          const respuesta = await fetch(url)
          const resultado = await respuesta.json()
    
          const arrayCriptos = resultado.Data.map(cripto => {
            const objeto = {
              id: cripto.CoinInfo.Name,
              nombre: cripto.CoinInfo.FullName
            }
            return objeto
          })
          setCriptos(arrayCriptos)
        }
        consultarAPI()
      }, [])

      const validarFormulario = evento => {
        evento.preventDefault()
        if([moneda, criptoMoneda].includes("")) {
          setError(true)
          return
        }
        setError(false)
        setMonedas({moneda, criptoMoneda})
      }
    
      return (
        <>
        {error && <Error>Todos los Campos son Obligatorios</Error>}
    
        <form onSubmit={validarFormulario} >
          
          <SelectMonedas/>
          
          <SelectCriptoMonedas/>
           
          <InputSubmit type="submit" value="Cotizar" />
        </form>
        </>
      )
    }

export default Formulario
