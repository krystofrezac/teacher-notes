import z from 'zod';

const name = z.string().min(1);
const Student = z.object({ firstName: name, lastName: name });

export default Student;
