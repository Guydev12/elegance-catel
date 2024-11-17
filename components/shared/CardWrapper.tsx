import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'

type Props = {
    children:React.ReactNode
}

const CardWrapper = (props: Props) => {
  return (
    <Card>
        <CardHeader>{props.children}</CardHeader>
        <CardContent></CardContent>
    </Card>
  )
}

export default CardWrapper