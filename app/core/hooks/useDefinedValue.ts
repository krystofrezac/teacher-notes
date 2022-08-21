import { useEffect, useState } from 'react';

/**
 * Returns last not undefined/null value
 */
const useDefinedValue = <T>(value: T): T => {
  const [defined, setDefined] = useState(value);
  useEffect(() => {
    if (value) setDefined(value);
  }, [value]);

  return defined;
};

export default useDefinedValue;
