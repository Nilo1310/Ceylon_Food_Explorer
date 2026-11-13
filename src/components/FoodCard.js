import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { useFoods } from '../context/FoodContext';

export default function FoodCard({ food, onPress }) {
  const { favorites, toggleFavorite } = useFoods();
  const isFav = favorites.includes(food.id);

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.emojiBox}>
        <Text style={styles.emoji}>{food.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{food.name}</Text>
        <Text style={styles.meta}>{food.category} · {food.region}</Text>
        <View style={styles.row}>
          <Text style={styles.spice}>{'🌶️'.repeat(food.spice)}</Text>
          <Text style={styles.price}>Rs. {food.price}</Text>
          {food.veg && <Text style={styles.veg}>VEG</Text>}
        </View>
      </View>
      <Pressable onPress={() => toggleFavorite(food.id)} hitSlop={10}>
        <Ionicons name={isFav ? 'heart' : 'heart-outline'} size={24} color={isFav ? colors.danger : colors.muted} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card,
    borderRadius: 14, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: colors.border,
  },
  emojiBox: {
    width: 60, height: 60, borderRadius: 14, backgroundColor: '#FFF1DC',
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  emoji: { fontSize: 32 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '700', color: colors.text },
  meta: { fontSize: 12, color: colors.muted, marginTop: 2 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  spice: { fontSize: 11, marginRight: 10 },
  price: { fontSize: 13, color: colors.primary, fontWeight: '700', marginRight: 10 },
  veg: {
    fontSize: 10, fontWeight: '800', color: colors.primary, borderWidth: 1,
    borderColor: colors.primary, borderRadius: 4, paddingHorizontal: 4,
  },
});
