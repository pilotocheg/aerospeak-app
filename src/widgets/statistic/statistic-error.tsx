import { AlertCircle, RefreshCw } from 'lucide-react'

import { Button } from '@/shared/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card'

type StatisticErrorProps = {
  onRetry: () => void
}

export const StatisticError = ({ onRetry }: StatisticErrorProps) => (
  <Card className="text-center">
    <CardHeader>
      <AlertCircle className="mx-auto h-8 w-8 text-destructive mb-3" />
      <CardTitle>Could not load statistics</CardTitle>
      <CardDescription>We couldn't fetch your progress. Please try again.</CardDescription>
    </CardHeader>
    <CardFooter>
      <Button onClick={onRetry}>
        <RefreshCw className="mr-2 h-4 w-4" />
        Retry
      </Button>
    </CardFooter>
  </Card>
)
