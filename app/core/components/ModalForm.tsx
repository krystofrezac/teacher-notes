import React, { useEffect, useRef, useState } from 'react';

import Form, { FormPropsDefaultS } from './Form';
import { MODAL_TRANSITION_DURATION } from './Modal';
import { ModalFormProps } from './ModalForm.types';

/**
 * Use in modals instead of Form
 * Handles changes between initial values so the form doesn't change when modal closes
 */
const ModalForm = <S extends FormPropsDefaultS>(
  props: ModalFormProps<S>,
): React.ReactElement => {
  const { open, initialValues: propsInitialValues, ...formProps } = props;

  const [initialValues, setInitialsValues] = useState(propsInitialValues);
  const formClearError = useRef(() => {});

  useEffect(() => {
    // Keeps the same errors during closing
    formClearError.current();

    const currentInitialValues = propsInitialValues;
    setTimeout(
      () => {
        setInitialsValues(currentInitialValues);
      },
      !open ? MODAL_TRANSITION_DURATION : 0,
    );
  }, [open, propsInitialValues]);

  return (
    <Form
      initialValues={initialValues}
      clearErrorsFunction={formClearError}
      {...formProps}
      submitResetTimeout={MODAL_TRANSITION_DURATION}
    />
  );
};

export default ModalForm;
