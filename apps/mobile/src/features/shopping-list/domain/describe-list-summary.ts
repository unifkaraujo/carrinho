export interface ListSummary {
  title: string;
  subtitle: string;
  progress: number;
}

const describePending = (count: number, total: number): string => {
  if (total === 0) return 'Lista vazia';
  if (count === 0) return 'Tudo comprado';
  return count === 1 ? '1 item para comprar' : `${count} itens para comprar`;
};

const describeBought = (bought: number, total: number): string => {
  if (total === 0) return 'Adicione o primeiro item';
  return `${bought} de ${total} no carrinho`;
};

export const describeListSummary = (pending: number, bought: number): ListSummary => {
  const total = pending + bought;
  return {
    title: describePending(pending, total),
    subtitle: describeBought(bought, total),
    progress: total === 0 ? 0 : bought / total,
  };
};
