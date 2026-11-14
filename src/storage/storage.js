import AsyncStorage from '@react-native-async-storage/async-storage';
import seedFoods from '../data/foods';

const FOODS_KEY = 'cfe_foods_v1';
const FAVS_KEY = 'cfe_favorites_v1';

// On first launch the bundled dataset is copied into local storage.
// After that, all data is read from AsyncStorage (works fully offline).
export async function loadFoods() {
  try {
    const raw = await AsyncStorage.getItem(FOODS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('loadFoods failed, reseeding', e);
  }
  await saveFoods(seedFoods);
  return seedFoods;
}

export async function saveFoods(foods) {
  await AsyncStorage.setItem(FOODS_KEY, JSON.stringify(foods));
}

export async function loadFavorites() {
  try {
    const raw = await AsyncStorage.getItem(FAVS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export async function saveFavorites(ids) {
  await AsyncStorage.setItem(FAVS_KEY, JSON.stringify(ids));
}

export async function resetAll() {
  await AsyncStorage.multiRemove([FOODS_KEY, FAVS_KEY]);
}
