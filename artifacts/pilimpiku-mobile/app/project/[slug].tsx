import { Ionicons } from '@expo/vector-icons';
import { useGetProjectBySlug } from '@workspace/api-client-react';
import * as Linking from 'expo-linking';
import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { BrandHeader } from '@/components/BrandHeader';
import { RemoteImage } from '@/components/RemoteImage';
import { compactText } from '@/lib/content';

export default function ProjectDetailScreen() {
  const colors = useColors();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const projectSlug = Array.isArray(slug) ? slug[0] : slug;
  const query = useGetProjectBySlug(projectSlug ?? '');
  const project = query.data;

  if (query.isLoading) {
    return <View style={[styles.center, { backgroundColor: colors.background }]}><ActivityIndicator color={colors.primary} /></View>;
  }
  if (query.error || !project) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Ionicons name="film-outline" size={34} color={colors.primary} />
        <Text style={[styles.errorTitle, { color: colors.foreground }]}>Projet introuvable</Text>
        <Pressable onPress={() => router.back()}><Text style={[styles.link, { color: colors.primary }]}>Retour</Text></Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <BrandHeader showBack />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <RemoteImage path={project.image} style={styles.heroImage} accessibilityLabel={project.titre} />
        <Text style={[styles.category, { color: colors.primary }]}>{project.categorie}</Text>
        <Text style={[styles.title, { color: colors.foreground }]}>{project.titre}</Text>
        <Text style={[styles.status, { color: colors.mutedForeground }]}>{project.statut}</Text>
        <View style={styles.metaGrid}>
          <Meta label="Année" value={String(project.annee)} colors={colors} />
          <Meta label="Durée" value={project.duree} colors={colors} />
          <Meta label="Langue" value={project.langue} colors={colors} />
        </View>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Le film</Text>
        <Text style={[styles.body, { color: colors.mutedForeground }]}>{project.synopsis}</Text>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>L’intention</Text>
        <Text style={[styles.body, { color: colors.mutedForeground }]}>{compactText(project.intention, 700)}</Text>
        {project.trailerUrl ? (
          <Pressable
            testID="button-watch-trailer"
            onPress={() => Linking.openURL(project.trailerUrl as string)}
            style={({ pressed }) => [styles.primaryButton, { backgroundColor: colors.primary, opacity: pressed ? 0.75 : 1 }]}
          >
            <Ionicons name="play" size={16} color={colors.primaryForeground} />
            <Text style={[styles.primaryButtonText, { color: colors.primaryForeground }]}>Voir la bande-annonce</Text>
          </Pressable>
        ) : null}
      </ScrollView>
    </View>
  );
}

function Meta({ label, value, colors }: { label: string; value: string; colors: ReturnType<typeof useColors> }) {
  return (
    <View style={[styles.meta, { borderColor: colors.border }]}>
      <Text style={[styles.metaLabel, { color: colors.primary }]}>{label}</Text>
      <Text style={[styles.metaValue, { color: colors.foreground }]} numberOfLines={2}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 80 },
  heroImage: { width: '100%', height: 270, borderRadius: 15, backgroundColor: '#2A1408', marginTop: 22, marginBottom: 22 },
  category: { fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', fontWeight: '700', marginBottom: 9 },
  title: { fontFamily: 'Georgia', fontSize: 38, lineHeight: 43, marginBottom: 9 },
  status: { fontSize: 13, lineHeight: 19, marginBottom: 22 },
  metaGrid: { flexDirection: 'row', gap: 8, marginBottom: 30 },
  meta: { flex: 1, borderWidth: 1, borderRadius: 10, padding: 11, minHeight: 65 },
  metaLabel: { fontSize: 9, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 7 },
  metaValue: { fontSize: 12, lineHeight: 16 },
  sectionTitle: { fontFamily: 'Georgia', fontSize: 25, marginBottom: 9, marginTop: 10 },
  body: { fontSize: 15, lineHeight: 23, marginBottom: 15 },
  primaryButton: { minHeight: 50, borderRadius: 9, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, marginTop: 16 },
  primaryButtonText: { fontSize: 12, fontWeight: '700' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14 },
  errorTitle: { fontFamily: 'Georgia', fontSize: 25 },
  link: { fontSize: 13, fontWeight: '700' },
});