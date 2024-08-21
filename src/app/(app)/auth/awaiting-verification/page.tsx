import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/lib/shadcn/components/ui/card'

export default function AwaitingVerificationPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Verify your email</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <CardDescription className="text-center">
            <p>
              Check the email you used to register this account and follow the link we sent you to
              verify your account.
            </p>
            <p>You'll be asked to log back in after you verify.</p>
            <p>You can close this tab when you're done.</p>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}
