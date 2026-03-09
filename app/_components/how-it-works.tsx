import { Search, ShoppingCart, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';

const steps = [
  {
    step: 1,
    title: 'Choose Your Plan',
    description:
      'Browse our selection of eSIM plans and pick the one that fits your destination and data needs.',
    icon: Search,
  },
  {
    step: 2,
    title: 'Purchase & Download',
    description:
      'Complete your purchase and receive your eSIM profile instantly via QR code or direct install.',
    icon: ShoppingCart,
  },
  {
    step: 3,
    title: 'Activate & Connect',
    description:
      'Scan the QR code with your phone, activate the plan, and start using data right away.',
    icon: Zap,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-muted/50 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
          <p className="text-muted-foreground mt-3">Get connected in three simple steps</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map(({ step, title, description, icon: Icon }) => (
            <Card key={step}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="size-10 rounded-lg">
                    <Icon className="size-5" />
                  </Badge>
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground text-xs">Step {step}</span>
                    <CardTitle className="text-lg">{title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
