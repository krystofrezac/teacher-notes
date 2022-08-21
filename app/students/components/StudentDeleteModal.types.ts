export interface StudentDeleteModalProps {
  open: boolean;
  studentName: string;

  onSubmit: () => void;
  onClose: () => void;
}
