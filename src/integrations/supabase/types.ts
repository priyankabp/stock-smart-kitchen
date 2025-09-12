export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ml_models: {
        Row: {
          accuracy: number | null
          azure_endpoint: string
          created_at: string
          id: string
          is_active: boolean | null
          model_type: string
          name: string
          training_date: string | null
          version: string
        }
        Insert: {
          accuracy?: number | null
          azure_endpoint: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          model_type: string
          name: string
          training_date?: string | null
          version: string
        }
        Update: {
          accuracy?: number | null
          azure_endpoint?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          model_type?: string
          name?: string
          training_date?: string | null
          version?: string
        }
        Relationships: []
      }
      ml_predictions: {
        Row: {
          accuracy_score: number | null
          actual_demand: number | null
          confidence_score: number
          created_at: string
          id: string
          location: string
          model_name: string
          predicted_demand: number
          prediction_date: string
          product_category: string
        }
        Insert: {
          accuracy_score?: number | null
          actual_demand?: number | null
          confidence_score: number
          created_at?: string
          id?: string
          location: string
          model_name: string
          predicted_demand: number
          prediction_date: string
          product_category: string
        }
        Update: {
          accuracy_score?: number | null
          actual_demand?: number | null
          confidence_score?: number
          created_at?: string
          id?: string
          location?: string
          model_name?: string
          predicted_demand?: number
          prediction_date?: string
          product_category?: string
        }
        Relationships: []
      }
      sales_data: {
        Row: {
          created_at: string
          humidity: number | null
          id: string
          location: string
          product_category: string
          quantity: number
          revenue: number
          temperature: number | null
          timestamp: string
          visitor_count: number | null
          weather_condition: string | null
        }
        Insert: {
          created_at?: string
          humidity?: number | null
          id?: string
          location: string
          product_category: string
          quantity: number
          revenue: number
          temperature?: number | null
          timestamp: string
          visitor_count?: number | null
          weather_condition?: string | null
        }
        Update: {
          created_at?: string
          humidity?: number | null
          id?: string
          location?: string
          product_category?: string
          quantity?: number
          revenue?: number
          temperature?: number | null
          timestamp?: string
          visitor_count?: number | null
          weather_condition?: string | null
        }
        Relationships: []
      }
      weather_data: {
        Row: {
          condition: string
          created_at: string
          humidity: number
          id: string
          location: string
          precipitation: number | null
          temperature: number
          timestamp: string
          wind_speed: number | null
        }
        Insert: {
          condition: string
          created_at?: string
          humidity: number
          id?: string
          location: string
          precipitation?: number | null
          temperature: number
          timestamp: string
          wind_speed?: number | null
        }
        Update: {
          condition?: string
          created_at?: string
          humidity?: number
          id?: string
          location?: string
          precipitation?: number | null
          temperature?: number
          timestamp?: string
          wind_speed?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
