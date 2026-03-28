import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, Card, useTheme, IconButton, List, TextInput, SegmentedButtons, Avatar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useGlobalState } from '../context/GlobalStateContext';
import { ThemedView } from '../components/themed-view';

type GoalType = 'weight_loss' | 'stress_reduction' | 'sleep_target' | 'exercise_consistency';

export default function GoalsManagement() {
  const router = useRouter();
  const theme = useTheme();
  const { agentStatus, setGoal } = useGlobalState();
  const [adding, setAdding] = useState(false);
  const [goalType, setGoalType] = useState<GoalType>('exercise_consistency');
  const [target, setTarget] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);
    try {
      await setGoal({
        goal_type: goalType,
        target_value: target
      });
      setAdding(false);
      setTarget('');
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container} safeArea={true}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} onPress={() => router.back()} />
        <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>Health Goals</Text>
        <IconButton icon={adding ? 'close' : 'plus'} mode={adding ? "contained" : "contained-tonal"} onPress={() => setAdding(!adding)} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {adding && (
          <Card style={styles.addCard} mode="elevated">
            <Card.Content>
              <Text variant="titleMedium" style={{ marginBottom: 15, fontWeight: 'bold' }}>Set New Objective</Text>
              
              <Text variant="labelLarge" style={{ marginBottom: 8 }}>Goal Category</Text>
              <View style={{ marginBottom: 15 }}>
                <SegmentedButtons
                  value={goalType}
                  onValueChange={v => setGoalType(v as GoalType)}
                  buttons={[
                    { value: 'exercise_consistency', icon: 'run', label: 'Exercise' },
                    { value: 'sleep_target', icon: 'bed', label: 'Sleep' },
                    { value: 'stress_reduction', icon: 'brain', label: 'Stress' },
                  ]}
                  density="medium"
                />
              </View>

              <TextInput
                label="Target (e.g. 8 hours or 4 times/week)"
                mode="outlined"
                value={target}
                onChangeText={setTarget}
                style={{ marginBottom: 20, backgroundColor: 'white' }}
                outlineColor={theme.colors.outlineVariant}
              />

              <Button mode="contained" onPress={handleAdd} loading={loading} disabled={loading || !target.trim()}>
                Activate Goal
              </Button>
            </Card.Content>
          </Card>
        )}

        <Text variant="titleSmall" style={styles.sectionTitle}>Active Focus</Text>
        {(agentStatus?.active_goals?.length || 0) > 0 ? (
          agentStatus.active_goals.map((g: any) => (
            <Card key={g._id} style={styles.goalCard} mode="outlined">
              <List.Item
                title={g.goal_type.replace(/_/g, ' ').split(' ').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}
                description={`Target: ${g.target_value}`}
                left={props => <List.Icon {...props} icon="target" color={theme.colors.primary} />}
                right={props => (
                  <View style={{ justifyContent: 'center' }}>
                    <IconButton {...props} icon="delete-outline" iconColor={theme.colors.error} onPress={() => {}} />
                  </View>
                )}
              />
            </Card>
          ))
        ) : (
          <View style={styles.empty}>
            <Avatar.Icon size={80} icon="target-variant" style={{ backgroundColor: theme.colors.surfaceVariant }} color={theme.colors.outline} />
            <Text variant="bodyMedium" style={{ color: 'gray', textAlign: 'center', marginTop: 20 }}>
              No active goals. Add one to get personalized monitoring and insights from your AI health agent.
            </Text>
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, marginBottom: 10 },
  content: { padding: 20, paddingBottom: 60 },
  addCard: { marginBottom: 30, borderRadius: 20, backgroundColor: '#fdfdfd' },
  sectionTitle: { marginBottom: 15, fontWeight: 'bold', textTransform: 'uppercase', color: 'gray', fontSize: 12, letterSpacing: 1 },
  goalCard: { marginBottom: 12, borderRadius: 16, backgroundColor: 'white' },
  empty: { padding: 40, alignItems: 'center', marginTop: 20 }
});
