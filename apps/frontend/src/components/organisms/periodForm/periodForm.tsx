import { useTranslations } from 'next-intl'

import { PeriodFormClient } from './periodForm.client'

export const PeriodForm = () => {
  const t = useTranslations()

  return <PeriodFormClient endLabel={t('End')} startLabel={t('Start')} />
}
