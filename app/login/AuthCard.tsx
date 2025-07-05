import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function AuthCard({
  header,
  children,
}: {
  header: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Card className="shadow-xl border-0" style={{ backgroundColor: "white" }}>
      <CardHeader className="text-center pb-6">{header}</CardHeader>
      <CardContent className="px-8 pb-8">{children}</CardContent>
    </Card>
  )
}
