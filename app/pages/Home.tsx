import { ReactElement } from "react"

import { BlitzPage } from "@blitzjs/auth"

import Layout from "app/core/layouts/Layout"

const HomePage: BlitzPage = () => <button className="btn btn-primary">Landing page</button>

HomePage.getLayout = (page): ReactElement => <Layout title="Home">{page}</Layout>
export default HomePage
