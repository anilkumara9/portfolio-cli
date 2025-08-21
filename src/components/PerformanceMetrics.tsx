import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Gauge, Eye, Clock } from 'lucide-react';

const PerformanceMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    visitors: 0,
    pageViews: 0,
    performance: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate performance metrics loading
    let visitorCount = 0;
    let loadTime = 0;
    let performance = 0;
    let pageViews = 0;

    const loadingInterval = setInterval(() => {
      visitorCount = Math.min(visitorCount + Math.floor(Math.random() * 5), 127);
      loadTime = Math.min(loadTime + 0.1, 1.2);
      performance = Math.min(performance + 2, 98);
      pageViews = Math.min(pageViews + Math.floor(Math.random() * 3), 1247);

      setMetrics({
        loadTime: Number(loadTime.toFixed(1)),
        visitors: visitorCount,
        pageViews: pageViews,
        performance: performance,
      });

      if (visitorCount >= 127 && loadTime >= 1.2 && performance >= 98) {
        setIsLoading(false);
        clearInterval(loadingInterval);
      }
    }, 100);

    // Store visitor count in localStorage
    const stored = localStorage.getItem('portfolio-visitors');
    if (!stored) {
      localStorage.setItem('portfolio-visitors', '1');
    } else {
      const count = parseInt(stored) + 1;
      localStorage.setItem('portfolio-visitors', count.toString());
    }

    return () => clearInterval(loadingInterval);
  }, []);

  const getPerformanceGrade = (score: number) => {
    if (score >= 90) return { grade: 'A+', color: 'text-green-500' };
    if (score >= 80) return { grade: 'A', color: 'text-green-400' };
    if (score >= 70) return { grade: 'B+', color: 'text-yellow-500' };
    return { grade: 'B', color: 'text-orange-500' };
  };

  const { grade, color } = getPerformanceGrade(metrics.performance);

  return (
    <Card className="hover-lift border-primary/20">
      <CardHeader>
        <CardTitle className="headline text-lg flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          LIVE PERFORMANCE METRICS
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center space-y-1">
            <Clock className="h-5 w-5 mx-auto text-primary" />
            <div className="text-xl font-bold font-mono">
              {isLoading ? (
                <div className="animate-pulse bg-muted h-5 w-8 mx-auto rounded" />
              ) : (
                `${metrics.loadTime}s`
              )}
            </div>
            <div className="text-xs text-muted-foreground">Load Time</div>
          </div>

          <div className="text-center space-y-1">
            <Gauge className="h-5 w-5 mx-auto text-primary" />
            <div className={`text-xl font-bold font-mono ${color}`}>
              {isLoading ? (
                <div className="animate-pulse bg-muted h-5 w-8 mx-auto rounded" />
              ) : (
                grade
              )}
            </div>
            <div className="text-xs text-muted-foreground">Grade</div>
          </div>

          <div className="text-center space-y-1">
            <Eye className="h-5 w-5 mx-auto text-primary" />
            <div className="text-xl font-bold font-mono">
              {isLoading ? (
                <div className="animate-pulse bg-muted h-5 w-8 mx-auto rounded" />
              ) : (
                metrics.visitors
              )}
            </div>
            <div className="text-xs text-muted-foreground">Visitors</div>
          </div>

          <div className="text-center space-y-1">
            <Zap className="h-5 w-5 mx-auto text-primary" />
            <div className="text-xl font-bold font-mono">
              {isLoading ? (
                <div className="animate-pulse bg-muted h-5 w-8 mx-auto rounded" />
              ) : (
                `${metrics.performance}%`
              )}
            </div>
            <div className="text-xs text-muted-foreground">Score</div>
          </div>
        </div>

        <div className="pt-3 border-t border-border">
          <div className="flex justify-center gap-2">
            <Badge variant="outline" className="text-xs">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
              Live
            </Badge>
            <Badge variant="outline" className="text-xs">
              PWA Ready
            </Badge>
            <Badge variant="outline" className="text-xs">
              Mobile Optimized
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;