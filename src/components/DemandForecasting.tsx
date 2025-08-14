import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Brain, Calendar } from "lucide-react";

export const DemandForecasting = () => {
  const forecastData = [
    { day: 'Mon', beef: 85, chicken: 65, lettuce: 45, predicted: 78, actual: 82 },
    { day: 'Tue', beef: 92, chicken: 78, lettuce: 52, predicted: 85, actual: 89 },
    { day: 'Wed', beef: 78, chicken: 82, lettuce: 38, predicted: 75, actual: 73 },
    { day: 'Thu', beef: 105, chicken: 95, lettuce: 62, predicted: 98, actual: 102 },
    { day: 'Fri', beef: 125, chicken: 110, lettuce: 78, predicted: 118, actual: 122 },
    { day: 'Sat', beef: 145, chicken: 125, lettuce: 92, predicted: 135, actual: 140 },
    { day: 'Sun', beef: 135, chicken: 115, lettuce: 85, predicted: 125, actual: 0 }
  ];

  const accuracyData = [
    { ingredient: 'Ground Beef', accuracy: 94.2, color: '#3b82f6' },
    { ingredient: 'Chicken', accuracy: 91.8, color: '#10b981' },
    { ingredient: 'Lettuce', accuracy: 88.5, color: '#f59e0b' },
    { ingredient: 'Tomatoes', accuracy: 96.1, color: '#ef4444' },
    { ingredient: 'Cheese', accuracy: 92.3, color: '#8b5cf6' }
  ];

  const insights = [
    {
      title: "Weekend Surge Predicted",
      description: "25% increase in beef demand expected this weekend",
      confidence: "High",
      action: "Order +30 lbs ground beef by Thursday"
    },
    {
      title: "Seasonal Trend Alert",
      description: "Lettuce consumption dropping 15% week-over-week",
      confidence: "Medium",
      action: "Reduce lettuce orders by 20%"
    },
    {
      title: "AI Model Update",
      description: "LSTM model retrained with latest 90-day data",
      confidence: "System",
      action: "Forecast accuracy improved by 3.2%"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Demand Forecast Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              7-Day Demand Forecast
            </CardTitle>
            <CardDescription>AI-powered predictions vs actual usage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="predicted" stroke="hsl(var(--primary))" strokeWidth={3} strokeDasharray="5 5" />
                <Line type="monotone" dataKey="actual" stroke="hsl(var(--success))" strokeWidth={2} />
                <Line type="monotone" dataKey="beef" stroke="hsl(var(--destructive))" strokeWidth={1} opacity={0.6} />
                <Line type="monotone" dataKey="chicken" stroke="hsl(var(--warning))" strokeWidth={1} opacity={0.6} />
                <Line type="monotone" dataKey="lettuce" stroke="hsl(var(--secondary))" strokeWidth={1} opacity={0.6} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Model Accuracy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Model Accuracy
            </CardTitle>
            <CardDescription>Prediction accuracy by ingredient</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ingredient" angle={-45} textAnchor="end" height={80} />
                <YAxis domain={[80, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, 'Accuracy']} />
                <Bar dataKey="accuracy" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              AI Insights & Actions
            </CardTitle>
            <CardDescription>Smart recommendations from time-series analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="p-4 rounded-lg border space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{insight.title}</h4>
                  <Badge variant={insight.confidence === "High" ? "default" : insight.confidence === "Medium" ? "secondary" : "outline"}>
                    {insight.confidence}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
                <p className="text-sm font-medium text-primary">{insight.action}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};