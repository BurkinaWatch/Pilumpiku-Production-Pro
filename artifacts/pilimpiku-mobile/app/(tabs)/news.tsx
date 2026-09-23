import { Ionicons } from '@expo/vector-icons';
import { useListNews } from '@workspace/api-client-react';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { BrandHeader } from '@/components/BrandHeader';
import { NewsCard } from '@/components/NewsCard';

export default function NewsScreen() {
  const colors = useColors();
  const query = useListNews();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <BrandHeader />
      {query.isLoading ? <ActivityIndicator color={colors.primary} style={styles.loader} /> : null}
      {query.error && !query.data ? (
        <View style={styles.centerState}>
          <Ionicons name="cloud-offline-outline" size={30} color={colors.primary} />
          <Text style={[styles.stateText, { color: colors.mutedForeground }]}>Impossible de charger les actualités.</Text>
          <Pressable testID="button-retry-news" onPress={() => query.refetch()}><Text style={[styles.link, { color: colors.primary }]}>Réessayer</Text></Pressable>
        </View>
      ) : (
        <FlatList
          data={query.data ?? []}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <NewsCard article={item} />}
          ListHeaderComponent={<View><Text style={[styles.eyebrow, { color: colors.primary }]}>LE JOURNAL</Text><Text style={[styles.title, { color: colors.foreground }]}>Actualités</Text><Text style={[styles.intro, { color: colors.mutedForeground }]}>Les nouvelles de Pilumpiku, de ses films et de sa communauté.</Text></View>}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={query.isRefetching} onRefresh={() => query.refetch()} tintColor={colors.primary} />}
          ListEmptyComponent={<View style={styles.centerState}><Ionicons name="newspaper-outline" size={30} color={colors.primary} /><Text style={[styles.stateText, { color: colors.mutedForeground }]}>Aucune actualité pour le moment.</Text></View>}
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
  intro: { fontSize: 14, lineHeight: 21, marginBottom: 10 },
  loader: { marginTop: 50 },
  centerState: { alignItems: 'center', justifyContent: 'center', padding: 30, gap: 12 },
  stateText: { textAlign: 'center', fontSize: 14 },
  link: { fontSize: 13, fontWeight: '700' },
});