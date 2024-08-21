import ResetForm from './ResetForm'

export default function ResetPassword({ searchParams }: { searchParams: { token: string } }) {
  return <ResetForm searchParams={searchParams} />
}
