export type CaptureFlowStatus = 'idle' | 'saving' | 'done' | 'queued' | 'failed';

export const FINISHED_STATUSES: ReadonlySet<CaptureFlowStatus> = new Set(['done', 'queued']);

export const OFFLINE_QUEUED_MESSAGE = 'Sem internet: item salvo e será sincronizado.';
