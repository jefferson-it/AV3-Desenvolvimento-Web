import z from 'zod';
import { capitalizeText } from '../../utils/str.js';

export const zPostsCreate = z.object({
    title: z.string().transform(v => capitalizeText(v)),
    content: z.string().max(2500)
});