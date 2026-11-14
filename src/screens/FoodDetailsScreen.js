import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { useFoods } from '../context/FoodContext';
import { spiceLabel } from '../utils/filters';
import { confirmAction } from '../utils/dialog';

export default function FoodDetailScreen({ route, navigation }) {
  const { foods, favorites, toggleFavorite, deleteFood } = useFoods();
  const food = foods.find((f) => f.id === route.params.id);

  if (!food) {
    return <View style={styles.center}><Text>Dish not found.</Text></View>;
  }

  const isFav = favorites.includes(food.id);

  const confirmDelete = () =>
    confirmAction('Delete dish', `Remove "${food.name}" from your device?`, 'Delete', () => {
      deleteFood(food.id);
      navigation.goBack();
    });

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>{food.emoji}</Text>
        <Text style={styles.name}>{food.name}</Text>
        <Text style={styles.sub}>{food.category} · {food.region}</Text>
        <Text style={styles.rating}>⭐ {Number(food.rating).toFixed(1)}</Text>
      </View>

      <View style={styles.infoRow}>
        <Info icon="flame-outline" label="Spice" value={spiceLabel(food.spice)} />
        <Info icon="cash-outline" label="Price" value={`Rs. ${food.price}`} />
        <Info icon="nutrition-outline" label="Calories" value={`${food.calories}`} />
        <Info icon="time-outline" label="Time" value={food.time} />
      </View>

      <View style={styles.body}>
        <Text style={styles.vegTag}>{food.veg ? '🌱 Vegetarian' : '🍗 Contains meat or seafood'}</Text>

        <Text style={styles.heading}>About</Text>
        <Text style={styles.text}>{food.description}</Text>

        <Text style={styles.heading}>Ingredients</Text>
        {food.ingredients.map((ing, i) => (
          <Text key={i} style={styles.text}>• {ing}</Text>
        ))}

        <Text style={styles.heading}>How it is made</Text>
        {food.steps.map((s, i) => (
          <View key={i} style={styles.stepRow}>
            <View style={styles.stepNum}><Text style={styles.stepNumText}>{i + 1}</Text></View>
            <Text style={[styles.text, { flex: 1 }]}>{s}</Text>
          </View>
        ))}

        <Pressable style={[styles.favBtn, isFav && { backgroundColor: colors.danger }]} onPress={() => toggleFavorite(food.id)}>
          <Ionicons name={isFav ? 'heart' : 'heart-outline'} size={20} color="#fff" />
          <Text style={styles.favText}>{isFav ? 'Remove from favourites' : 'Add to favourites'}</Text>
        </Pressable>

        {food.custom && (
          <Pressable style={styles.delBtn} onPress={confirmDelete}>
            <Text style={styles.delText}>Delete this dish</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}

function Info({ icon, label, value }) {
  return (
    <View style={styles.info}>
      <Ionicons name={icon} size={22} color={colors.primary} />
      <Text style={styles.infoValue}>{value}</Text>
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hero: { backgroundColor: '#FFF1DC', alignItems: 'center', paddingVertical: 28 },
  heroEmoji: { fontSize: 80 },
  name: { fontSize: 24, fontWeight: '800', color: colors.text, marginTop: 8, textAlign: 'center', paddingHorizontal: 16 },
  sub: { color: colors.muted, marginTop: 4 },
  rating: { marginTop: 6, fontWeight: '700', color: colors.accent },
  infoRow: { flexDirection: 'row', padding: 12 },
  info: {
    flex: 1, alignItems: 'center', backgroundColor: colors.card, borderRadius: 12, paddingVertical: 10,
    marginHorizontal: 4, borderWidth: 1, borderColor: colors.border,
  },
  infoValue: { fontWeight: '700', color: colors.text, marginTop: 4, fontSize: 13 },
  infoLabel: { fontSize: 11, color: colors.muted },
  body: { paddingHorizontal: 16 },
  vegTag: { fontWeight: '700', color: colors.primary, marginTop: 4 },
  heading: { fontSize: 18, fontWeight: '800', color: colors.primaryDark, marginTop: 18, marginBottom: 6 },
  text: { fontSize: 14, color: colors.text, lineHeight: 21, marginBottom: 2 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  stepNum: {
    width: 24, height: 24, borderRadius: 12, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center', marginRight: 10, marginTop: 2,
  },
  stepNumText: { color: '#fff', fontWeight: '800', fontSize: 12 },
  favBtn: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary,
    padding: 14, borderRadius: 12, marginTop: 24,
  },
  favText: { color: '#fff', fontWeight: '700', marginLeft: 8 },
  delBtn: { padding: 14, alignItems: 'center', marginTop: 10 },
  delText: { color: colors.danger, fontWeight: '700' },
});
