export interface LessonDeleteModalProps {
  open: boolean;

  onSubmit: () => Promise<void>;
  onClose: () => void;
}
