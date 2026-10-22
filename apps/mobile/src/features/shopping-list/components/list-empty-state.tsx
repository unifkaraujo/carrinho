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
        title="Não foi possível carregar"
        description="Verifique a internet."
        actionLabel="Tentar de novo"
        onAction={onRetry}
      />
    );
  }
  if (isPending) return null;
  return (
    <MessageState title="Lista vazia" description="Adicione itens pelo widget, pela voz ou aqui." />
  );
};
