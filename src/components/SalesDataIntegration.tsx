import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Database, TrendingUp, Upload, RefreshCw, Activity } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const SalesDataIntegration = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dataStatus, setDataStatus] = useState("ready");
  const { toast } = useToast();

  // Mock sales data for Disneyland Paris
  const salesData = [
    { hour: '9:00', burgers: 450, fries: 680, drinks: 920, temp: 18, visitors: 12000 },
    { hour: '10:00', burgers: 780, fries: 1200, drinks: 1450, temp: 19, visitors: 18500 },
    { hour: '11:00', burgers: 1200, fries: 1800, drinks: 2100, temp: 21, visitors: 25000 },
    { hour: '12:00', burgers: 2100, fries: 3200, drinks: 3800, temp: 23, visitors: 35000 },
    { hour: '13:00', burgers: 2400, fries: 3600, drinks: 4200, temp: 24, visitors: 38000 },
    { hour: '14:00', burgers: 2200, fries: 3300, drinks: 3900, temp: 25, visitors: 36000 },
    { hour: '15:00', burgers: 1800, fries: 2700, drinks: 3200, temp: 26, visitors: 32000 },
    { hour: '16:00', burgers: 1500, fries: 2250, drinks: 2700, temp: 25, visitors: 28000 }
  ];

  const dataMetrics = [
    { metric: "Total Records", value: "12.5M", change: "+2.3M", status: "up" },
    { metric: "Processing Speed", value: "850K/min", change: "15% faster", status: "up" },
    { metric: "Data Quality", value: "99.2%", change: "+0.3%", status: "up" },
    { metric: "Storage Used", value: "2.8TB", change: "+180GB", status: "stable" }
  ];

  const handleDataSync = async () => {
    setIsProcessing(true);
    setUploadProgress(0);
    
    // Simulate data processing
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setDataStatus("synced");
          toast({
            title: "Data Sync Complete",
            description: "4 years of historical sales data processed successfully",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* Data Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {dataMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription className="text-xs">{metric.metric}</CardDescription>
                <Badge variant={metric.status === "up" ? "default" : "secondary"} className="text-xs">
                  {metric.change}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Data Processing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Sales Data Pipeline
            </CardTitle>
            <CardDescription>
              Processing 4 years of Disneyland Paris sales data (millions of records daily)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Data Status:</span>
              <Badge variant={dataStatus === "synced" ? "default" : "secondary"}>
                {dataStatus === "synced" ? "Live Sync" : "Ready"}
              </Badge>
            </div>
            
            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing records...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Daily Records</div>
                <div className="font-semibold">2.1M - 3.8M</div>
              </div>
              <div>
                <div className="text-muted-foreground">Peak Hour Volume</div>
                <div className="font-semibold">450K records/hr</div>
              </div>
              <div>
                <div className="text-muted-foreground">Data Sources</div>
                <div className="font-semibold">POS, Mobile, Kiosks</div>
              </div>
              <div>
                <div className="text-muted-foreground">Update Frequency</div>
                <div className="font-semibold">Real-time</div>
              </div>
            </div>

            <Button 
              onClick={handleDataSync} 
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Processing Data...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Sync Historical Data
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Real-time Sales Visualization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Live Sales & Visitor Data
            </CardTitle>
            <CardDescription>
              Hourly sales correlated with visitor count and weather
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `${typeof value === 'number' ? value.toLocaleString() : value}`,
                    name === 'burgers' ? 'Burgers' : 
                    name === 'fries' ? 'Fries' : 
                    name === 'drinks' ? 'Drinks' : 
                    name === 'visitors' ? 'Visitors' : name
                  ]}
                />
                <Area type="monotone" dataKey="visitors" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.1} />
                <Area type="monotone" dataKey="burgers" stroke="hsl(var(--success))" fill="hsl(var(--success))" fillOpacity={0.3} />
                <Area type="monotone" dataKey="fries" stroke="hsl(var(--warning))" fill="hsl(var(--warning))" fillOpacity={0.3} />
                <Area type="monotone" dataKey="drinks" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sales Correlation Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Sales Pattern Analysis
          </CardTitle>
          <CardDescription>
            AI-driven insights from 4 years of historical sales data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border space-y-2">
              <h4 className="font-medium text-primary">Peak Season Impact</h4>
              <p className="text-sm text-muted-foreground">
                Summer months show 180% increase in cold beverage sales when temperature exceeds 25°C
              </p>
              <Badge variant="default">High Confidence</Badge>
            </div>
            <div className="p-4 rounded-lg border space-y-2">
              <h4 className="font-medium text-primary">Weather Correlation</h4>
              <p className="text-sm text-muted-foreground">
                Rainy days reduce outdoor food sales by 35% but increase indoor restaurant traffic by 28%
              </p>
              <Badge variant="secondary">Medium Confidence</Badge>
            </div>
            <div className="p-4 rounded-lg border space-y-2">
              <h4 className="font-medium text-primary">Visitor Flow Pattern</h4>
              <p className="text-sm text-muted-foreground">
                12:00-14:00 accounts for 42% of daily food sales, requiring 3x normal ingredient stock
              </p>
              <Badge variant="default">High Confidence</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};