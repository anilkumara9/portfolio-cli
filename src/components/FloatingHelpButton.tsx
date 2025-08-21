import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle, Keyboard, Search, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingHelpButtonProps {
  onOpenShortcuts: () => void;
  onOpenSearch: () => void;
  onDownloadResume: () => void;
}

const FloatingHelpButton: React.FC<FloatingHelpButtonProps> = ({
  onOpenShortcuts,
  onOpenSearch,
  onDownloadResume
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActions = [
    {
      icon: Search,
      label: 'Search (Ctrl+K)',
      action: onOpenSearch,
      color: 'text-blue-500'
    },
    {
      icon: Download,
      label: 'Download Resume (Ctrl+D)',
      action: onDownloadResume,
      color: 'text-green-500'
    },
    {
      icon: Keyboard,
      label: 'Keyboard Shortcuts (?)',
      action: onOpenShortcuts,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-0 space-y-2 mb-2"
          >
            {quickActions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  onClick={action.action}
                  variant="secondary"
                  size="sm"
                  className="group bg-background/95 backdrop-blur-sm border border-border shadow-lg hover:shadow-xl transition-all duration-200 text-xs"
                >
                  <action.icon className={`h-3 w-3 mr-2 ${action.color}`} />
                  {action.label}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          size="icon"
          className="h-12 w-12 rounded-full bg-primary/90 backdrop-blur-sm hover:bg-primary shadow-lg hover:shadow-xl transition-all duration-300 group"
          title="Quick Actions & Help"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <HelpCircle className="h-5 w-5 text-primary-foreground" />
          </motion.div>
        </Button>
      </motion.div>
    </div>
  );
};

export default FloatingHelpButton;