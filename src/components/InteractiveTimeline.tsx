import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Award, BookOpen, Code, Trophy, ChevronRight } from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  organization: string;
  description: string;
  type: 'education' | 'achievement' | 'project' | 'certification';
  details?: string[];
  isExpanded?: boolean;
}

const InteractiveTimeline: React.FC = () => {
  const [events, setEvents] = useState<TimelineEvent[]>([
    {
      id: '1',
      date: '2024',
      title: 'Multiple Hackathon Victories',
      organization: 'Various Competitions',
      description: 'Consistent top performer in AI and full-stack development challenges',
      type: 'achievement',
      details: [
        'Codeforces REVA Hackathon - Third Prize',
        'Kaspersky Manipal Hackathon - Top 5 Teams',
        'CIDECODE Hackathon (PES University) - Finalist'
      ]
    },
    {
      id: '2',
      date: '2024',
      title: 'Advanced AI Certifications',
      organization: 'IBM & NPTEL',
      description: 'Earned elite certifications in cloud computing and database management',
      type: 'certification',
      details: [
        'IBM SkillsBuild - Advanced Cloud and AI Applications',
        'NPTEL DBMS - Elite Certification for Database Management Systems'
      ]
    },
    {
      id: '3',
      date: '2023-2024',
      title: 'AI-Powered Project Portfolio',
      organization: 'Personal Development',
      description: 'Built cutting-edge applications showcasing AI expertise',
      type: 'project',
      details: [
        'AI-Powered Interview Preparation Platform with blockchain verification',
        'Deep-Research Assistant using reinforcement learning',
        'Vibe-Coding (Polo) - AI-driven coding platform'
      ]
    },
    {
      id: '4',
      date: '2022-Present',
      title: 'B.E. Computer Science (Data Science)',
      organization: 'New Horizon College of Engineering, Bengaluru',
      description: 'Specializing in Data Science with exceptional academic performance',
      type: 'education',
      details: [
        'Current CGPA: 8.09',
        'Focus on AI/ML, Data Science, and Full-Stack Development',
        'Led multiple student tech events, boosting participation by 30%'
      ]
    },
    {
      id: '5',
      date: '2020-2022',
      title: 'Pre-University Course (PCMB)',
      organization: 'BKG PU College, Sandour',
      description: 'Strong foundation in Physics, Chemistry, Mathematics, and Biology',
      type: 'education',
      details: [
        'Percentage: 71.3%',
        'Built strong analytical and problem-solving skills',
        'Developed interest in technology and programming'
      ]
    }
  ]);

  const toggleExpand = (id: string) => {
    setEvents(events.map(event => 
      event.id === id 
        ? { ...event, isExpanded: !event.isExpanded }
        : event
    ));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'education': return BookOpen;
      case 'achievement': return Trophy;
      case 'project': return Code;
      case 'certification': return Award;
      default: return Calendar;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'education': return 'bg-blue-500';
      case 'achievement': return 'bg-yellow-500';
      case 'project': return 'bg-green-500';
      case 'certification': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'education': return 'Education';
      case 'achievement': return 'Achievement';
      case 'project': return 'Project';
      case 'certification': return 'Certification';
      default: return 'Event';
    }
  };

  return (
    <Card className="hover-lift">
      <CardHeader>
        <CardTitle className="headline text-xl flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          INTERACTIVE TIMELINE
        </CardTitle>
        <CardDescription className="byline text-primary">
          Journey Through Innovation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          
          {events.map((event, index) => {
            const Icon = getIcon(event.type);
            return (
              <div key={event.id} className="relative flex items-start gap-4 pb-6">
                {/* Timeline dot */}
                <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-background ${getTypeColor(event.type)}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                
                {/* Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {event.date}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {getTypeBadge(event.type)}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-sm">{event.title}</h3>
                    <p className="text-xs text-muted-foreground">{event.organization}</p>
                    <p className="text-xs mt-1">{event.description}</p>
                  </div>
                  
                  {event.details && (
                    <div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 text-xs text-primary hover:no-underline"
                        onClick={() => toggleExpand(event.id)}
                      >
                        <span>View Details</span>
                        <ChevronRight className={`h-3 w-3 ml-1 transition-transform ${event.isExpanded ? 'rotate-90' : ''}`} />
                      </Button>
                      
                      {event.isExpanded && (
                        <div className="mt-2 space-y-1 pl-4 border-l-2 border-primary/20">
                          {event.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-xs text-muted-foreground">
                              • {detail}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            <span className="text-primary font-semibold">Timeline continues...</span> More achievements incoming!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveTimeline;