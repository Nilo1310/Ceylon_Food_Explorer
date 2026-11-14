import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { useFoods } from '../context/FoodContext';
import { confirmAction } from '../utils/dialog';

export default function AboutScreen({ navigation }) {
  const { foods, resetData } = useFoods();
  const customCount = foods.filter((f) => f.custom).length;

  const confirmReset = () =>
    confirmAction('Reset data', 'This restores the original dishes and clears favourites and your added dishes.', 'Reset', resetData);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.logo}>🇱🇰</Text>
        <Text style={styles.title}>Ceylon Food Explorer</Text>
        <Text style={styles.version}>Version 1.0.0 · Works 100% offline</Text>

        <Text style={styles.text}>
          An offline guide to Sri Lankan cuisine. Browse dishes, search by name or ingredient, filter by category,
          region, spice level and diet, and save your favourites. All data is stored locally on your device.
        </Text>

        <View style={styles.box}>
          <Text style={styles.boxLine}>📚 Dishes in your guide: {foods.length}</Text>
          <Text style={styles.boxLine}>✍️ Dishes you added: {customCount}</Text>
        </View>

        <Pressable style={styles.btn} onPress={() => navigation.navigate('AddDish')}>
          <Ionicons name="add-circle-outline" size={20} color="#fff" />
          <Text style={styles.btnText}>Add your own dish</Text>
        </Pressable>

        <Pressable style={[styles.btn, { backgroundColor: colors.danger }]} onPress={confirmReset}>
          <Ionicons name="refresh-outline" size={20} color="#fff" />
          <Text style={styles.btnText}>Reset local data</Text>
        </Pressable>

        <Text style={styles.footer}>Built with React Native, Expo and React Navigation. ICA 03 Individual Project.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  logo: { fontSize: 64, textAlign: 'center', marginTop: 10 },
  title: { fontSize: 24, fontWeight: '800', textAlign: 'center', color: colors.primaryDark },
  version: { textAlign: 'center', color: colors.muted, marginBottom: 16 },
  text: { fontSize: 14, color: colors.text, lineHeight: 21 },
  box: { backgroundColor: colors.card, borderRadius: 12, padding: 14, marginVertical: 16, borderWidth: 1, borderColor: colors.border },
  boxLine: { fontSize: 14, color: colors.text, marginVertical: 3 },
  btn: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary,
    padding: 14, borderRadius: 12, marginBottom: 10,
  },
  btnText: { color: '#fff', fontWeight: '700', marginLeft: 8 },
  footer: { textAlign: 'center', color: colors.muted, fontSize: 12, marginTop: 20 },
});
