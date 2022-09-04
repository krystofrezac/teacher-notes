import { FC } from 'react';

import { SubmitHandler } from 'app/core/components/Form';
import FormButton from 'app/core/components/FormButton';
import Modal, { ModalActions, ModalTitle } from 'app/core/components/Modal';
import ModalForm from 'app/core/components/ModalForm';
import TextareaInput from 'app/core/components/TextareaInput';

import LessonFilter from '../validations/lessonFilter';

import { LessonFilterFormProps } from './LessonFilterForm.types';

const LessonFilterForm: FC<LessonFilterFormProps> = props => {
  const handleSubmit: SubmitHandler<typeof LessonFilter> = async values => {
    props.onSubmit(values);
    props.onClose();
  };
  const handleClear = (): void => {
    props.onClear();
    props.onClose();
  };

  return (
    <Modal open={props.open}>
      <ModalTitle>Lessons filter</ModalTitle>
      <ModalForm
        open={props.open}
        initialValues={props.initialValues ?? { description: '' }}
        schema={LessonFilter}
        onSubmit={handleSubmit}
      >
        <TextareaInput name='description' label='Description' />
        <ModalActions>
          <FormButton variant='ghost' onClick={props.onClose}>
            Cancel
          </FormButton>
          <FormButton variant='warning' onClick={handleClear}>
            Clear
          </FormButton>
          <FormButton type='submit' variant='primary'>
            Filter
          </FormButton>
        </ModalActions>
      </ModalForm>
    </Modal>
  );
};

export default LessonFilterForm;
