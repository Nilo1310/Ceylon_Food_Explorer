import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, REGIONS, REGION_INFO } from '../theme';
import { useFoods } from '../context/FoodContext';

export default function RegionsScreen({ navigation }) {
  const { foods } = useFoods();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Text style={styles.title}>Food by Region</Text>
      <FlatList
        data={REGIONS}
        keyExtractor={(r) => r}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => {
          const count = foods.filter((f) => f.region === item).length;
          const info = REGION_INFO[item];
          return (
            <Pressable style={styles.card} onPress={() => navigation.navigate('Explore', { region: item, stamp: Date.now() })}>
              <Text style={styles.emoji}>{info.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item}</Text>
                <Text style={styles.blurb}>{info.blurb}</Text>
              </View>
              <View style={styles.badge}><Text style={styles.badgeText}>{count}</Text></View>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  title: { fontSize: 24, fontWeight: '800', color: colors.primaryDark, paddingHorizontal: 16, paddingTop: 12 },
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: 14,
    padding: 16, marginBottom: 10, borderWidth: 1, borderColor: colors.border,
  },
  emoji: { fontSize: 36, marginRight: 14 },
  name: { fontSize: 17, fontWeight: '700', color: colors.text },
  blurb: { fontSize: 12, color: colors.muted, marginTop: 2 },
  badge: { backgroundColor: colors.primary, minWidth: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: '#fff', fontWeight: '800' },
});
