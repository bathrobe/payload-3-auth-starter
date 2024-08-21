import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/lib/shadcn/components/ui/card'

export default function AuthCardWrapper({
  children,
  title,
  description,
  footerLinks,
}: {
  children: React.ReactNode
  title: string
  description: string
  footerLinks: any
}) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">{children}</CardContent>
      <CardFooter className="flex flex-col space-y-4 rounded-b-lg">{footerLinks}</CardFooter>
    </Card>
  )
}
