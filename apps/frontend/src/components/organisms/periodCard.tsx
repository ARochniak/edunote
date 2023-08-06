import { MdClose } from 'react-icons/md'
import { Period } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { Button } from '~/components/molecules/button'
import { numberToTimeString } from '~/utils'

// TODO: Use PascalCase for component file names

export const PeriodCard = ({ startAt, endAt, id }: Period) => {
  const deletePeriod = async () => {
    'use server'

    const res = await fetch(new URL(`/period/${id}`, process.env.BASE_API), {
      method: 'DELETE',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImZpcnN0TmFtZSI6bnVsbCwibGFzdE5hbWUiOm51bGwsImlhdCI6MTY5MTIzODk4OCwiZXhwIjoxNjkxODQzNzg4fQ.ARr7diFitWkXdCpDiR0RQOaISXDHkYcmQAoGkW5-Pes',
      },
    }).then(({ status, ok }) => ({ status, ok }))

    revalidatePath('/[locale]/period')

    return res
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex w-40 justify-center rounded-sm bg-violet-500 p-2 text-white">
        {`${numberToTimeString(startAt)} : ${numberToTimeString(endAt)}`}
      </div>
      <form action={deletePeriod}>
        <Button size="icon" variant="outline">
          <MdClose />
        </Button>
      </form>
    </div>
  )
}
