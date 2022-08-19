import { BlitzPage } from "@blitzjs/next"
import { useRouter } from "next/router"

import { LoginForm } from "app/auth/components/LoginForm"
import Layout from "app/core/layouts/Layout"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Layout title="Log In">
      <LoginForm
        onSuccess={(_user): Promise<boolean> => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"

          return router.push(next)
        }}
      />
    </Layout>
  )
}

export default LoginPage
