import { Ionicons } from '@expo/vector-icons';
import { useListNews, useListProjects, type Project } from '@workspace/api-client-react';
import { router } from 'expo-router';
import { ActivityIndicator, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { BrandHeader } from '@/components/BrandHeader';
import { ProjectCard } from '@/components/ProjectCard';
import { NewsCard } from '@/components/NewsCard';

export default function HomeScreen() {
  const colors = useColors();
  const projectsQuery = useListProjects();
  const newsQuery = useListNews();
  const featured = (projectsQuery.data ?? []).filter((project) => project.featured).slice(0, 2);
  const fallback = (projectsQuery.data ?? []).slice(0, 2);
  const highlights: Project[] = featured.length > 0 ? featured : fallback;
  const loading = projectsQuery.isLoading || newsQuery.isLoading;
  const error = projectsQuery.error || newsQuery.error;

  const refresh = () => {
    projectsQuery.refetch();
    newsQuery.refetch();
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <BrandHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={projectsQuery.isRefetching || newsQuery.isRefetching} onRefresh={refresh} tintColor={colors.primary} />}
      >
        <View style={styles.hero}>
          <Text style={[styles.eyebrow, { color: colors.primary }]}>PILUMPIKU PRODUCTION</Text>
          <Text style={[styles.heroTitle, { color: colors.foreground }]}>Un nouveau regard{'\n'}pour une nouvelle Afrique</Text>
          <Text style={[styles.heroCopy, { color: colors.mutedForeground }]}>Le cinéma comme acte de transformation, depuis Ouagadougou.</Text>
          <Pressable
            testID="button-discover-projects"
            onPress={() => router.push('/projects')}
            style={({ pressed }) => [styles.primaryButton, { backgroundColor: colors.primary, opacity: pressed ? 0.78 : 1 }]}
          >
            <Text style={[styles.primaryButtonText, { color: colors.primaryForeground }]}>Découvrir nos films</Text>
            <Ionicons name="arrow-forward" size={17} color={colors.primaryForeground} />
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={[styles.kicker, { color: colors.primary }]}>À L'AFFICHE</Text>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Nos histoires</Text>
          </View>
          <Pressable testID="link-see-projects" onPress={() => router.push('/projects')}><Text style={[styles.link, { color: colors.primary }]}>Tout voir</Text></Pressable>
        </View>

        {loading && !projectsQuery.data ? <ActivityIndicator color={colors.primary} style={styles.loader} /> : null}
        {error && !projectsQuery.data ? (
          <View style={[styles.errorBox, { borderColor: colors.border }]}>
            <Ionicons name="cloud-offline-outline" size={24} color={colors.primary} />
            <Text style={[styles.errorText, { color: colors.mutedForeground }]}>Les contenus ne sont pas disponibles pour le moment.</Text>
            <Pressable testID="button-retry-home" onPress={refresh}><Text style={[styles.link, { color: colors.primary }]}>Réessayer</Text></Pressable>
          </View>
        ) : null}
        {highlights.map((project) => <ProjectCard key={project.id} project={project} featured />)}

        <View style={[styles.laboBanner, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
          <View style={styles.laboIcon}><Ionicons name="sparkles-outline" size={23} color={colors.primary} /></View>
          <View style={styles.laboCopy}>
            <Text style={[styles.kicker, { color: colors.primary }]}>ESPACE DE CRÉATION</Text>
            <Text style={[styles.laboTitle, { color: colors.foreground }]}>Labo Piiulgu</Text>
            <Text style={[styles.laboText, { color: colors.mutedForeground }]}>Coworking, mentorats et rencontres pour les talents des ICC.</Text>
          </View>
          <Pressable testID="link-home-labo" onPress={() => router.push('/labo')} style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
            <Ionicons name="chevron-forward" size={22} color={colors.primary} />
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={[styles.kicker, { color: colors.primary }]}>LE JOURNAL</Text>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Actualités</Text>
          </View>
          <Pressable testID="link-see-news" onPress={() => router.push('/news')}><Text style={[styles.link, { color: colors.primary }]}>Tout voir</Text></Pressable>
        </View>
        {(newsQuery.data ?? []).slice(0, 3).map((article) => <NewsCard key={article.id} article={article} />)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 120 },
  hero: { paddingTop: 42, paddingBottom: 42 },
  eyebrow: { fontSize: 10, letterSpacing: 2.5, fontWeight: '600', marginBottom: 16 },
  heroTitle: { fontFamily: 'Georgia', fontSize: 36, lineHeight: 43, marginBottom: 16 },
  heroCopy: { fontSize: 15, lineHeight: 23, maxWidth: 320, marginBottom: 24 },
  primaryButton: { minHeight: 50, borderRadius: 9, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 12 },
  primaryButtonText: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  sectionHeader: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16, marginTop: 8 },
  kicker: { fontSize: 10, letterSpacing: 2, fontWeight: '700', marginBottom: 5 },
  sectionTitle: { fontFamily: 'Georgia', fontSize: 28 },
  link: { fontSize: 12, fontWeight: '600' },
  loader: { marginVertical: 40 },
  errorBox: { borderWidth: 1, borderRadius: 12, padding: 18, alignItems: 'center', gap: 10, marginBottom: 18 },
  errorText: { textAlign: 'center', fontSize: 13, lineHeight: 19 },
  laboBanner: { flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderRadius: 14, padding: 16, marginTop: 30, marginBottom: 34 },
  laboIcon: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', backgroundColor: '#5A2B12' },
  laboCopy: { flex: 1 },
  laboTitle: { fontFamily: 'Georgia', fontSize: 21, marginBottom: 3 },
  laboText: { fontSize: 12, lineHeight: 17 },
});
