import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Recycle, TrendingDown, Star, Clock } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export const WasteReduction = () => {
  const wasteData = [
    { name: 'Ground Beef', waste: 12, color: '#ef4444' },
    { name: 'Lettuce', waste: 25, color: '#10b981' },
    { name: 'Tomatoes', waste: 18, color: '#f59e0b' },
    { name: 'Cheese', waste: 8, color: '#3b82f6' },
    { name: 'Other', waste: 15, color: '#8b5cf6' }
  ];

  const wasteReductionTrend = [
    { month: 'Jan', waste: 28, cost: 450 },
    { month: 'Feb', waste: 26, cost: 420 },
    { month: 'Mar', waste: 23, cost: 380 },
    { month: 'Apr', waste: 21, cost: 340 },
    { month: 'May', waste: 19, cost: 310 },
    { month: 'Jun', waste: 17, cost: 285 }
  ];

  const aiRecommendations = [
    {
      ingredient: "Iceberg Lettuce",
      amount: "15 heads",
      issue: "Approaching expiry in 2 days",
      suggestions: [
        "Caesar Salad Special - 40% discount",
        "House Salad promotion",
        "Staff meal ingredient"
      ],
      potentialSavings: "$45",
      urgency: "high"
    },
    {
      ingredient: "Roma Tomatoes", 
      amount: "8 lbs",
      issue: "Overstocked - slow moving",
      suggestions: [
        "Fresh Salsa daily special",
        "Tomato soup limited time",
        "Caprese salad promotion"
      ],
      potentialSavings: "$32",
      urgency: "medium"
    },
    {
      ingredient: "Yellow Onions",
      amount: "12 lbs",
      issue: "Quality grade B - still usable",
      suggestions: [
        "Caramelized onion topping",
        "French onion soup",
        "Prep for burger toppings"
      ],
      potentialSavings: "$28",
      urgency: "low"
    }
  ];

  const successStories = [
    {
      title: "Lettuce Waste Elimination",
      description: "AI suggested salad promotion reduced lettuce waste by 85% last week",
      savings: "$127",
      date: "Last week"
    },
    {
      title: "Tomato Recovery Program",
      description: "Overripe tomatoes converted to house-made salsa",
      savings: "$95",
      date: "2 weeks ago"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-5 w-5 text-success" />
              <span className="font-medium">Monthly Waste Reduction</span>
            </div>
            <div className="text-3xl font-bold text-success">23%</div>
            <p className="text-sm text-muted-foreground">vs previous month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Recycle className="h-5 w-5 text-primary" />
              <span className="font-medium">Cost Savings</span>
            </div>
            <div className="text-3xl font-bold text-primary">$1,247</div>
            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <ChefHat className="h-5 w-5 text-accent" />
              <span className="font-medium">Active Recommendations</span>
            </div>
            <div className="text-3xl font-bold text-accent">3</div>
            <p className="text-sm text-muted-foreground">Requiring attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Waste Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Current Waste Breakdown</CardTitle>
            <CardDescription>Percentage by ingredient type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={wasteData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="waste"
                  label={({ name, waste }) => `${name}: ${waste}%`}
                >
                  {wasteData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Waste Reduction Trend */}
        <Card>
          <CardHeader>
            <CardTitle>6-Month Improvement Trend</CardTitle>
            <CardDescription>Waste percentage and cost impact</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={wasteReductionTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'waste' ? `${value}%` : `$${value}`, 
                    name === 'waste' ? 'Waste %' : 'Cost'
                  ]} 
                />
                <Bar dataKey="waste" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="h-5 w-5" />
            AI Waste Reduction Recommendations
          </CardTitle>
          <CardDescription>Smart suggestions to minimize waste and maximize revenue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {aiRecommendations.map((rec, index) => (
            <div key={index} className="p-6 rounded-lg border space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-lg">{rec.ingredient}</h4>
                  <p className="text-muted-foreground">{rec.amount} • {rec.issue}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getUrgencyColor(rec.urgency)}>
                    {rec.urgency} priority
                  </Badge>
                  <Badge variant="outline" className="text-success border-success">
                    Save {rec.potentialSavings}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium text-sm">AI Suggestions:</h5>
                <div className="grid gap-2">
                  {rec.suggestions.map((suggestion, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-accent" />
                      <span>{suggestion}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Implement Suggestions
                </Button>
                <Button size="sm" variant="outline">
                  Mark as Used
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Success Stories */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Success Stories</CardTitle>
          <CardDescription>AI-driven waste reduction wins</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {successStories.map((story, index) => (
            <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-success/5 border border-success/20">
              <div className="bg-success/10 p-2 rounded-full">
                <Recycle className="h-4 w-4 text-success" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{story.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{story.description}</p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="font-medium text-success">Saved: {story.savings}</span>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {story.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};