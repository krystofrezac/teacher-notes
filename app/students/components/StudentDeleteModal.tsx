import { FC, useState } from 'react';

import { TrashIcon } from '@heroicons/react/outline';

import Button from 'app/core/components/Button';
import Icon from 'app/core/components/Icon';
import Modal, { ModalActions, ModalTitle } from 'app/core/components/Modal';

import { StudentDeleteModalProps } from './StudentDeleteModal.types';

const StudentDeleteModal: FC<StudentDeleteModalProps> = props => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    await props.onSubmit();
    props.onClose();
    setLoading(false);
  };

  return (
    <Modal open={props.open}>
      <ModalTitle>
        {`Do you really want to delete student '${props.studentName}'`}
      </ModalTitle>
      This action is irreversible
      <ModalActions>
        <Button variant='ghost' loading={loading} onClick={props.onClose}>
          Cancel
        </Button>
        <Button variant='error' loading={loading} onClick={handleSubmit}>
          <Icon>
            <TrashIcon />
          </Icon>
          Delete
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default StudentDeleteModal;
