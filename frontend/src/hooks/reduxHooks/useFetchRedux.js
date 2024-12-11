import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useFetchRedux = ({ sliceName, fetchFunction }) => {
  const dispatch = useDispatch();

  // Dynamically access the slice state
  const fetchedData = useSelector((state) => state[sliceName]?.sections);
  const status = useSelector((state) => state[sliceName]?.status);
  const error = useSelector((state) => state[sliceName]?.error);

  useEffect(() => {
    if (status === 'idle') {
      console.log(fetchedData);
      // console.log('Dispatching fetch function...');
      dispatch(fetchFunction()); // Invoke the function here
      
      
    }
  }, [dispatch, status, fetchFunction]);

  // console.log('Sections:', sections);
  // console.log('Status:', status);
  // console.log('Error:', error);

  return { fetchedData, status, error };
};
