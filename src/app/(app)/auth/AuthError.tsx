import { AlertCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/lib/shadcn/components/ui/alert'

export function AuthError({ error }: { error: string }) {
  return (
    <div className="mb-8">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    </div>
  )
}
