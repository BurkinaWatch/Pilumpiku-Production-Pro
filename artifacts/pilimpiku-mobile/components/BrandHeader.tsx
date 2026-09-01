import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

export function BrandHeader({ showBack = false }: { showBack?: boolean }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top + 10, borderBottomColor: colors.border }]}>
      <View style={styles.inner}>
        {showBack ? (
          <Pressable
            testID="button-back"
            accessibilityRole="button"
            accessibilityLabel="Retour"
            onPress={() => router.back()}
            style={({ pressed }) => [styles.iconButton, { opacity: pressed ? 0.65 : 1 }]}
          >
            <Ionicons name="arrow-back" size={22} color={colors.foreground} />
          </Pressable>
        ) : null}
        <View style={styles.brand}>
          <Image source={require('@/assets/images/icon.png')} style={styles.logo} contentFit="contain" />
          <View>
            <Text style={[styles.name, { color: colors.foreground }]}>PILUMPIKU</Text>
            <Text style={[styles.subtitle, { color: colors.primary }]}>PRODUCTION</Text>
          </View>
        </View>
        <View style={styles.headerSpace} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { borderBottomWidth: StyleSheet.hairlineWidth },
  inner: { minHeight: 70, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 42, height: 42, borderRadius: 12 },
  name: { fontFamily: 'Georgia', fontSize: 18, letterSpacing: 3 },
  subtitle: { fontSize: 9, letterSpacing: 3, marginTop: 3 },
  iconButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerSpace: { width: 40, height: 40 },
});