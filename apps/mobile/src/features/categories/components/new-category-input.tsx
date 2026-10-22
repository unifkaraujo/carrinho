import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { colors, fontSize, spacing } from '../../../shared/ui/theme';
import type { Category } from '../domain/category';
import { useCreateCategory } from '../hooks/use-create-category';

interface NewCategoryInputProps {
  onCreated: (category: Category) => void;
}

export const NewCategoryInput = ({ onCreated }: NewCategoryInputProps) => {
  const [name, setName] = useState('');
  const createCategory = useCreateCategory();

  const submit = () => {
    if (!name.trim()) return;
    createCategory.mutate(name.trim(), { onSuccess: onCreated });
    setName('');
  };

  return (
    <TextInput
      style={styles.input}
      value={name}
      onChangeText={setName}
      placeholder="+ Nova categoria"
      placeholderTextColor={colors.muted}
      returnKeyType="done"
      onSubmitEditing={submit}
      editable={!createCategory.isPending}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.muted,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    fontSize: fontSize.sm,
    color: colors.text,
    minWidth: 140,
  },
});
