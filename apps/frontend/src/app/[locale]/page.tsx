import { Period } from '@prisma/client'

import { PeriodCard } from '~/components/organisms/periodCard'
import { PeriodForm } from '~/components/organisms/periodForm'

export default async function Home() {
  const periods: Period[] = await fetch('http://localhost:4000/period', {
    headers: {
      'Content-type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImZpcnN0TmFtZSI6bnVsbCwibGFzdE5hbWUiOm51bGwsImlhdCI6MTY5MDcyNjgxMywiZXhwIjoxNjkxMzMxNjEzfQ.bDc8lHTbz7-j1689varzrZnD-NXgi_vHybcQJA8hjl0',
    },
    // TODO: use revalidate strategy
    cache: 'no-cache',
  }).then(res => res.json())

  return (
    <div className="flex h-screen flex-col items-center justify-between gap-3 md:justify-start">
      <ul className="flex flex-col justify-center gap-4">
        {periods.map(period => (
          <li key={period.id} className="flex justify-center">
            <PeriodCard {...period} />
          </li>
        ))}
      </ul>
      <PeriodForm />
    </div>
  )
}
