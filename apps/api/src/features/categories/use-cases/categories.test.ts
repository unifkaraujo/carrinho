import { describe, expect, it } from 'vitest';
import { DEFAULT_CATEGORY_NAMES } from '../domain/default-category-names';
import { buildCategory } from '../testing/build-category';
import { createInMemoryCategoriesRepository } from '../testing/in-memory-categories-repository';
import { addCategory } from './add-category';
import { seedDefaultCategories } from './seed-default-categories';

describe('addCategory', () => {
  it('cria uma categoria nova', async () => {
    const categories = createInMemoryCategoriesRepository();
    const category = await addCategory(categories, { userId: 'user-1', name: ' Pet ' });
    expect(category).toMatchObject({ userId: 'user-1', name: 'Pet' });
  });

  it('reaproveita categoria com mesmo nome ignorando caixa, acento e plural', async () => {
    const existing = buildCategory({ name: 'Bebidas' });
    const categories = createInMemoryCategoriesRepository([existing]);
    expect(await addCategory(categories, { userId: 'user-1', name: 'bebida' })).toBe(existing);
  });
});

describe('seedDefaultCategories', () => {
  it('cria as categorias padrão na ordem definida', async () => {
    const categories = createInMemoryCategoriesRepository();
    await seedDefaultCategories(categories, 'user-1');
    const names = (await categories.listByUser('user-1')).map((category) => category.name);
    expect(names).toEqual(DEFAULT_CATEGORY_NAMES);
  });
});
