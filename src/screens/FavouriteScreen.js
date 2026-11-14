import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';
import { useFoods } from '../context/FoodContext';
import FoodCard from '../components/FoodCard';

export default function FavoritesScreen({ navigation }) {
  const { foods, favorites } = useFoods();
  const favFoods = foods.filter((f) => favorites.includes(f.id));

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Text style={styles.title}>My Favourites</Text>
      <FlatList
        data={favFoods}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <FoodCard food={item} onPress={() => navigation.navigate('FoodDetail', { id: item.id })} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={{ fontSize: 48 }}>💚</Text>
            <Text style={styles.emptyText}>No favourites yet. Tap the heart on any dish to save it here.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  title: { fontSize: 24, fontWeight: '800', color: colors.primaryDark, paddingHorizontal: 16, paddingTop: 12 },
  empty: { alignItems: 'center', marginTop: 60, paddingHorizontal: 30 },
  emptyText: { color: colors.muted, marginTop: 8, textAlign: 'center' },
});
