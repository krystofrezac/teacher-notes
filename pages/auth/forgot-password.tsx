import { BlitzPage } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"

import forgotPassword from "app/auth/mutations/forgotPassword"
import { ForgotPassword } from "app/auth/validations"
import Form, { FORM_ERROR, OnSubmitResult } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import Layout from "app/core/layouts/Layout"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  return (
    <Layout title="Forgot Your Password?">
      <h1>Forgot your password?</h1>

      {isSuccess ? (
        <div>
          <h2>Request Submitted</h2>
          <p>
            If your email is in our system, you will receive instructions to reset your password
            shortly.
          </p>
        </div>
      ) : (
        <Form
          submitText="Send Reset Password Instructions"
          schema={ForgotPassword}
          initialValues={{ email: "" }}
          onSubmit={async (values): Promise<OnSubmitResult | undefined> => {
            try {
              await forgotPasswordMutation(values)
            } catch (error: any) {
              return {
                [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
              }
            }
          }}
        >
          <LabeledTextField name="email" label="Email" placeholder="Email" />
        </Form>
      )}
    </Layout>
  )
}

export default ForgotPasswordPage
