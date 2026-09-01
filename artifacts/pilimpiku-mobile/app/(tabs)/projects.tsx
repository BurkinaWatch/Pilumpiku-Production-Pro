import { Ionicons } from '@expo/vector-icons';
import { useListProjects, type Project } from '@workspace/api-client-react';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useMemo, useState } from 'react';
import { useColors } from '@/hooks/useColors';
import { BrandHeader } from '@/components/BrandHeader';
import { ProjectCard } from '@/components/ProjectCard';

export default function ProjectsScreen() {
  const colors = useColors();
  const query = useListProjects();
  const [filter, setFilter] = useState('Tous');
  const projects = query.data ?? [];
  const filters = useMemo(() => ['Tous', ...Array.from(new Set(projects.map((project) => project.categorie)))], [projects]);
  const filtered = useMemo(() => filter === 'Tous' ? projects : projects.filter((project) => project.categorie === filter), [filter, projects]);

  const renderHeader = () => (
    <View>
      <Text style={[styles.eyebrow, { color: colors.primary }]}>FILMS & PROJETS</Text>
      <Text style={[styles.title, { color: colors.foreground }]}>Nos histoires</Text>
      <Text style={[styles.intro, { color: colors.mutedForeground }]}>Des récits singuliers, portés par des visions d'auteurs puissantes.</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        {filters.map((item) => (
          <Pressable key={item} testID={'filter-' + item} onPress={() => setFilter(item)} style={[styles.filter, { borderColor: filter === item ? colors.primary : colors.border, backgroundColor: filter === item ? colors.primary : 'transparent' }]}>
            <Text style={[styles.filterText, { color: filter === item ? colors.primaryForeground : colors.mutedForeground }]}>{item}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <BrandHeader />
      {query.isLoading ? <ActivityIndicator color={colors.primary} style={styles.loader} /> : null}
      {query.error && !query.data ? (
        <View style={styles.centerState}>
          <Ionicons name="cloud-offline-outline" size={30} color={colors.primary} />
          <Text style={[styles.stateText, { color: colors.mutedForeground }]}>Impossible de charger les projets.</Text>
          <Pressable testID="button-retry-projects" onPress={() => query.refetch()}><Text style={[styles.link, { color: colors.primary }]}>Réessayer</Text></Pressable>
        </View>
      ) : (
        <FlatList<Project>
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <ProjectCard project={item} />}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={query.isRefetching} onRefresh={() => query.refetch()} tintColor={colors.primary} />}
          ListEmptyComponent={<View style={styles.centerState}><Ionicons name="film-outline" size={30} color={colors.primary} /><Text style={[styles.stateText, { color: colors.mutedForeground }]}>Aucun projet dans cette catégorie.</Text></View>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  list: { paddingHorizontal: 20, paddingBottom: 120 },
  eyebrow: { fontSize: 10, letterSpacing: 2.5, fontWeight: '700', marginTop: 40, marginBottom: 9 },
  title: { fontFamily: 'Georgia', fontSize: 36, marginBottom: 10 },
  intro: { fontSize: 14, lineHeight: 21, marginBottom: 18 },
  filters: { gap: 8, paddingBottom: 24 },
  filter: { borderWidth: 1, borderRadius: 20, paddingHorizontal: 13, paddingVertical: 8 },
  filterText: { fontSize: 11 },
  loader: { marginTop: 50 },
  centerState: { alignItems: 'center', justifyContent: 'center', padding: 30, gap: 12 },
  stateText: { textAlign: 'center', fontSize: 14 },
  link: { fontSize: 13, fontWeight: '700' },
});