-- Create tables for sales data, weather data, and ML predictions
CREATE TABLE public.sales_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  product_category TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  revenue DECIMAL(10,2) NOT NULL,
  weather_condition TEXT,
  temperature DECIMAL(5,2),
  humidity DECIMAL(5,2),
  visitor_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.weather_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  location TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  temperature DECIMAL(5,2) NOT NULL,
  humidity DECIMAL(5,2) NOT NULL,
  precipitation DECIMAL(5,2) DEFAULT 0,
  wind_speed DECIMAL(5,2) DEFAULT 0,
  condition TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.ml_predictions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  model_name TEXT NOT NULL,
  prediction_date DATE NOT NULL,
  location TEXT NOT NULL,
  product_category TEXT NOT NULL,
  predicted_demand INTEGER NOT NULL,
  confidence_score DECIMAL(5,4) NOT NULL,
  actual_demand INTEGER,
  accuracy_score DECIMAL(5,4),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.ml_models (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  version TEXT NOT NULL,
  azure_endpoint TEXT NOT NULL,
  model_type TEXT NOT NULL,
  accuracy DECIMAL(5,4),
  is_active BOOLEAN DEFAULT false,
  training_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.sales_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weather_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ml_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ml_models ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is operational data)
CREATE POLICY "Allow public read access to sales_data" 
ON public.sales_data FOR SELECT USING (true);

CREATE POLICY "Allow public read access to weather_data" 
ON public.weather_data FOR SELECT USING (true);

CREATE POLICY "Allow public read access to ml_predictions" 
ON public.ml_predictions FOR SELECT USING (true);

CREATE POLICY "Allow public read access to ml_models" 
ON public.ml_models FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX idx_sales_data_timestamp ON public.sales_data(timestamp);
CREATE INDEX idx_sales_data_location_category ON public.sales_data(location, product_category);
CREATE INDEX idx_weather_data_timestamp ON public.weather_data(timestamp);
CREATE INDEX idx_weather_data_location ON public.weather_data(location);
CREATE INDEX idx_ml_predictions_date ON public.ml_predictions(prediction_date);
CREATE INDEX idx_ml_predictions_location_category ON public.ml_predictions(location, product_category);