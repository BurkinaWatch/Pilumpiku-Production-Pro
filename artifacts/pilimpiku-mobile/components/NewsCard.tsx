import { StyleSheet, Text, View } from 'react-native';
import type { NewsArticle } from '@workspace/api-client-react';
import { useColors } from '@/hooks/useColors';
import { RemoteImage } from '@/components/RemoteImage';

export function NewsCard({ article }: { article: NewsArticle }) {
  const colors = useColors();

  return (
    <View style={[styles.card, { borderBottomColor: colors.border }]}>
      <RemoteImage path={article.image} style={styles.image} accessibilityLabel={article.titre} />
      <View style={styles.content}>
        <Text style={[styles.date, { color: colors.primary }]}>{article.dateLabel} · {article.categorie}</Text>
        <Text style={[styles.title, { color: colors.foreground }]}>{article.titre}</Text>
        <Text style={[styles.excerpt, { color: colors.mutedForeground }]} numberOfLines={3}>{article.excerpt}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', gap: 14, paddingVertical: 16, borderBottomWidth: StyleSheet.hairlineWidth },
  image: { width: 92, height: 92, borderRadius: 10, backgroundColor: '#2A1408' },
  content: { flex: 1, justifyContent: 'center' },
  date: { fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 7 },
  title: { fontFamily: 'Georgia', fontSize: 18, lineHeight: 22, marginBottom: 6 },
  excerpt: { fontSize: 12, lineHeight: 17 },
});