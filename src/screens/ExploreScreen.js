import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TextInput, FlatList, ScrollView, Switch, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, CATEGORIES, REGIONS } from '../theme';
import { useFoods } from '../context/FoodContext';
import { filterFoods } from '../utils/filters';
import FoodCard from '../components/FoodCard';
import Chip from '../components/Chip';

export default function ExploreScreen({ navigation, route }) {
  const { foods } = useFoods();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [region, setRegion] = useState('All');
  const [vegOnly, setVegOnly] = useState(false);
  const [maxSpice, setMaxSpice] = useState(3);

  // Apply filters sent from Home / Regions screens.
  useEffect(() => {
    const p = route.params;
    if (!p) return;
    setQuery(p.query ?? '');
    setCategory(p.category ?? 'All');
    setRegion(p.region ?? 'All');
  }, [route.params]);

  const results = useMemo(
    () => filterFoods(foods, { query, category, region, vegOnly, maxSpice }),
    [foods, query, category, region, vegOnly, maxSpice]
  );

  const clearAll = () => {
    setQuery(''); setCategory('All'); setRegion('All'); setVegOnly(false); setMaxSpice(3);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color={colors.muted} />
          <TextInput
            style={styles.input}
            placeholder="Search name, ingredient, region..."
            value={query}
            onChangeText={setQuery}
          />
          {!!query && (
            <Pressable onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.muted} />
            </Pressable>
          )}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
          {['All', ...CATEGORIES].map((c) => (
            <Chip key={c} label={c} active={category === c} onPress={() => setCategory(c)} />
          ))}
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
          {['All', ...REGIONS].map((r) => (
            <Chip key={r} label={r} active={region === r} onPress={() => setRegion(r)} />
          ))}
        </ScrollView>

        <View style={styles.optionsRow}>
          <View style={styles.switchRow}>
            <Switch value={vegOnly} onValueChange={setVegOnly} trackColor={{ true: colors.primary }} />
            <Text style={styles.optText}>Vegetarian</Text>
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.optText}>Max spice: </Text>
            {[1, 2, 3].map((n) => (
              <Pressable key={n} onPress={() => setMaxSpice(n)} style={[styles.spiceBtn, maxSpice === n && styles.spiceActive]}>
                <Text style={[styles.spiceText, maxSpice === n && { color: '#fff' }]}>{n}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.countRow}>
          <Text style={styles.count}>{results.length} dish{results.length === 1 ? '' : 'es'} found</Text>
          <Pressable onPress={clearAll}><Text style={styles.clear}>Clear filters</Text></Pressable>
        </View>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingTop: 4 }}
        renderItem={({ item }) => (
          <FoodCard food={item} onPress={() => navigation.navigate('FoodDetail', { id: item.id })} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={{ fontSize: 48 }}>🍽️</Text>
            <Text style={styles.emptyText}>No dishes match your search.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: 16, paddingTop: 8 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: 12,
    paddingHorizontal: 12, borderWidth: 1, borderColor: colors.border,
  },
  input: { flex: 1, paddingVertical: 12, paddingHorizontal: 8, fontSize: 15 },
  chips: { marginTop: 10, flexGrow: 0 },
  optionsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  switchRow: { flexDirection: 'row', alignItems: 'center' },
  optText: { fontSize: 13, color: colors.text, marginLeft: 4 },
  spiceBtn: {
    width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center', marginLeft: 6, backgroundColor: colors.card,
  },
  spiceActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  spiceText: { fontWeight: '700', color: colors.text },
  countRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 },
  count: { color: colors.muted, fontSize: 13 },
  clear: { color: colors.primary, fontWeight: '700', fontSize: 13 },
  empty: { alignItems: 'center', marginTop: 50 },
  emptyText: { color: colors.muted, marginTop: 8 },
});
