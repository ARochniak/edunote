import * as z from 'zod'

export const formSchema = z.object({
  startAt: z.number(),
  endAt: z.number(),
})

export type FormSchemaType = z.infer<typeof formSchema>
