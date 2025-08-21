// Simple analytics and performance monitoring utility

interface AnalyticsEvent {
  event: string;
  category?: string;
  value?: number;
  timestamp: number;
}

class AnalyticsManager {
  private events: AnalyticsEvent[] = [];
  private performanceMetrics: Record<string, number> = {};

  // Track custom events
  track(event: string, category?: string, value?: number) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      category,
      value,
      timestamp: Date.now()
    };
    
    this.events.push(analyticsEvent);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', analyticsEvent);
    }
  }

  // Track performance metrics
  trackPerformance(metric: string, value: number) {
    this.performanceMetrics[metric] = value;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`⚡ Performance: ${metric} = ${value}ms`);
    }
  }

  // Track page views
  trackPageView(page: string) {
    this.track('page_view', 'navigation', undefined);
  }

  // Track user interactions
  trackInteraction(element: string, action: string) {
    this.track(`${element}_${action}`, 'interaction');
  }

  // Track errors
  trackError(error: string, context?: string) {
    this.track('error', 'system', undefined);
    console.error('Error tracked:', error, context);
  }

  // Get performance data
  getPerformanceData() {
    return {
      events: this.events,
      metrics: this.performanceMetrics,
      totalEvents: this.events.length
    };
  }

  // Measure Web Vitals
  measureWebVitals() {
    // Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.trackPerformance('LCP', Math.round(lastEntry.startTime));
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((entryList) => {
      const firstInput = entryList.getEntries()[0] as any;
      if (firstInput && firstInput.processingStart) {
        this.trackPerformance('FID', Math.round(firstInput.processingStart - firstInput.startTime));
      }
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      this.trackPerformance('CLS', Math.round(clsValue * 1000) / 1000);
    }).observe({ entryTypes: ['layout-shift'] });
  }

  // Initialize analytics
  init() {
    // Track initial page load
    this.trackPageView('home');
    
    // Measure Web Vitals
    this.measureWebVitals();
    
    // Track time to first paint
    if ('performance' in window) {
      const paintEntries = performance.getEntriesByType('paint');
      paintEntries.forEach((entry) => {
        this.trackPerformance(entry.name, Math.round(entry.startTime));
      });
    }

    // Track total load time
    window.addEventListener('load', () => {
      if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        this.trackPerformance('page_load_time', loadTime);
      }
    });

    console.log('📊 Analytics initialized');
  }
}

// Export singleton instance
export const analytics = new AnalyticsManager();

// Convenience functions
export const trackEvent = (event: string, category?: string, value?: number) => {
  analytics.track(event, category, value);
};

export const trackInteraction = (element: string, action: string) => {
  analytics.trackInteraction(element, action);
};

export const trackError = (error: string, context?: string) => {
  analytics.trackError(error, context);
};