import { useEffect, useCallback, useRef } from 'react';

export const useFetch = (data, dispatch) => {
    useEffect(() => {
      dispatch({ type: 'FETCHING_BREACHES', fetching: true })
      fetch(
            `https://guard.io/v2/hiring/fe/breaches?offset=${data.offset}`,
            {method: 'GET',
            headers: {"X-Best-Pokemon": "Mewtwo"},
            })
        .then(data => data.json())
        .then(breaches => {
          dispatch({ type: 'STACK_BREACHES', breaches })
          dispatch({ type: 'FETCHING_BREACHES', fetching: false })
        })
        .catch(e => {
          // handle error
          dispatch({ type: 'FETCHING_BREACHES', fetching: false })
          return e;
        })
    }, [dispatch, data.page])
  }

export const useInfiniteScroll = (scrollRef, dispatch) => {
    const scrollObserver = useCallback(
      node => {
        new IntersectionObserver(entries => {
          entries.forEach(en => {
            if (en.intersectionRatio > 0) {
              dispatch({ type: 'ADVANCE_PAGE' });
            }
          });
        }).observe(node);
      },
      [dispatch]
    );
  
    useEffect(() => {
      if (scrollRef.current) {
        scrollObserver(scrollRef.current);
      }
    }, [scrollObserver, scrollRef]);
  }

  export const useLazyLoading = (breachSelector, items) => {
    const imgObserver = useCallback(node => {
      const intObs = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.intersectionRatio > 0) {
            const currentBreach = en.target;
            const newBreachSrc = currentBreach.dataset.src;
  
            // only swap out the image source if the new url exists
            if (!newBreachSrc) {
              console.error('Image source is invalid');
            } else {
              currentBreach.src = newBreachSrc;
            }
            intObs.unobserve(node);
          }
        });
      })
      intObs.observe(node);
    }, []);
  
    const breachesRef = useRef(null);
  
    useEffect(() => {
        breachesRef.current = document.querySelectorAll(breachSelector);
  
      if (breachesRef.current) {
        breachesRef.current.forEach(breach => imgObserver(breach));
      }
    }, [imgObserver, breachesRef, breachSelector, items])
  }