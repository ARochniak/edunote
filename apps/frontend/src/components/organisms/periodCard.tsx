import { Period } from '@prisma/client'

import { numberToTimeString } from '~/utils'

// TODO: Use PascalCase for component file names

export const PeriodCard = ({ startAt, endAt }: Period) => (
  <div className="flex w-40 justify-center rounded-sm bg-violet-500 p-2 text-white">{`${numberToTimeString(
    startAt,
  )} : ${numberToTimeString(endAt)}`}</div>
)
