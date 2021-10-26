import React, { memo, useState, useCallback, useEffect } from 'react'
import Api from '../../api'
import Board from './components/Board'
import Panel from './components/Panel'
import { ContainerStyled, Container } from './style'
import COUNTRIES from '../../commons/constants/countries'

function Main() {
  const [data, setData] = useState({})
  const [dataWorld, setDataWorld] = useState({})
  const [country, setCountry] = useState('brazil')
  const [paiz, setPaiz] = useState('Brasil')
  const updateAt = new Date().toLocaleString()

  const getCovidData = useCallback((country) => {
    Api.getCountry(country)
      .then(data => setData(data))    
  }, [])

  useEffect(() => {    
    getCovidData(country)
    setPaiz(selecionaCountries(country));
  }, [getCovidData, country])

  useEffect(() => {
    Api.getWorld()
      .then(data=>setDataWorld(data))    
  }, [])

  const handleChange = ({ target }) => {
    const country = target.value
    setCountry(country)
  }

  const selecionaCountries = function(countr) {
    let pais = COUNTRIES.filter( (item, arr) => item.value === countr )
    return pais[0].label;
  }

  return (
    <ContainerStyled>
      <Container>
        <h1>Dados Mundial</h1>
        <Board data={dataWorld} />
      </Container>

      <div className="mb-2">
        <Panel
          data={data}
          updateAt={updateAt}
          onChange={handleChange}
          country={country}
          getCovidData={getCovidData}
        />
      </div>
      <Container>
        <h1>Dados - {paiz}</h1>
        <Board data={data} />      
      </Container>
      
      
    </ContainerStyled>
    // <div>
    //   Main
    // </div>
  )
}

export default memo(Main)