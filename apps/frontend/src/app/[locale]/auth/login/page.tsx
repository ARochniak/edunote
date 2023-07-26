import { redirect } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Button } from '~/components/molecules/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/molecules/card'
import { Input } from '~/components/molecules/input'

enum LoginInputNames {
  email = 'email',
  password = 'password',
}

export default function LoginPage() {
  async function login(data: FormData) {
    'use server'

    const email = data.get(LoginInputNames.email)
    const password = data.get(LoginInputNames.password)

    const response = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: email?.toString(), password: password?.toString() }),
      headers: {
        'Content-type': 'application/json',
      },
    })

    if (response.ok) redirect('/')
  }

  const t = useTranslations()

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>{t('Login form')}</CardTitle>
      </CardHeader>
      <form action={login}>
        <CardContent className="flex flex-col gap-3">
          <label>
            <div className="mb-1">{t('Email')}</div>
            <Input
              name={LoginInputNames.email}
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              type="email"
              required
            />
          </label>
          <label>
            <div className="mb-1">{t('Password')}</div>
            <Input name={LoginInputNames.password} type="password" required />
          </label>
        </CardContent>
        <CardFooter>
          <Button className="mx-auto uppercase" type="submit">
            {t('Login')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
