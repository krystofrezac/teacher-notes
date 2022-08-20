import { Ctx } from 'blitz';

const logout = async (_: any, ctx: Ctx): Promise<void> => {
  return ctx.session.$revoke();
};

export default logout;
