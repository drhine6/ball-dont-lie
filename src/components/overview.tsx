import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function Overview() {
  return (
    <Card className="my-8 p-4 bg-bw rounded-lg shadow-md">
      <CardHeader>
        <CardTitle>Ball Advantage Rules</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            If both teams use Wilson basketballs: Pick the{' '}
            <span className="font-medium text-green-600">OVER</span>
          </li>
          <li>
            If neither team uses Wilson basketballs: Pick the{' '}
            <span className="font-medium text-blue-600">UNDER</span>
          </li>
          <li>
            If only one team uses Wilson basketballs: Pick the{' '}
            <span className="font-medium">
              team that uses Wilson (ATS)
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
