import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { BrandHeader } from '@/components/BrandHeader';
import { resolveBaseUrl } from '@/lib/content';

const SERVICES = [
  { icon: 'home-outline' as const, title: 'Espace de Coworking', text: 'Un espace équipé pour écrire, créer, produire et rencontrer la communauté.' },
  { icon: 'create-outline' as const, title: 'Écriture de scénario', text: 'Un accompagnement pour faire grandir vos personnages et vos récits.' },
  { icon: 'videocam-outline' as const, title: 'Coaching production', text: 'Des mentorats pratiques pour financer, produire et diffuser vos œuvres.' },
  { icon: 'people-outline' as const, title: 'Afterworks Cinéma', text: 'Chaque mois, une rencontre avec une voix du cinéma et de l’audiovisuel.' },
];

export default function LaboScreen() {
  const colors = useColors();

  const openWebPage = (path: string) => {
    const domain = resolveBaseUrl(process.env.EXPO_PUBLIC_DOMAIN);
    if (domain) Linking.openURL(domain + path);
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <BrandHeader />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <LinearGradient colors={[colors.secondary, colors.background]} style={[styles.hero, { borderColor: colors.border }]}>
          <View style={[styles.mark, { backgroundColor: colors.primary }]}>
            <Ionicons name="sparkles" size={23} color={colors.primaryForeground} />
          </View>
          <Text style={[styles.eyebrow, { color: colors.primary }]}>LABO PIIULGU</Text>
          <Text style={[styles.title, { color: colors.foreground }]}>Le lieu où les idées prennent forme.</Text>
          <Text style={[styles.copy, { color: colors.mutedForeground }]}>Un laboratoire de création et de transmission dédié aux industries culturelles et créatives.</Text>
        </LinearGradient>

        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Nos espaces</Text>
        <Text style={[styles.intro, { color: colors.mutedForeground }]}>Une programmation pensée pour accompagner chaque étape d’un projet.</Text>
        {SERVICES.map((service) => (
          <Pressable
            key={service.title}
            testID={'labo-service-' + service.title}
            onPress={() => openWebPage('/labo-piiulgu')}
            style={({ pressed }) => [styles.service, { borderColor: colors.border, backgroundColor: colors.card, opacity: pressed ? 0.8 : 1 }]}
          >
            <View style={[styles.serviceIcon, { backgroundColor: colors.secondary }]}>
              <Ionicons name={service.icon} size={22} color={colors.primary} />
            </View>
            <View style={styles.serviceCopy}>
              <Text style={[styles.serviceTitle, { color: colors.foreground }]}>{service.title}</Text>
              <Text style={[styles.serviceText, { color: colors.mutedForeground }]}>{service.text}</Text>
            </View>
            <Ionicons name="arrow-forward" size={17} color={colors.primary} />
          </Pressable>
        ))}

        <View style={[styles.quote, { borderLeftColor: colors.primary }]}>
          <Text style={[styles.quoteText, { color: colors.foreground }]}>« Créer des espaces où les talents peuvent se rencontrer, apprendre et s’envoler. »</Text>
          <Text style={[styles.quoteAuthor, { color: colors.primary }]}>— L’esprit du Labo Piiulgu</Text>
        </View>
        <Pressable
          testID="button-open-labo-site"
          onPress={() => openWebPage('/labo-piiulgu')}
          style={({ pressed }) => [styles.outlineButton, { borderColor: colors.primary, opacity: pressed ? 0.7 : 1 }]}
        >
          <Text style={[styles.outlineText, { color: colors.primary }]}>Explorer le Labo sur le site</Text>
          <Ionicons name="open-outline" size={16} color={colors.primary} />
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 120 },
  hero: { borderWidth: 1, borderRadius: 18, padding: 22, marginTop: 34, marginBottom: 32 },
  mark: { width: 45, height: 45, borderRadius: 23, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  eyebrow: { fontSize: 10, letterSpacing: 2.5, fontWeight: '700', marginBottom: 10 },
  title: { fontFamily: 'Georgia', fontSize: 31, lineHeight: 37, marginBottom: 14 },
  copy: { fontSize: 14, lineHeight: 21 },
  sectionTitle: { fontFamily: 'Georgia', fontSize: 28, marginBottom: 7 },
  intro: { fontSize: 14, lineHeight: 21, marginBottom: 17 },
  service: { flexDirection: 'row', alignItems: 'center', gap: 13, borderWidth: 1, borderRadius: 13, padding: 14, marginBottom: 11 },
  serviceIcon: { width: 42, height: 42, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  serviceCopy: { flex: 1 },
  serviceTitle: { fontFamily: 'Georgia', fontSize: 18, marginBottom: 4 },
  serviceText: { fontSize: 12, lineHeight: 17 },
  quote: { borderLeftWidth: 2, paddingLeft: 16, marginTop: 28, marginBottom: 28 },
  quoteText: { fontFamily: 'Georgia', fontSize: 20, lineHeight: 27, fontStyle: 'italic', marginBottom: 9 },
  quoteAuthor: { fontSize: 11, letterSpacing: 0.5 },
  outlineButton: { minHeight: 50, borderWidth: 1, borderRadius: 9, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 },
  outlineText: { fontSize: 12, fontWeight: '700' },
});