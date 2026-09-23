import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Project } from '@workspace/api-client-react';
import { useColors } from '@/hooks/useColors';
import { RemoteImage } from '@/components/RemoteImage';

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const colors = useColors();

  const openProject = () => {
    Haptics.selectionAsync();
    router.push({ pathname: '/project/[slug]', params: { slug: project.slug } });
  };

  return (
    <Pressable
      testID={'project-card-' + project.slug}
      accessibilityRole="button"
      accessibilityLabel={'Ouvrir ' + project.titre}
      onPress={openProject}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.84 : 1 },
        featured && styles.featuredCard,
      ]}
    >
      <RemoteImage path={project.image} style={[styles.image, featured && styles.featuredImage]} accessibilityLabel={project.titre} />
      <View style={styles.body}>
        <View style={styles.metaRow}>
          <Text style={[styles.category, { color: colors.primary }]}>{project.categorie}</Text>
          <Ionicons name="arrow-forward" size={16} color={colors.primary} />
        </View>
        <Text style={[styles.title, { color: colors.foreground }]} numberOfLines={2}>{project.titre}</Text>
        <Text style={[styles.status, { color: colors.mutedForeground }]} numberOfLines={1}>{project.statut}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 14, overflow: 'hidden', marginBottom: 16 },
  featuredCard: { marginBottom: 8 },
  image: { width: '100%', height: 170, backgroundColor: '#2A1408' },
  featuredImage: { height: 220 },
  body: { padding: 16 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  category: { fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: '600' },
  title: { fontFamily: 'Georgia', fontSize: 22, lineHeight: 27, marginBottom: 7 },
  status: { fontSize: 12, lineHeight: 17 },
});