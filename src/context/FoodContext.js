import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { loadFoods, saveFoods, loadFavorites, saveFavorites, resetAll } from '../storage/storage';
import seedFoods from '../data/foods';

const FoodContext = createContext(null);

export function FoodProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [f, favs] = await Promise.all([loadFoods(), loadFavorites()]);
      setFoods(f);
      setFavorites(favs);
      setLoading(false);
    })();
  }, []);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      saveFavorites(next);
      return next;
    });
  }, []);

  const addFood = useCallback((food) => {
    setFoods((prev) => {
      const next = [{ ...food, id: 'u' + Date.now(), custom: true, rating: 4.0 }, ...prev];
      saveFoods(next);
      return next;
    });
  }, []);

  const deleteFood = useCallback((id) => {
    setFoods((prev) => {
      const next = prev.filter((f) => f.id !== id);
      saveFoods(next);
      return next;
    });
    setFavorites((prev) => {
      const next = prev.filter((x) => x !== id);
      saveFavorites(next);
      return next;
    });
  }, []);

  const resetData = useCallback(async () => {
    await resetAll();
    setFoods(seedFoods);
    setFavorites([]);
    await saveFoods(seedFoods);
  }, []);

  return (
    <FoodContext.Provider value={{ foods, favorites, loading, toggleFavorite, addFood, deleteFood, resetData }}>
      {children}
    </FoodContext.Provider>
  );
}

export const useFoods = () => useContext(FoodContext);
