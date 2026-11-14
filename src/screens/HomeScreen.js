import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, CATEGORIES } from '../theme';
import { useFoods } from '../context/FoodContext';
import { dishOfTheDay } from '../utils/filters';

export default function HomeScreen({ navigation }) {
  const { foods, favorites } = useFoods();
  const [query, setQuery] = useState('');
  const featured = dishOfTheDay(foods);
  const topRated = [...foods].sort((a, b) => b.rating - a.rating).slice(0, 6);

  const search = () => navigation.navigate('Explore', { query: query.trim(), stamp: Date.now() });

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.hello}>Ayubowan! 🙏</Text>
        <Text style={styles.title}>Ceylon Food Explorer</Text>
        <Text style={styles.sub}>Discover the flavours of Sri Lanka, even offline.</Text>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color={colors.muted} />
          <TextInput
            style={styles.input}
            placeholder="Search dishes or ingredients..."
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={search}
            returnKeyType="search"
          />
        </View>

        <View style={styles.statsRow}>
          <Stat label="Dishes" value={foods.length} />
          <Stat label="Regions" value={6} />
          <Stat label="Favourites" value={favorites.length} />
        </View>

        {featured && (
          <>
            <Text style={styles.section}>Dish of the day</Text>
            <Pressable style={styles.featured} onPress={() => navigation.navigate('FoodDetail', { id: featured.id })}>
              <Text style={styles.featEmoji}>{featured.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.featName}>{featured.name}</Text>
                <Text style={styles.featDesc} numberOfLines={3}>{featured.description}</Text>
              </View>
            </Pressable>
          </>
        )}

        <Text style={styles.section}>Browse by category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map((c) => (
            <Pressable key={c} style={styles.catBtn} onPress={() => navigation.navigate('Explore', { category: c, stamp: Date.now() })}>
              <Text style={styles.catText}>{c}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.section}>Top rated</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topRated.map((f) => (
            <Pressable key={f.id} style={styles.topCard} onPress={() => navigation.navigate('FoodDetail', { id: f.id })}>
              <Text style={{ fontSize: 36 }}>{f.emoji}</Text>
              <Text style={styles.topName} numberOfLines={2}>{f.name}</Text>
              <Text style={styles.topRating}>⭐ {f.rating.toFixed(1)}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ label, value }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, paddingBottom: 30 },
  hello: { fontSize: 15, color: colors.muted },
  title: { fontSize: 28, fontWeight: '800', color: colors.primaryDark, marginTop: 2 },
  sub: { fontSize: 14, color: colors.muted, marginBottom: 14 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: 12,
    paddingHorizontal: 12, borderWidth: 1, borderColor: colors.border,
  },
  input: { flex: 1, paddingVertical: 12, paddingHorizontal: 8, fontSize: 15 },
  statsRow: { flexDirection: 'row', marginTop: 14 },
  stat: {
    flex: 1, backgroundColor: colors.primary, borderRadius: 12, padding: 12,
    alignItems: 'center', marginRight: 8,
  },
  statValue: { color: '#fff', fontSize: 22, fontWeight: '800' },
  statLabel: { color: '#D8F0E2', fontSize: 12 },
  section: { fontSize: 18, fontWeight: '700', color: colors.text, marginTop: 20, marginBottom: 10 },
  featured: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF1DC', borderRadius: 16,
    padding: 16, borderWidth: 1, borderColor: colors.accent,
  },
  featEmoji: { fontSize: 52, marginRight: 14 },
  featName: { fontSize: 18, fontWeight: '800', color: colors.text },
  featDesc: { fontSize: 13, color: colors.muted, marginTop: 4 },
  catBtn: {
    backgroundColor: colors.accent, paddingHorizontal: 18, paddingVertical: 10,
    borderRadius: 22, marginRight: 8,
  },
  catText: { color: '#fff', fontWeight: '700' },
  topCard: {
    width: 120, backgroundColor: colors.card, borderRadius: 14, padding: 12, marginRight: 10,
    alignItems: 'center', borderWidth: 1, borderColor: colors.border,
  },
  topName: { fontSize: 13, fontWeight: '700', textAlign: 'center', marginTop: 6, color: colors.text },
  topRating: { fontSize: 12, color: colors.muted, marginTop: 4 },
});
