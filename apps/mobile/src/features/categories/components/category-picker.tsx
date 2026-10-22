import { StyleSheet, Text, View } from 'react-native';
import { Chip } from '../../../shared/ui/chip';
import { colors, fontSize, spacing } from '../../../shared/ui/theme';
import { useCategories } from '../hooks/use-categories';
import { NewCategoryInput } from './new-category-input';

interface CategoryPickerProps {
  value: string | null;
  onChange: (categoryId: string | null) => void;
}

export const CategoryPicker = ({ value, onChange }: CategoryPickerProps) => {
  const { data: categories = [] } = useCategories();
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Categoria</Text>
      <View accessibilityRole="radiogroup" style={styles.chips}>
        <Chip label="Sem categoria" selected={value === null} onPress={() => onChange(null)} />
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.name}
            selected={value === category.id}
            onPress={() => onChange(category.id)}
          />
        ))}
        <NewCategoryInput onCreated={(category) => onChange(category.id)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: spacing.xs },
  label: { fontSize: fontSize.sm, color: colors.muted, fontWeight: '600' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
