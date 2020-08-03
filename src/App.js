import React, { useState, useRef, useReducer } from 'react';
import ReactDOM from "react-dom";
import styled from 'styled-components';
import { useFetch, useInfiniteScroll, useLazyLoading } from './hooks/useHook';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme/theme';
import { GlobalStyles } from './global';
import Breach from './components/Breach';

const Container = styled.div`
  font-family: "Benton Sans",Helvetica,Sans-serif;
  display: flex;
  flex-wrap: wrap;
`

const ThemeButton =  styled.button`
    margin: 10px;
    font-weight: 600;
    border-radius: 6px;
    color: #222;
    background-color: #fff;
    padding: 0.375em 0.5em 0.1875em;
    text-decoration: none;
`

function App() {
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState(darkModeMediaQuery);
    const toggleTheme = () => {
      if (theme === 'light') {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    }

    const breachReducer = (state, action) => {
      switch (action.type) {
        case 'STACK_BREACHES':
          return { ...state, breaches: state.breaches.concat(action.breaches) }
        case 'FETCHING_BREACHES':
          return { ...state, fetching: action.fetching }
        default:
          return state;
      }
    }

    const offsetReducer = (state, action) => {
      switch (action.type) {
        case 'ADVANCE_PAGE':
          return { ...state, offset: state.offset + 10 }
        default:
          return state;
      }
    }

    const [offseter, offsetDispatch] = useReducer(offsetReducer, { offset: 0 })
    const [breachData, breachDispatch] = useReducer(breachReducer, { breaches: [], fetching: true, })

    let bottomBoundaryRef = useRef(null);
    useFetch(offseter, breachDispatch);
    useLazyLoading('.card-img-top', breachData.breaches)
    useInfiniteScroll(bottomBoundaryRef, offsetDispatch);
    
    return(
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <ThemeButton onClick={toggleTheme}>Toggle theme</ThemeButton>
      <Container >
        {breachData.fetching === false && <Breach breaches={breachData.breaches[0].items} />}
      </Container>
    </>
    </ThemeProvider>
    
    );

};

ReactDOM.render(<App />, document.getElementById("root"));