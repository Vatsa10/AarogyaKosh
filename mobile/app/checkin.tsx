import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, Card, useTheme, IconButton, TextInput } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { useGlobalState } from '../context/GlobalStateContext';
import { ThemedView } from '../components/themed-view';

export default function HealthCheckIn() {
  const router = useRouter();
  const theme = useTheme();
  const { logHealth } = useGlobalState();
  
  const [sleep, setSleep] = useState(7);
  const [exercise, setExercise] = useState(30);
  const [stress, setStress] = useState(5);
  const [diet, setDiet] = useState(7);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await logHealth({
        sleep_hours: Number(sleep.toFixed(1)),
        exercise_minutes: Math.round(exercise),
        diet_quality: Math.round(diet),
        stress_level: Math.round(stress),
        notes: notes || undefined
      });
      router.back();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container} safeArea={true}>
      <View style={styles.header}>
        <IconButton icon="close" size={24} onPress={() => router.back()} />
        <Text variant="titleLarge" style={styles.title}>Daily Check-In</Text>
        <View style={{ width: 48 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text variant="bodyMedium" style={styles.subtitle}>
          How was your health today? This helps your AI Agent monitor patterns and predict risks.
        </Text>

        <MetricCard 
          label="Sleep" 
          value={`${sleep.toFixed(1)} hrs`} 
          min={0} max={12} 
          step={0.5} 
          val={sleep} 
          onChange={setSleep} 
          icon="bed"
        />

        <MetricCard 
          label="Exercise" 
          value={`${Math.round(exercise)} min`} 
          min={0} max={120} 
          step={5} 
          val={exercise} 
          onChange={setExercise} 
          icon="run"
        />

        <MetricCard 
          label="Stress Level" 
          value={Math.round(stress)} 
          min={1} max={10} 
          step={1} 
          val={stress} 
          onChange={setStress} 
          icon="brain"
          isGauge
        />

        <MetricCard 
          label="Diet Quality" 
          value={Math.round(diet)} 
          min={1} max={10} 
          step={1} 
          val={diet} 
          onChange={setDiet} 
          icon="food-apple"
        />

        <TextInput
          label="Anything else to note?"
          placeholder="E.g. Feeling a bit tired, or extra energetic"
          mode="outlined"
          multiline
          numberOfLines={3}
          value={notes}
          onChangeText={setNotes}
          style={styles.notes}
          outlineColor={theme.colors.outline}
          activeOutlineColor={theme.colors.primary}
        />

        <Button 
          mode="contained" 
          onPress={handleSubmit} 
          loading={loading}
          disabled={loading}
          style={styles.btn}
          contentStyle={{ height: 56 }}
        >
          {loading ? 'Analyzing with Agent...' : 'Submit to AI Agent'}
        </Button>
      </ScrollView>
    </ThemedView>
  );
}

function MetricCard({ label, value, min, max, step, val, onChange, icon, isGauge }: any) {
  const theme = useTheme();
  return (
    <Card style={styles.card} mode="outlined">
      <Card.Content>
        <View style={styles.cardHeader}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconButton icon={icon} size={24} iconColor={theme.colors.primary} style={{ margin: -8, marginRight: 4 }} />
            <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{label}</Text>
          </View>
          <Text variant="titleLarge" style={{ color: theme.colors.primary, fontWeight: 'bold' }}>{value}</Text>
        </View>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={min}
          maximumValue={max}
          step={step}
          value={val}
          onValueChange={onChange}
          minimumTrackTintColor={theme.colors.primary}
          maximumTrackTintColor={theme.colors.surfaceVariant}
          thumbTintColor={theme.colors.primary}
        />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 5
  },
  title: { fontWeight: 'bold' },
  content: { padding: 24, paddingBottom: 60 },
  subtitle: { marginBottom: 25, color: 'gray', textAlign: 'center' },
  card: { marginBottom: 16, borderRadius: 16, borderColor: '#e0e0e0' },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 8
  },
  notes: { marginBottom: 30, backgroundColor: 'white' },
  btn: { borderRadius: 16, elevation: 2 }
});
