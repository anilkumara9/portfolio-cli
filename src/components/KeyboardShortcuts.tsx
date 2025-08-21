import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Keyboard, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface KeyboardShortcutsProps {
  isOpen: boolean;
  onClose: () => void;
}

const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({ isOpen, onClose }) => {
  const shortcuts = [
    { keys: ['Ctrl', 'K'], description: 'Open search' },
    { keys: ['Esc'], description: 'Close modals' },
    { keys: ['Ctrl', 'D'], description: 'Download resume' },
    { keys: ['Ctrl', 'Shift', 'T'], description: 'Toggle theme' },
    { keys: ['?'], description: 'Show keyboard shortcuts' },
    { keys: ['H'], description: 'Go to home/hero' },
    { keys: ['A'], description: 'Go to about section' },
    { keys: ['S'], description: 'Go to skills section' },
    { keys: ['E'], description: 'Go to experience section' },
    { keys: ['P'], description: 'Go to projects section' },
    { keys: ['C'], description: 'Go to contact section' },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="bg-background/95 backdrop-blur-sm border border-border rounded-lg w-full max-w-md"
          onClick={e => e.stopPropagation()}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Keyboard className="h-5 w-5" />
                Keyboard Shortcuts
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>
              Navigate faster with keyboard shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 max-h-80 overflow-y-auto">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <span className="text-sm text-muted-foreground">{shortcut.description}</span>
                <div className="flex gap-1">
                  {shortcut.keys.map((key, keyIndex) => (
                    <React.Fragment key={keyIndex}>
                      <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">
                        {key}
                      </kbd>
                      {keyIndex < shortcut.keys.length - 1 && (
                        <span className="text-muted-foreground text-xs">+</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default KeyboardShortcuts;