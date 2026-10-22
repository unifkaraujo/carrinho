import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CategoryPicker } from '../../categories/components/category-picker';
import { useForm } from '../../../shared/form/use-form';
import { PrimaryButton } from '../../../shared/ui/primary-button';
import { TextButton } from '../../../shared/ui/text-button';
import { TextField } from '../../../shared/ui/text-field';
import { spacing } from '../../../shared/ui/theme';
import type { Item } from '../domain/item';
import { itemFormSchema } from '../domain/item-form-schema';
import type { ItemPatch } from '../domain/item-patch';
import { toItemFormValues } from '../domain/to-item-form-values';

interface ItemFormProps {
  item: Item;
  onSubmit: (patch: ItemPatch) => void;
  onRemove: () => void;
}

export const ItemForm = ({ item, onSubmit, onRemove }: ItemFormProps) => {
  const { values, errors, setField, validate } = useForm(itemFormSchema, toItemFormValues(item));
  const [categoryId, setCategoryId] = useState(item.categoryId);

  const submit = () => {
    const data = validate();
    if (data) onSubmit({ ...data, categoryId });
  };

  return (
    <View style={styles.form}>
      <TextField
        label="Nome"
        value={values.name}
        onChangeText={setField('name')}
        error={errors.name}
      />
      <View style={styles.row}>
        <TextField
          label="Quantidade"
          value={values.quantity}
          onChangeText={setField('quantity')}
          error={errors.quantity}
          keyboardType="decimal-pad"
          containerStyle={styles.flex}
        />
        <TextField
          label="Unidade"
          value={values.unit}
          onChangeText={setField('unit')}
          placeholder="kg, dúzia, pacote…"
          autoCapitalize="none"
          containerStyle={styles.flex}
        />
      </View>
      <CategoryPicker value={categoryId} onChange={setCategoryId} />
      <PrimaryButton title="Salvar" onPress={submit} />
      <TextButton label="Remover item" tone="danger" onPress={onRemove} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: { gap: spacing.lg },
  row: { flexDirection: 'row', gap: spacing.md },
  flex: { flex: 1 },
});
