// Pure helpers so the logic is easy to test.
export function filterFoods(foods, { query = '', category = 'All', region = 'All', vegOnly = false, maxSpice = 3 } = {}) {
  const q = query.trim().toLowerCase();
  return foods.filter((f) => {
    if (category !== 'All' && f.category !== category) return false;
    if (region !== 'All' && f.region !== region) return false;
    if (vegOnly && !f.veg) return false;
    if (f.spice > maxSpice) return false;
    if (!q) return true;
    const haystack = [f.name, f.description, f.category, f.region, ...(f.ingredients || [])]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function dishOfTheDay(foods, date = new Date()) {
  if (!foods.length) return null;
  const dayNumber = Math.floor(date.getTime() / 86400000);
  return foods[dayNumber % foods.length];
}

export function spiceLabel(level) {
  return ['', 'Mild', 'Medium', 'Hot'][level] || 'Mild';
}
