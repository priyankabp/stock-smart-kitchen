import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Package, AlertTriangle, CheckCircle } from "lucide-react";

export const Dashboard = () => {
  const metrics = [
    {
      title: "Weekly Forecast Accuracy",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      description: "AI prediction accuracy this week"
    },
    {
      title: "Current Stock Level",
      value: "87%",
      change: "Optimal",
      trend: "stable",
      description: "Overall inventory health"
    },
    {
      title: "Waste Reduction",
      value: "23%",
      change: "↓15%",
      trend: "down",
      description: "Reduction vs last month"
    },
    {
      title: "Cost Savings",
      value: "$3,247",
      change: "+$890",
      trend: "up",
      description: "This month vs target"
    }
  ];

  const alerts = [
    { type: "warning", message: "Tomatoes: High demand predicted for weekend", ingredient: "Tomatoes" },
    { type: "success", message: "Beef inventory optimally stocked", ingredient: "Beef" },
    { type: "alert", message: "Lettuce: Consider discount promotion", ingredient: "Lettuce" }
  ];

  const topIngredients = [
    { name: "Ground Beef", usage: 87, trend: "up" },
    { name: "Lettuce", usage: 65, trend: "down" },
    { name: "Tomatoes", usage: 78, trend: "up" },
    { name: "Cheese", usage: 92, trend: "stable" },
    { name: "Onions", usage: 54, trend: "down" }
  ];

  return (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              {metric.trend === "up" && <TrendingUp className="h-4 w-4 text-success" />}
              {metric.trend === "down" && <TrendingDown className="h-4 w-4 text-destructive" />}
              {metric.trend === "stable" && <Package className="h-4 w-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={`${metric.trend === "up" ? "text-success" : metric.trend === "down" ? "text-destructive" : "text-muted-foreground"}`}>
                  {metric.change}
                </span>{" "}
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>AI Alerts & Recommendations</CardTitle>
            <CardDescription>Smart insights for your kitchen operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                {alert.type === "warning" && <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />}
                {alert.type === "success" && <CheckCircle className="h-5 w-5 text-success mt-0.5" />}
                {alert.type === "alert" && <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">{alert.ingredient}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Ingredients */}
        <Card>
          <CardHeader>
            <CardTitle>Top Ingredients Usage</CardTitle>
            <CardDescription>Current week performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topIngredients.map((ingredient, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{ingredient.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{ingredient.usage}%</span>
                    {ingredient.trend === "up" && <TrendingUp className="h-3 w-3 text-success" />}
                    {ingredient.trend === "down" && <TrendingDown className="h-3 w-3 text-destructive" />}
                  </div>
                </div>
                <Progress value={ingredient.usage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};