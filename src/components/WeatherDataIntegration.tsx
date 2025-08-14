import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar } from 'recharts';
import { Cloud, Sun, CloudRain, Thermometer, Wind, Eye, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const WeatherDataIntegration = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState("Disneyland Paris, France");
  const { toast } = useToast();

  // Mock weather forecast data for Disneyland Paris
  const forecastData = [
    { date: 'Mon', temp: 22, humidity: 65, precipitation: 0, windSpeed: 12, visibility: 10, salesImpact: 95 },
    { date: 'Tue', temp: 24, humidity: 58, precipitation: 0, windSpeed: 8, visibility: 10, salesImpact: 105 },
    { date: 'Wed', temp: 19, humidity: 78, precipitation: 15, windSpeed: 18, visibility: 8, salesImpact: 75 },
    { date: 'Thu', temp: 26, humidity: 52, precipitation: 0, windSpeed: 6, visibility: 10, salesImpact: 115 },
    { date: 'Fri', temp: 28, humidity: 48, precipitation: 0, windSpeed: 4, visibility: 10, salesImpact: 125 },
    { date: 'Sat', temp: 25, humidity: 62, precipitation: 5, windSpeed: 10, visibility: 9, salesImpact: 110 },
    { date: 'Sun', temp: 23, humidity: 70, precipitation: 8, windSpeed: 14, visibility: 8, salesImpact: 90 }
  ];

  const currentWeather = {
    temperature: 24,
    condition: "Partly Cloudy",
    humidity: 58,
    windSpeed: 8,
    precipitation: 0,
    visibility: 10,
    uvIndex: 6,
    pressure: 1013
  };

  const weatherImpacts = [
    {
      condition: "Sunny & Hot (>25°C)",
      impact: "Ice cream sales +180%, Cold drinks +120%",
      recommendation: "Increase frozen inventory by 200%",
      icon: Sun,
      color: "text-orange-500"
    },
    {
      condition: "Rainy Day",
      impact: "Hot food sales +45%, Outdoor dining -60%",
      recommendation: "Boost indoor seating capacity prep",
      icon: CloudRain,
      color: "text-blue-500"
    },
    {
      condition: "Windy (>15 km/h)",
      impact: "Outdoor service disruption, Packaged food +25%",
      recommendation: "Prepare more takeaway containers",
      icon: Wind,
      color: "text-gray-500"
    }
  ];

  const handleWeatherSync = async () => {
    setIsLoading(true);
    
    // Simulate API call to weather service
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Weather Data Updated",
        description: "Latest weather forecast integrated successfully",
      });
    }, 2000);
  };

  const getWeatherIcon = (temp: number, precipitation: number) => {
    if (precipitation > 10) return <CloudRain className="h-5 w-5 text-blue-500" />;
    if (temp > 25) return <Sun className="h-5 w-5 text-orange-500" />;
    return <Cloud className="h-5 w-5 text-gray-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Current Weather Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Temperature</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-primary" />
              <span className="text-2xl font-bold">{currentWeather.temperature}°C</span>
            </div>
            <p className="text-xs text-muted-foreground">{currentWeather.condition}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Precipitation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CloudRain className="h-4 w-4 text-blue-500" />
              <span className="text-2xl font-bold">{currentWeather.precipitation}%</span>
            </div>
            <p className="text-xs text-muted-foreground">Humidity: {currentWeather.humidity}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Wind Speed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-gray-500" />
              <span className="text-2xl font-bold">{currentWeather.windSpeed}</span>
              <span className="text-sm text-muted-foreground">km/h</span>
            </div>
            <p className="text-xs text-muted-foreground">Visibility: {currentWeather.visibility}km</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Sales Impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant="default" className="text-lg px-3 py-1">105%</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Above average</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weather API Integration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              Weather Data Source
            </CardTitle>
            <CardDescription>
              Real-time weather integration for {location}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location..."
                className="flex-1"
              />
              <Button 
                onClick={handleWeatherSync}
                disabled={isLoading}
                size="sm"
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Data Source</div>
                <div className="font-semibold">OpenWeatherMap API</div>
              </div>
              <div>
                <div className="text-muted-foreground">Update Frequency</div>
                <div className="font-semibold">Every 15 minutes</div>
              </div>
              <div>
                <div className="text-muted-foreground">Forecast Range</div>
                <div className="font-semibold">7 days ahead</div>
              </div>
              <div>
                <div className="text-muted-foreground">Historical Data</div>
                <div className="font-semibold">5 years available</div>
              </div>
            </div>

            <div className="p-3 bg-muted/50 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Current Conditions Impact</h4>
              <p className="text-xs text-muted-foreground">
                Perfect weather conditions expected to boost outdoor dining by 15% and cold beverage sales by 25%
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Weather-Sales Correlation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              Weather-Sales Correlation
            </CardTitle>
            <CardDescription>
              7-day forecast impact on sales predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <ComposedChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="temp" orientation="left" />
                <YAxis yAxisId="sales" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'temp' ? `${value}°C` :
                    name === 'precipitation' ? `${value}mm` :
                    name === 'salesImpact' ? `${value}%` : value,
                    name === 'temp' ? 'Temperature' :
                    name === 'precipitation' ? 'Rain' :
                    name === 'salesImpact' ? 'Sales Impact' : name
                  ]}
                />
                <Bar yAxisId="sales" dataKey="precipitation" fill="hsl(var(--muted))" opacity={0.6} />
                <Line yAxisId="temp" type="monotone" dataKey="temp" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line yAxisId="sales" type="monotone" dataKey="salesImpact" stroke="hsl(var(--success))" strokeWidth={3} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weather Impact Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Weather Impact Intelligence
          </CardTitle>
          <CardDescription>
            Historical patterns and predictive insights for inventory optimization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {weatherImpacts.map((impact, index) => {
              const IconComponent = impact.icon;
              return (
                <div key={index} className="p-4 rounded-lg border space-y-3">
                  <div className="flex items-center gap-2">
                    <IconComponent className={`h-5 w-5 ${impact.color}`} />
                    <h4 className="font-medium">{impact.condition}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{impact.impact}</p>
                  <div className="p-2 bg-primary/10 rounded text-sm">
                    <strong className="text-primary">Action:</strong> {impact.recommendation}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};