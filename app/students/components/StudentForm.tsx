import { FC } from 'react';

import { FORM_ERROR, SubmitHandler } from 'app/core/components/Form';
import FormButton from 'app/core/components/FormButton';
import Modal, { ModalActions, ModalTitle } from 'app/core/components/Modal';
import ModalForm from 'app/core/components/ModalForm';
import TextInput from 'app/core/components/TextInput';
import useDefinedValue from 'app/core/hooks/useDefinedValue';

import Student from '../validations/students';

import { StudentFormProps } from './StudentForm.types';

const defaultInitialValues = { firstName: '', lastName: '' };

const StudentForm: FC<StudentFormProps> = props => {
  const submitText = useDefinedValue(props.submitText);

  const handleSubmit: SubmitHandler<typeof Student> = async values => {
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
      <ModalTitle>{submitText} student</ModalTitle>
      <ModalForm
        open={props.open}
        schema={Student}
        initialValues={props.initialValues ?? defaultInitialValues}
        onSubmit={handleSubmit}
      >
        <TextInput name='firstName' label='First name' />
        <TextInput name='lastName' label='Last name' />

        <ModalActions>
          <FormButton variant='ghost' onClick={props.onClose}>
            Cancel
          </FormButton>
          <FormButton type='submit' variant='primary'>
            {submitText}
          </FormButton>
        </ModalActions>
      </ModalForm>
    </Modal>
  );
};

export default StudentForm;
