import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorDisplay = ({ message, onRetry }: ErrorDisplayProps) => {
  return (
    <Card className="p-8 bg-glass backdrop-blur-sm border-glass shadow-card">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <div className="absolute inset-0 rounded-full bg-destructive opacity-20 blur-xl animate-pulse" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Oops! Something went wrong</h3>
          <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
            {message}
          </p>
        </div>

        {onRetry && (
          <Button 
            onClick={onRetry}
            variant="outline"
            className="gap-2 mt-4"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        )}
      </div>
    </Card>
  );
};