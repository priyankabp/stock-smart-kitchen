import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Package, AlertCircle, RefreshCw, Truck, CheckCircle } from "lucide-react";

export const InventoryMonitoring = () => {
  const inventoryItems = [
    {
      name: "Ground Beef (80/20)",
      current: 45,
      minimum: 30,
      maximum: 80,
      unit: "lbs",
      status: "good",
      supplier: "Premium Meats Co.",
      lastOrdered: "2 days ago",
      autoOrder: true
    },
    {
      name: "Iceberg Lettuce",
      current: 8,
      minimum: 15,
      maximum: 40,
      unit: "heads",
      status: "low",
      supplier: "Fresh Farms Ltd.",
      lastOrdered: "5 days ago",
      autoOrder: true
    },
    {
      name: "Roma Tomatoes",
      current: 25,
      minimum: 20,
      maximum: 50,
      unit: "lbs",
      status: "optimal",
      supplier: "Garden Fresh",
      lastOrdered: "1 day ago",
      autoOrder: false
    },
    {
      name: "Cheddar Cheese",
      current: 12,
      minimum: 8,
      maximum: 25,
      unit: "lbs",
      status: "good",
      supplier: "Dairy Best Inc.",
      lastOrdered: "3 days ago",
      autoOrder: true
    },
    {
      name: "Yellow Onions",
      current: 35,
      minimum: 25,
      maximum: 60,
      unit: "lbs",
      status: "overstocked",
      supplier: "Valley Produce",
      lastOrdered: "6 days ago",
      autoOrder: false
    }
  ];

  const pendingOrders = [
    {
      item: "Iceberg Lettuce",
      quantity: "20 heads",
      supplier: "Fresh Farms Ltd.",
      eta: "Tomorrow 9 AM",
      status: "shipped"
    },
    {
      item: "Ground Beef",
      quantity: "40 lbs",
      supplier: "Premium Meats Co.",
      eta: "Today 2 PM",
      status: "processing"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "low": return "destructive";
      case "optimal": return "default";
      case "good": return "secondary";
      case "overstocked": return "outline";
      default: return "outline";
    }
  };

  const getProgressValue = (current: number, minimum: number, maximum: number) => {
    return (current / maximum) * 100;
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "low": return "bg-destructive";
      case "optimal": return "bg-primary";
      case "good": return "bg-success";
      case "overstocked": return "bg-warning";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium">Low Stock</span>
            </div>
            <div className="text-2xl font-bold mt-2">1</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm font-medium">Optimal</span>
            </div>
            <div className="text-2xl font-bold mt-2">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium">Overstocked</span>
            </div>
            <div className="text-2xl font-bold mt-2">1</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Pending Orders</span>
            </div>
            <div className="text-2xl font-bold mt-2">2</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Inventory */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Real-Time Inventory</CardTitle>
            <CardDescription>Current stock levels with auto-order thresholds</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {inventoryItems.map((item, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.current} {item.unit} • Min: {item.minimum} • Max: {item.maximum}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                    {item.autoOrder && (
                      <Badge variant="outline" className="text-xs">
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Auto
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <Progress 
                    value={getProgressValue(item.current, item.minimum, item.maximum)} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{item.supplier}</span>
                    <span>Last ordered: {item.lastOrdered}</span>
                  </div>
                </div>
                {item.status === "low" && (
                  <Button size="sm" variant="outline" className="w-full">
                    Order Now ({item.maximum - item.current} {item.unit})
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Orders</CardTitle>
            <CardDescription>Auto-generated and manual orders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingOrders.map((order, index) => (
              <div key={index} className="p-4 rounded-lg border space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{order.item}</h4>
                  <Badge variant={order.status === "shipped" ? "default" : "secondary"}>
                    {order.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{order.quantity}</p>
                <p className="text-sm">{order.supplier}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-primary" />
                  <span className="font-medium">ETA: {order.eta}</span>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Package className="h-4 w-4 mr-2" />
              Create Manual Order
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};