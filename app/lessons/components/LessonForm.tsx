import { FC } from 'react';

import { SubmitHandler } from 'react-hook-form';

import { FORM_ERROR } from 'app/core/components/Form';
import FormButton from 'app/core/components/FormButton';
import Modal, { ModalActions, ModalTitle } from 'app/core/components/Modal';
import ModalForm from 'app/core/components/ModalForm';
import TextareaInput from 'app/core/components/TextareaInput';
import TextInput from 'app/core/components/TextInput';

import Lesson from '../validations/lesson';

import { LessonFormProps, LessonFormValues } from './LessonForm.types';

const defaultInitialValues = { date: '', description: '' };

const LessonForm: FC<LessonFormProps> = props => {
  const submitHandler: SubmitHandler<LessonFormValues> = async values => {
    try {
      await props.onSubmit(values);
      props.onClose();
    } catch (error) {
      return {
        [FORM_ERROR]: `Sorry, we had an unexpected error. Please try again. - ${error.toString()}`,
      };
    }
  };

  return (
    <Modal open={props.open}>
      <ModalTitle>Create lesson</ModalTitle>
      <ModalForm
        schema={Lesson}
        initialValues={props.initialValues ?? defaultInitialValues}
        open={props.open}
        onSubmit={submitHandler}
      >
        <TextInput type='date' name='date' label='Date' />
        <TextareaInput name='description' label='Description' />

        <ModalActions>
          <FormButton variant='ghost' onClick={props.onClose}>
            Cancel
          </FormButton>
          <FormButton type='submit' variant='primary'>
            {props.submitText}
          </FormButton>
        </ModalActions>
      </ModalForm>
    </Modal>
  );
};

export default LessonForm;
