import { PageShell } from '@/components/page-shell'
import { LoginForm } from '@/components/login-form'

export default function LoginPage() {
  return (
    <PageShell>
      <section className="mx-auto flex max-w-6xl justify-center px-5 py-20 sm:px-6 lg:px-8">
        <LoginForm />
      </section>
    </PageShell>
  )
}
