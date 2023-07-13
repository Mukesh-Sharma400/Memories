import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";

const DEBOUNCE_SAVE_DELAY_MS = 1000;

export default function useAutosave(dataToSave) {
  const [data, setData] = useState(dataToSave);

  const saveData = useCallback((newData) => {
    window.localStorage.setItem("autosaveData", JSON.stringify(newData));
    setData(newData);
    console.log(newData);
  }, []);
  // eslint-disable-next-line
  const debouncedSave = useCallback(
    debounce(async (newData) => {
      saveData(newData);
    }, DEBOUNCE_SAVE_DELAY_MS),
    []
  );

  useEffect(() => {
    if (data) {
      debouncedSave(data);
    }
  }, [data, debouncedSave]);

  return [data, setData];
}
