import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, Package, ChefHat, TrendingUp } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const sections = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'forecasting', label: 'Demand Forecasting', icon: TrendingUp },
    { id: 'inventory', label: 'Inventory Monitor', icon: Package },
    { id: 'waste', label: 'Waste Reduction', icon: ChefHat },
  ];

  return (
    <Card className="p-6 mb-8">
      <div className="flex flex-wrap gap-4">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "outline"}
              onClick={() => onSectionChange(section.id)}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {section.label}
            </Button>
          );
        })}
      </div>
    </Card>
  );
};