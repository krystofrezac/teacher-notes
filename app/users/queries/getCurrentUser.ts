import { Ctx } from "blitz"
import db, { User } from "db"

export type CurrentUser = Pick<User, "id" | "name" | "email" | "role">

const getCurrentUser = async (_ = null, { session }: Ctx): Promise<CurrentUser | null> => {
  if (!session.userId) return null

  const user = await db.user.findFirst({
    where: { id: session.userId as number },
    select: { id: true, name: true, email: true, role: true },
  })

  return user
}

export default getCurrentUser
