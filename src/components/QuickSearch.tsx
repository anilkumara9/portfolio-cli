import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, X, Keyboard, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuickSearchProps {
  skills: string[];
  projects: Array<{
    title: string;
    description: string;
    tech: string[];
    impact: string;
  }>;
  isOpen: boolean;
  onClose: () => void;
}

const QuickSearch: React.FC<QuickSearchProps> = ({ skills, projects, isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<{skills: string[], projects: typeof projects}>({
    skills: [],
    projects: []
  });

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults({ skills: [], projects: [] });
      return;
    }

    const term = searchTerm.toLowerCase();
    
    const filteredSkills = skills.filter(skill => 
      skill.toLowerCase().includes(term)
    );
    
    const filteredProjects = projects.filter(project => 
      project.title.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term) ||
      project.tech.some(tech => tech.toLowerCase().includes(term)) ||
      project.impact.toLowerCase().includes(term)
    );

    setResults({ skills: filteredSkills, projects: filteredProjects });
  }, [searchTerm, skills, projects]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[70vh] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Quick Search</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search skills, projects, technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {searchTerm && (results.skills.length === 0 && results.projects.length === 0) ? (
              <p className="text-muted-foreground text-center py-8">No results found</p>
            ) : (
              <>
                {results.skills.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Skills ({results.skills.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {results.skills.map(skill => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                          onClick={() => scrollToSection('skills')}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {results.projects.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Projects ({results.projects.length})
                    </h4>
                    <div className="space-y-2">
                      {results.projects.map((project, index) => (
                        <Card
                          key={project.title}
                          className="cursor-pointer hover:bg-accent transition-colors"
                          onClick={() => scrollToSection('projects')}
                        >
                          <CardContent className="p-3">
                            <h5 className="font-semibold text-sm">{project.title}</h5>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {project.tech.slice(0, 3).map(tech => (
                                <Badge key={tech} variant="outline" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                              {project.tech.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{project.tech.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
            <kbd className="px-2 py-1 bg-muted rounded text-xs">Esc</kbd> to close •{' '}
            <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+K</kbd> to open search
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickSearch;