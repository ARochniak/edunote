'use server'

import { revalidatePath } from 'next/cache'

import { FormSchemaType } from './schema'

export const addPeriod = (form: FormSchemaType) => {
  revalidatePath('/[locale]/period')

  return fetch(new URL('/period', process.env.BASE_API), {
    method: 'POST',
    body: JSON.stringify(form),
    headers: {
      'Content-type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImZpcnN0TmFtZSI6bnVsbCwibGFzdE5hbWUiOm51bGwsImlhdCI6MTY5MDcyNjgxMywiZXhwIjoxNjkxMzMxNjEzfQ.bDc8lHTbz7-j1689varzrZnD-NXgi_vHybcQJA8hjl0',
    },
  })
    .then(res => res.json())
    .catch(err => err)
}
