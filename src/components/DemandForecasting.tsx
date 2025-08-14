import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart, Area, AreaChart } from 'recharts';
import { TrendingUp, Brain, Calendar, Database, Cloud } from "lucide-react";
import { SalesDataIntegration } from "./SalesDataIntegration";
import { WeatherDataIntegration } from "./WeatherDataIntegration";

export const DemandForecasting = () => {
  // Enhanced forecast data with weather and sales correlation
  const forecastData = [
    { day: 'Mon', beef: 85, chicken: 65, lettuce: 45, predicted: 78, actual: 82, weatherImpact: 95, salesVolume: 12400, temp: 22 },
    { day: 'Tue', beef: 92, chicken: 78, lettuce: 52, predicted: 85, actual: 89, weatherImpact: 105, salesVolume: 15600, temp: 24 },
    { day: 'Wed', beef: 78, chicken: 82, lettuce: 38, predicted: 75, actual: 73, weatherImpact: 75, salesVolume: 9800, temp: 19 },
    { day: 'Thu', beef: 105, chicken: 95, lettuce: 62, predicted: 98, actual: 102, weatherImpact: 115, salesVolume: 18200, temp: 26 },
    { day: 'Fri', beef: 125, chicken: 110, lettuce: 78, predicted: 118, actual: 122, weatherImpact: 125, salesVolume: 21500, temp: 28 },
    { day: 'Sat', beef: 145, chicken: 125, lettuce: 92, predicted: 135, actual: 140, weatherImpact: 110, salesVolume: 25800, temp: 25 },
    { day: 'Sun', beef: 135, chicken: 115, lettuce: 85, predicted: 125, actual: 0, weatherImpact: 90, salesVolume: 19200, temp: 23 }
  ];

  // Multi-factor prediction data combining sales history, weather, and events
  const multiFactorData = [
    { factor: 'Historical Sales', weight: 45, accuracy: 89.2, impact: 'high' },
    { factor: 'Weather Forecast', weight: 25, accuracy: 94.1, impact: 'high' },
    { factor: 'Park Events', weight: 15, accuracy: 87.3, impact: 'medium' },
    { factor: 'Seasonal Trends', weight: 10, accuracy: 91.8, impact: 'medium' },
    { factor: 'Day of Week', weight: 5, accuracy: 95.6, impact: 'low' }
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
      title: "Weather-Sales Correlation Detected",
      description: "Hot weather (28°C Friday) will boost cold beverage sales by 45%",
      confidence: "High",
      action: "Increase ice cream inventory by 200% for weekend",
      source: "Weather + 4yr Sales Data"
    },
    {
      title: "Peak Season Pattern Active",
      description: "Summer visitor surge: 38K+ daily visitors expected",
      confidence: "High", 
      action: "Scale up prep teams by 40% during 12-14h peak",
      source: "Historical Sales Pattern"
    },
    {
      title: "Rain Day Adjustment",
      description: "Wednesday rain forecast: outdoor dining -60%, hot food +35%",
      confidence: "Medium",
      action: "Boost indoor seating prep, increase soup/hot meal inventory",
      source: "Weather Integration"
    },
    {
      title: "Multi-Model Ensemble Updated",
      description: "LSTM + Prophet + Weather models combined for 96.2% accuracy",
      confidence: "System",
      action: "New ensemble model deployed with weather correlation",
      source: "AI Model Enhancement"
    }
  ];

  return (
    <div className="space-y-8">
      <Tabs defaultValue="forecasting" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="forecasting" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            AI Forecasting
          </TabsTrigger>
          <TabsTrigger value="sales-data" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Sales Integration
          </TabsTrigger>
          <TabsTrigger value="weather-data" className="flex items-center gap-2">
            <Cloud className="h-4 w-4" />
            Weather Data
          </TabsTrigger>
        </TabsList>

        <TabsContent value="forecasting" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Multi-Factor Demand Forecast */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Multi-Factor Demand Forecast (Weather + Sales + Events)
                </CardTitle>
                <CardDescription>AI ensemble combining 4 years of sales data with real-time weather</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="demand" />
                    <YAxis yAxisId="temp" orientation="right" />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'temp' ? `${value}°C` :
                        name === 'salesVolume' ? `${(value as number).toLocaleString()} orders` :
                        name === 'weatherImpact' ? `${value}% impact` :
                        `${value} units`,
                        name === 'predicted' ? 'AI Prediction' :
                        name === 'actual' ? 'Actual Usage' :
                        name === 'temp' ? 'Temperature' :
                        name === 'salesVolume' ? 'Daily Orders' :
                        name === 'weatherImpact' ? 'Weather Impact' : 
                        String(name).charAt(0).toUpperCase() + String(name).slice(1)
                      ]}
                    />
                    <Area yAxisId="demand" type="monotone" dataKey="salesVolume" fill="hsl(var(--muted))" fillOpacity={0.3} stroke="none" />
                    <Line yAxisId="demand" type="monotone" dataKey="predicted" stroke="hsl(var(--primary))" strokeWidth={4} strokeDasharray="8 4" />
                    <Line yAxisId="demand" type="monotone" dataKey="actual" stroke="hsl(var(--success))" strokeWidth={3} />
                    <Line yAxisId="demand" type="monotone" dataKey="weatherImpact" stroke="hsl(var(--warning))" strokeWidth={2} opacity={0.8} />
                    <Line yAxisId="temp" type="monotone" dataKey="temp" stroke="hsl(var(--destructive))" strokeWidth={2} opacity={0.6} />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Prediction Model Weights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Multi-Factor Model Weights
                </CardTitle>
                <CardDescription>AI ensemble model factor importance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={multiFactorData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 50]} />
                    <YAxis dataKey="factor" type="category" width={100} fontSize={12} />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'weight' ? `${value}%` : `${value}%`,
                        name === 'weight' ? 'Model Weight' : 'Accuracy'
                      ]}
                    />
                    <Bar dataKey="weight" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Enhanced Model Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Enhanced AI Model Performance
                </CardTitle>
                <CardDescription>Weather-enhanced prediction accuracy by ingredient</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={accuracyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ingredient" angle={-45} textAnchor="end" height={80} />
                    <YAxis domain={[85, 100]} />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Accuracy']}
                      labelFormatter={(label) => `${label} (Weather-Enhanced)`}
                    />
                    <Bar dataKey="accuracy" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 p-3 bg-success/10 rounded-lg">
                  <p className="text-sm font-medium text-success">
                    ✨ Weather integration improved accuracy by average 5.2%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Cold beverage predictions now 98.3% accurate during hot weather events
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced AI Insights with Multi-Source Data */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Multi-Source AI Insights & Actions
                </CardTitle>
                <CardDescription>Smart recommendations from sales history, weather data, and event patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="p-4 rounded-lg border space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{insight.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {insight.source}
                        </Badge>
                        <Badge variant={insight.confidence === "High" ? "default" : insight.confidence === "Medium" ? "secondary" : "outline"}>
                          {insight.confidence}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                    <div className="p-2 bg-primary/10 rounded text-sm">
                      <strong className="text-primary">Action Required:</strong> {insight.action}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales-data">
          <SalesDataIntegration />
        </TabsContent>

        <TabsContent value="weather-data">
          <WeatherDataIntegration />
        </TabsContent>
      </Tabs>
    </div>
  );
};