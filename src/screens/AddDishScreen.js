import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Switch, Pressable, StyleSheet } from 'react-native';
import { colors, CATEGORIES, REGIONS } from '../theme';
import { useFoods } from '../context/FoodContext';
import Chip from '../components/Chip';
import { notify } from '../utils/dialog';

export default function AddDishScreen({ navigation }) {
  const { addFood } = useFoods();
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('🍽️');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [price, setPrice] = useState('');
  const [calories, setCalories] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('Main');
  const [region, setRegion] = useState('Island-wide');
  const [spice, setSpice] = useState(1);
  const [veg, setVeg] = useState(false);

  const save = () => {
    if (!name.trim() || !description.trim() || !ingredients.trim()) {
      notify('Missing details', 'Please enter a name, description and at least one ingredient.');
      return;
    }
    const priceNum = parseInt(price, 10);
    const calNum = parseInt(calories, 10);
    if ((price && isNaN(priceNum)) || (calories && isNaN(calNum))) {
      notify('Invalid number', 'Price and calories must be numbers.');
      return;
    }
    addFood({
      name: name.trim(),
      emoji: emoji.trim() || '🍽️',
      description: description.trim(),
      ingredients: ingredients.split(',').map((s) => s.trim()).filter(Boolean),
      steps: steps.split('\n').map((s) => s.trim()).filter(Boolean),
      price: priceNum || 0,
      calories: calNum || 0,
      time: time.trim() || '-',
      category, region, spice, veg,
    });
    notify('Saved', `"${name.trim()}" was added to your local guide.`, () => navigation.goBack());
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
      <Label text="Dish name *" />
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g. Fish Ambul Thiyal" />

      <Label text="Emoji" />
      <TextInput style={styles.input} value={emoji} onChangeText={setEmoji} maxLength={4} />

      <Label text="Description *" />
      <TextInput style={[styles.input, styles.multi]} value={description} onChangeText={setDescription} multiline placeholder="What is this dish?" />

      <Label text="Ingredients * (comma separated)" />
      <TextInput style={[styles.input, styles.multi]} value={ingredients} onChangeText={setIngredients} multiline placeholder="Rice, coconut milk, salt" />

      <Label text="Steps (one per line)" />
      <TextInput style={[styles.input, styles.multi, { minHeight: 100 }]} value={steps} onChangeText={setSteps} multiline />

      <View style={styles.row}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Label text="Price (Rs.)" />
          <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />
        </View>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Label text="Calories" />
          <TextInput style={styles.input} value={calories} onChangeText={setCalories} keyboardType="numeric" />
        </View>
        <View style={{ flex: 1 }}>
          <Label text="Time" />
          <TextInput style={styles.input} value={time} onChangeText={setTime} placeholder="30 min" />
        </View>
      </View>

      <Label text="Category" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CATEGORIES.map((c) => <Chip key={c} label={c} active={category === c} onPress={() => setCategory(c)} />)}
      </ScrollView>

      <Label text="Region" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {REGIONS.map((r) => <Chip key={r} label={r} active={region === r} onPress={() => setRegion(r)} />)}
      </ScrollView>

      <Label text="Spice level" />
      <View style={{ flexDirection: 'row' }}>
        {[1, 2, 3].map((n) => (
          <Chip key={n} label={['Mild', 'Medium', 'Hot'][n - 1]} active={spice === n} onPress={() => setSpice(n)} />
        ))}
      </View>

      <View style={[styles.row, { alignItems: 'center', marginTop: 16 }]}>
        <Switch value={veg} onValueChange={setVeg} trackColor={{ true: colors.primary }} />
        <Text style={{ marginLeft: 8, color: colors.text }}>Vegetarian</Text>
      </View>

      <Pressable style={styles.save} onPress={save}>
        <Text style={styles.saveText}>Save dish</Text>
      </Pressable>
    </ScrollView>
  );
}

const Label = ({ text }) => <Text style={styles.label}>{text}</Text>;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  label: { fontWeight: '700', color: colors.primaryDark, marginTop: 14, marginBottom: 6 },
  input: {
    backgroundColor: colors.card, borderRadius: 10, borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: 12, paddingVertical: 10, fontSize: 15,
  },
  multi: { minHeight: 70, textAlignVertical: 'top' },
  row: { flexDirection: 'row' },
  save: { backgroundColor: colors.primary, padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 24 },
  saveText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
