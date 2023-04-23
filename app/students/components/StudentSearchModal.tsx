import { FC } from 'react';

import { z } from 'zod';

import { SubmitHandler } from 'app/core/components/Form';
import FormButton from 'app/core/components/FormButton';
import Modal, { ModalActions, ModalTitle } from 'app/core/components/Modal';
import ModalForm from 'app/core/components/ModalForm';
import TextareaInput from 'app/core/components/TextareaInput';
import TagsInput from 'app/tags/components/TagsInput/TagsInput';

import StudentFilter from '../validations/studentFilter';

export type StudentSearchFormValues = z.infer<typeof StudentFilter>;
export type StudentFilterFormSubmitHandler = (
  values: StudentSearchFormValues,
) => void;

export interface StudentSearchFormProps {
  open: boolean;
  initialValues?: StudentSearchFormValues;

  onSubmit: StudentFilterFormSubmitHandler;
  onClose: () => void;
}

const StudentSearchModal: FC<StudentSearchFormProps> = ({
  open,
  initialValues,
  onSubmit,
  onClose,
}) => {
  const handleSubmit: SubmitHandler<typeof StudentFilter> = async values => {
    onSubmit(values);
    onClose();
  };

  return (
    <Modal open={open}>
      <ModalTitle>Students filter</ModalTitle>
      <ModalForm
        open={open}
        initialValues={initialValues}
        schema={StudentFilter}
        onSubmit={handleSubmit}
      >
        <TagsInput name='tags' label='Tags' />
        <TextareaInput name='description' label='Description' />
        <ModalActions>
          <FormButton variant='ghost' onClick={onClose}>
            Cancel
          </FormButton>
          <FormButton type='submit' variant='primary'>
            Filter
          </FormButton>
        </ModalActions>
      </ModalForm>
    </Modal>
  );
};

export default StudentSearchModal;
