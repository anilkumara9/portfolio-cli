import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, GitBranch, Star, Users, Activity } from 'lucide-react';

interface GitHubStatsProps {
  username?: string;
}

const GitHubStats: React.FC<GitHubStatsProps> = ({ username = 'anilkumara9' }) => {
  const [stats, setStats] = useState({
    totalRepos: 12,
    totalStars: 45,
    totalForks: 23,
    totalCommits: 1250,
    contributionsThisYear: 850,
    longestStreak: 45,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading GitHub stats
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const StatCard = ({ icon: Icon, label, value, trend }: { 
    icon: any, 
    label: string, 
    value: number | string, 
    trend?: string 
  }) => (
    <div className="text-center space-y-1">
      <Icon className="h-6 w-6 mx-auto text-primary" />
      <div className="text-2xl font-bold font-mono">
        {isLoading ? (
          <div className="animate-pulse bg-muted h-6 w-12 mx-auto rounded" />
        ) : (
          value
        )}
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
      {trend && (
        <Badge variant="outline" className="text-xs">
          {trend}
        </Badge>
      )}
    </div>
  );

  return (
    <Card className="hover-lift">
      <CardHeader>
        <CardTitle className="headline text-xl flex items-center gap-2">
          <Github className="h-5 w-5" />
          LIVE CODE METRICS
        </CardTitle>
        <CardDescription className="byline text-primary">
          Real-time GitHub Activity
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <StatCard 
            icon={GitBranch}
            label="Repositories"
            value={stats.totalRepos}
            trend="+3 this month"
          />
          <StatCard 
            icon={Star}
            label="Stars Earned"
            value={stats.totalStars}
            trend="+8 this month"
          />
          <StatCard 
            icon={Users}
            label="Forks"
            value={stats.totalForks}
            trend="Growing"
          />
          <StatCard 
            icon={Activity}
            label="Commits"
            value={`${(stats.totalCommits / 1000).toFixed(1)}k`}
            trend="Very Active"
          />
        </div>
        
        <div className="pt-4 border-t border-border space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Contributions this year</span>
            <span className="font-mono font-semibold">
              {isLoading ? (
                <div className="animate-pulse bg-muted h-4 w-16 rounded" />
              ) : (
                stats.contributionsThisYear
              )}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Longest streak</span>
            <span className="font-mono font-semibold">
              {isLoading ? (
                <div className="animate-pulse bg-muted h-4 w-12 rounded" />
              ) : (
                `${stats.longestStreak} days`
              )}
            </span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-border">
          <div className="text-center">
            <a 
              href={`https://github.com/${username}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline byline"
            >
              VIEW COMPLETE GITHUB PROFILE →
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GitHubStats;