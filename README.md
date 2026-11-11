# Ceylon Food Explorer 🇱🇰

An offline React Native (Expo) guide to Sri Lankan food. ICA 03 individual project.

## Run it
```bash
npm install                # package.json pins compatible versions - do NOT run `expo install --fix` or upgrade packages
npx expo start             # scan the QR code with Expo Go, or press a (Android) / i (iOS) / w (web browser)
# or run directly in the browser:  npm run web
```

## Requirements checklist
| Requirement | Where |
|---|---|
| 5+ screens | Home, Explore, Regions, Favorites, About, Food Detail, Add Dish (7) |
| Navigation | Bottom tabs + native stack (`App.js`) |
| Own dataset, stored locally | `src/data/foods.js` seeded into AsyncStorage (`src/storage/storage.js`) |
| Dynamic display of stored data | All screens read from `FoodContext` which loads from AsyncStorage |
| Search / filter / detail | Explore screen (text, category, region, veg, spice) + Detail screen |
| Works offline | No APIs, no network images (emoji icons), data stored on device |

## Folder structure
```
App.js
src/
  data/foods.js          18-dish dataset
  storage/storage.js     AsyncStorage helpers
  context/FoodContext.js app-wide state (foods, favourites)
  utils/filters.js       search/filter logic
  components/            FoodCard, Chip
  screens/               7 screens
  theme.js               colours, categories, regions
```

## Git
```bash
git init
git add .
git commit -m "Initial commit: Ceylon Food Explorer"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
