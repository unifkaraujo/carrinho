import { MessageState } from '../../../shared/ui/message-state';

interface ListEmptyStateProps {
  isError: boolean;
  isPending: boolean;
  onRetry: () => void;
}

export const ListEmptyState = ({ isError, isPending, onRetry }: ListEmptyStateProps) => {
  if (isError) {
    return (
      <MessageState
        icon="cloud-offline-outline"
        title="Não foi possível carregar"
        description="Verifique a internet."
        actionLabel="Tentar de novo"
        onAction={onRetry}
      />
    );
  }
  if (isPending) return null;
  return (
    <MessageState
      icon="cart-outline"
      title="Carrinho vazio"
      description="Fale ou digite um item aqui embaixo, ou use o widget Comprar na tela inicial."
    />
  );
};
