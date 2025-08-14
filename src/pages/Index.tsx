import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Dashboard } from "@/components/Dashboard";
import { DemandForecasting } from "@/components/DemandForecasting";
import { InventoryMonitoring } from "@/components/InventoryMonitoring";
import { WasteReduction } from "@/components/WasteReduction";
import { Brain, Utensils } from "lucide-react";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "forecasting":
        return <DemandForecasting />;
      case "inventory":
        return <InventoryMonitoring />;
      case "waste":
        return <WasteReduction />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Smart Kitchen AI</h1>
                <p className="text-sm text-muted-foreground">Inventory & Waste Reduction Platform</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Utensils className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Quick Service Restaurant</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Navigation 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
