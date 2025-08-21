import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  Download, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  X,
  Maximize2,
  Minimize2,
  User,
  Code,
  Briefcase,
  Award,
  Cpu,
  HardDrive,
  Wifi,
  Battery,
  Clock,
  Monitor,
  Zap,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Star,
  GitBranch,
  Activity,
  Gamepad2,
  Rocket,
  Target,
  Coffee,
  Heart,
  Sparkles
} from "lucide-react";
import { generateResumePDF, getResumePDFDataUri } from "./utils/pdfGenerator";
import DarkModeToggle from "./components/DarkModeToggle";
import ContactForm from "./components/ContactForm";

// ASCII Art for terminal
const ASCII_ART = `
 ███╗   ███╗███████╗██████╗  █████╗     █████╗ ███╗   ██╗██╗██╗     ██╗  ██╗██╗   ██╗███╗   ███╗ █████╗ ██████╗ 
 ████╗ ████║██╔════╝██╔══██╗██╔══██╗   ██╔══██╗████╗  ██║██║██║     ██║ ██╔╝██║   ██║████╗ ████║██╔══██╗██╔══██╗
 ██╔████╔██║█████╗  ██║  ██║███████║   ███████║██╔██╗ ██║██║██║     █████╔╝ ██║   ██║██╔████╔██║███████║██████╔╝
 ██║╚██╔╝██║██╔══╝  ██║  ██║██╔══██║   ██╔══██║██║╚██╗██║██║██║     ██╔═██╗ ██║   ██║██║╚██╔╝██║██╔══██║██╔══██╗
 ██║ ╚═╝ ██║███████╗██████╔╝██║  ██║   ██║  ██║██║ ╚████║██║███████╗██║  ██╗╚██████╔╝██║ ╚═╝ ██║██║  ██║██║  ██║
 ╚═╝     ╚═╝╚══════╝╚═════╝ ╚═╝  ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
                                                                                                                    
    ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════╗
    ║                              AI ENGINEER & FULL-STACK DEVELOPER                                           ║
    ║                                     Computer Science Student                                              ║
    ║                                   Data Science Specialist                                                 ║
    ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════╝
`;

const WELCOME_TEXT = [
  "Welcome to MEDA ANILKUMAR's Developer Portfolio Terminal v3.0.0",
  "System initialized successfully...",
  "Loading developer profile...",
  "Establishing secure connection...",
  "AI modules loaded...",
  "Terminal ready for input.",
  "",
  "💡 Advanced Features Available:",
  "• Type 'help' to see all available commands",
  "• Try 'matrix' for the Matrix effect",
  "• Use 'hack' for hacking simulation",
  "• Type 'game' for interactive games",
  "• Use 'ai' to chat with AI assistant",
  "• Press TAB for command auto-completion",
  "• Use ↑/↓ arrows for command history",
  "• Type 'sound' to toggle sound effects",
  ""
];

// Matrix effect characters
const MATRIX_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Easter eggs and fun responses
const EASTER_EGGS = [
  "🎉 You found an easter egg! Try 'matrix' for a surprise!",
  "🥚 Nice! Try typing 'game' to play a mini-game!",
  "🐰 Hidden feature unlocked! Use 'fortune' for wisdom!",
  "✨ Secret command discovered! Try 'hack' for fun!",
  "🎮 Gaming mode activated! Type 'snake' to play Snake!",
  "🚀 Rocket mode engaged! Try 'launch' for countdown!",
  "💎 Rare find! Use 'treasure' for hidden gems!"
];

// Fortune messages
const FORTUNES = [
  "The best way to predict the future is to invent it. - Alan Kay",
  "Code is poetry written in logic.",
  "The most important property of a program is whether it accomplishes the intention of its user. - C.A.R. Hoare",
  "First, solve the problem. Then, write the code. - John Johnson",
  "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "Innovation distinguishes between a leader and a follower. - Steve Jobs",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Stay hungry, stay foolish. - Steve Jobs",
  "Code never lies, comments sometimes do. - Ron Jeffries"
];

// AI responses for chat
const AI_RESPONSES = [
  "Hello! I'm MEDA's AI assistant. How can I help you today?",
  "I'm here to answer questions about MEDA's skills and projects!",
  "Feel free to ask me anything about AI, development, or career opportunities!",
  "MEDA is passionate about AI/ML and full-stack development. What would you like to know?",
  "I can help you understand MEDA's technical expertise and project experience!",
  "Ask me about MEDA's achievements, skills, or any technical questions!"
];

// Data structures
const skills = [
  { name: 'Python', level: 90, category: 'Languages', icon: '🐍' },
  { name: 'JavaScript/TypeScript', level: 85, category: 'Languages', icon: '⚡' },
  { name: 'Java', level: 80, category: 'Languages', icon: '☕' },
  { name: 'React/Next.js', level: 88, category: 'Frontend', icon: '⚛️' },
  { name: 'Node.js', level: 82, category: 'Backend', icon: '🟢' },
  { name: 'AI/ML (PyTorch, TensorFlow)', level: 85, category: 'AI/ML', icon: '🤖' },
  { name: 'Data Science', level: 87, category: 'AI/ML', icon: '📊' },
  { name: 'AWS/GCP', level: 75, category: 'Cloud', icon: '☁️' },
  { name: 'Docker/Kubernetes', level: 70, category: 'DevOps', icon: '🐳' }
];

const projects = [
  {
    id: 1,
    name: "AI-Interview-Platform",
    description: "Revolutionary AI-powered interview preparation platform with blockchain verification",
    tech: ["Next.js 15", "Firebase", "Vapi AI", "Gemini AI", "Ethereum", "IPFS"],
    status: "🟢 Production",
    github: "https://github.com/anilkumara9",
    features: ["AI Voice Interviews", "Blockchain Credentials", "Real-time Feedback", "Performance Analytics"],
    stars: "⭐ 45",
    impact: "Helped 500+ users improve interview skills"
  },
  {
    id: 2,
    name: "Deep-Research-Assistant",
    description: "Autonomous research agent using reinforcement learning for web-scale data extraction",
    tech: ["Python", "Reinforcement Learning", "Web Scraping", "NLP", "AI"],
    status: "🟡 Active Development",
    github: "https://github.com/anilkumara9",
    features: ["Multi-source Research", "Data Synthesis", "Automated Analysis", "Report Generation"],
    stars: "⭐ 32",
    impact: "Reduced research time by 70%"
  },
  {
    id: 3,
    name: "Vibe-Coding-Platform",
    description: "AI-driven coding platform generating optimized code from natural language",
    tech: ["Next.js", "Prisma", "Neon DB", "Tailwind CSS", "Vercel SDK", "Gemini AI"],
    status: "🔵 Beta",
    github: "https://github.com/anilkumara9",
    features: ["Natural Language to Code", "Multi-language Support", "Code Optimization", "Real-time Preview"],
    stars: "⭐ 28",
    impact: "Generated 10,000+ code snippets"
  }
];

interface Command {
  command: string;
  description: string;
  category: string;
  usage?: string;
  action: (args: string[]) => string | React.JSX.Element | Promise<string>;
}

interface HistoryItem {
  type: 'input' | 'output' | 'system';
  content: string | React.JSX.Element;
  timestamp: string;
  isTyping?: boolean;
}

// Typing effect hook
const useTypewriter = (text: string, speed: number = 50) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) return;
    
    setIsTyping(true);
    setDisplayText('');
    let i = 0;
    
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayText, isTyping };
};

export default function TerminalPortfolio() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPath] = useState('~/portfolio');
  const [showResume, setShowResume] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [resumeDataUri, setResumeDataUri] = useState<string | null>(null);
  const [userName] = useState('guest');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [systemUptime, setSystemUptime] = useState(0);
  const [commandCount, setCommandCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [aliasMap, setAliasMap] = useState<Record<string, string>>({});
  const [gameState, setGameState] = useState<{ target: number; attempts: number } | null>(null);
  
  // Advanced features state
  const [matrixMode, setMatrixMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameMode, setGameMode] = useState<string | null>(null);
  const [gameScore, setGameScore] = useState(0);
  const [aiMode, setAiMode] = useState(false);
  const [hackingMode, setHackingMode] = useState(false);
  const [currentTypingText, setCurrentTypingText] = useState('');


  // Typing response helper
  const addTypingResponse = useCallback((fullText: string, speed: number = 20) => {
    const timestamp = new Date().toLocaleTimeString();
    let indexPointer = 0;
    setHistory(prev => [
      ...prev,
      { type: 'output', content: '', timestamp, isTyping: true }
    ]);
    const interval = setInterval(() => {
      indexPointer++;
      setHistory(prev => {
        if (prev.length === 0) return prev;
        const newHistory = [...prev];
        const last = newHistory[newHistory.length - 1];
        if (last && last.type === 'output') {
          const slice = fullText.slice(0, indexPointer);
          last.content = slice;
          last.isTyping = indexPointer < fullText.length;
        }
        return newHistory;
      });
      if (indexPointer >= fullText.length) {
        clearInterval(interval);
      }
    }, speed);
  }, []);

  // Persistence helpers
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('cli_history');
      const savedPrefs = localStorage.getItem('cli_prefs');
      const savedAliases = localStorage.getItem('cli_aliases');
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory) as string[];
        setCommandHistory(parsed);
      }
      if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs) as { dark: boolean; sound: boolean };
        if (typeof prefs.dark === 'boolean') setIsDarkMode(prefs.dark);
        if (typeof prefs.sound === 'boolean') setSoundEnabled(prefs.sound);
      }
      if (savedAliases) {
        setAliasMap(JSON.parse(savedAliases));
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cli_history', JSON.stringify(commandHistory));
    } catch {}
  }, [commandHistory]);

  useEffect(() => {
    try {
      localStorage.setItem('cli_prefs', JSON.stringify({ dark: isDarkMode, sound: soundEnabled }));
    } catch {}
  }, [isDarkMode, soundEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem('cli_aliases', JSON.stringify(aliasMap));
    } catch {}
  }, [aliasMap]);
  // System uptime effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSystemUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Matrix effect
  useEffect(() => {
    if (!matrixMode) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '10';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff41';
      ctx.font = '15px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        ctx.fillText(text, i * 20, drops[i] * 20);
        
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      document.body.removeChild(canvas);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [matrixMode]);

  // Sound effects
  const playSound = useCallback((type: 'keypress' | 'command' | 'error' | 'success') => {
    if (!soundEnabled) return;
    
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch (type) {
      case 'keypress':
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        break;
      case 'command':
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        break;
      case 'error':
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        break;
      case 'success':
        oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        break;
    }
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  }, [soundEnabled]);



  // Format uptime display
  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  // Advanced Terminal Commands
  const commands: Command[] = [
    {
      command: 'help',
      description: 'Show available commands',
      category: 'System',
      action: () => {
        const helpText = [
          "╔══════════════════════════════════════════════════════════════╗",
          "║                     AVAILABLE COMMANDS                        ║",
          "╠══════════════════════════════════════════════════════════════╣",
          "",
          "📁 PORTFOLIO & INFO:",
          "  help         - Show this help message",
          "  about        - Learn about me",
          "  skills       - View technical skills with animations",
          "  projects     - Show my projects with details",
          "  contact      - Get contact information",
          "  resume       - View/download resume",
          "  experience   - View work experience",
          "  achievements - Show awards and certifications",
          "",
          "🖥️  SYSTEM COMMANDS:",
          "  neofetch     - Display system information",
          "  clear        - Clear the terminal",
          "  ls           - List directory contents",
          "  pwd          - Show current directory",
          "  whoami       - Show current user",
          "  date         - Show current date and time",
          "  uptime       - Show system uptime",
          "  theme        - Toggle theme (dark/light)",
          "  sound        - Toggle sound effects",
          "",
          "🔍 UTILITIES:",
          "  cat <file>   - Display file contents",
          "  echo <text>  - Display text with typing effect",
          "  history      - Show command history",
          "  search <term> - Search through portfolio content",
          "  man <cmd>    - Show help for a command",
          "  alias [a=b]  - List or set alias (unalias <a> to remove)",
          "  open <url>   - Open a link in new tab",
          "  curl <url>   - Fetch a URL and display response",
          "",
          "🎮 FUN & GAMES:",
          "  matrix       - Enter the Matrix (visual effect)",
          "  hack         - Hacking simulation sequence",
          "  game         - Play number guessing game",
          "  snake        - Play Snake game",
          "  fortune      - Get random fortune cookie",
          "  easter       - Find easter eggs",
          "  joke         - Get a programming joke",
          "",
          "🤖 AI FEATURES:",
          "  ai <message> - Chat with AI assistant",
          "  analyze      - AI analysis of my skills",
          "  recommend    - Get AI recommendations",
          "",
          "⌨️  KEYBOARD SHORTCUTS:",
          "  TAB          - Command auto-completion",
          "  ↑/↓ Arrow     - Command history navigation",
          "  Ctrl+C       - Cancel current operation",
          "  Ctrl+L       - Clear terminal (same as 'clear')",
          "",
          "✨ Try 'matrix' for visual effects or 'ai hello' to chat!",
          "╚══════════════════════════════════════════════════════════════╝"
        ];
        return helpText.join('\n');
      }
    },
    {
      command: 'resume',
      description: 'View/download resume',
      category: 'Portfolio',
      action: () => {
        // Show the static resume from public folder
        try {
          setResumeDataUri('/updated%20resume.pdf');
        } catch {}
        setShowResume(true);
        return "Opening resume...";
      }
    },
    {
      command: 'experience',
      description: 'View work experience',
      category: 'Portfolio',
      action: () => {
        return [
          "🧭 EXPERIENCE",
          "• AI Engineer Intern – Built AI interview and research tools",
          "• Full-Stack Projects – Next.js, Node.js, Prisma, GCP/AWS",
          "• Hackathons – Codeforces REVA (3rd), Kaspersky Manipal (Top 5)",
        ].join('\n');
      }
    },
    {
      command: 'achievements',
      description: 'Show awards and certifications',
      category: 'Portfolio',
      action: () => [
        '🏆 ACHIEVEMENTS',
        '• IBM SkillsBuild – Cloud and AI',
        '• NPTEL DBMS – Elite',
        '• Multiple hackathon accolades',
      ].join('\n')
    },
    {
      command: 'about',
      description: 'Learn about me',
      category: 'Portfolio',
      action: () => {
        const aboutText = [
          "╔════════════════════════════════════════════════════════════╗",
          "║                    MEDA ANILKUMAR                          ║",
          "║                AI Engineer & Full-Stack Developer         ║",
          "╚════════════════════════════════════════════════════════════╝",
          "",
          "🎓 Education: B.E. Computer Science (Data Science) - CGPA: 8.09",
          "📍 Location: Bengaluru, Karnataka, India",
          "💼 Status: Available for full-time opportunities",
          "📧 Email: anilkumarmeda6@gmail.com",
          "🌐 GitHub: github.com/anilkumara9",
          "",
          "🚀 PASSION:",
          "Passionate about solving complex problems at scale and contributing",
          "to high-impact products that drive innovation and make a real",
          "difference in people's lives. I love building AI-powered solutions",
          "that push the boundaries of what's possible.",
          "",
          "🏆 ACHIEVEMENTS:",
          "• 3rd Place - Codeforces REVA Hackathon (2024)",
          "• Top 5 - Kaspersky Manipal Hackathon (2024)", 
          "• IBM SkillsBuild Advanced Cloud & AI Certified",
          "• NPTEL DBMS Elite Certification",
          "• 500+ users impacted through AI Interview Platform",
          "",
          "💡 EXPERTISE:",
          "• Artificial Intelligence & Machine Learning",
          "• Full-Stack Web Development (React, Next.js, Node.js)",
          "• Data Science & Analytics",
          "• Blockchain & Web3 Technologies",
          "• Cloud Computing & DevOps (AWS, GCP, Docker)",
          "",
          "🎯 CURRENT FOCUS:",
          "Building next-generation AI applications that solve real-world",
          "problems. Currently working on autonomous research agents and",
          "AI-powered development tools.",
          "",
          "🎯 GOAL:",
          "To join a forward-thinking team where I can leverage my skills",
          "in AI/ML and full-stack development to build innovative solutions",
          "that make a meaningful impact on millions of users."
        ];
        return aboutText.join('\n');
      }
    },
    {
      command: 'skills',
      description: 'View technical skills with animations',
      category: 'Portfolio',
      action: (args) => {
        if (args.includes('--json')) {
          return JSON.stringify(skills, null, 2);
        }
        const skillCategories = skills.reduce((acc, skill) => {
          if (!acc[skill.category]) acc[skill.category] = [];
          acc[skill.category].push(skill);
          return acc;
        }, {} as Record<string, typeof skills>);

        let output = [
          "╔════════════════════════════════════════════════════════════╗",
          "║                    TECHNICAL SKILLS                        ║",
          "╚════════════════════════════════════════════════════════════╝",
          ""
        ];

        Object.entries(skillCategories).forEach(([category, categorySkills]) => {
          output.push(`🔧 ${category.toUpperCase()}:`);
          categorySkills.forEach(skill => {
            const bars = Math.round(skill.level / 10);
            const skillBar = '█'.repeat(bars) + '░'.repeat(10 - bars);
            output.push(`  ${skill.icon} ${skill.name.padEnd(25)} [${skillBar}] ${skill.level}%`);
          });
          output.push("");
        });

        output.push("💪 SKILL HIGHLIGHTS:");
        output.push("• Expert in Python ecosystem (Django, FastAPI, PyTorch)");
        output.push("• Advanced React/Next.js with TypeScript");
        output.push("• AI/ML model development and deployment");
        output.push("• Cloud-native application architecture");
        output.push("• Full-stack development with modern tools");

        return output.join('\n');
      }
    },
    {
      command: 'projects',
      description: 'Show my projects with details',
      category: 'Portfolio',
      action: (args) => {
        let output = [
          "╔════════════════════════════════════════════════════════════╗",
          "║                       PROJECTS                             ║",
          "╚════════════════════════════════════════════════════════════╝",
          ""
        ];
        if (args.includes('--json')) {
          return JSON.stringify(projects, null, 2);
        }

        projects.forEach((project, index) => {
          output.push(`📁 ${project.name} ${project.stars}`);
          output.push(`   ${project.description}`);
          output.push(`   Status: ${project.status}`);
          output.push(`   Impact: ${project.impact}`);
          output.push(`   Tech Stack: ${project.tech.join(', ')}`);
          output.push(`   Key Features:`);
          project.features.forEach(feature => {
            output.push(`     • ${feature}`);
          });
          output.push(`   🔗 GitHub: ${project.github}`);
          if (index < projects.length - 1) output.push("");
        });

        output.push("");
        output.push("🚀 MORE PROJECTS:");
        output.push("• Portfolio Terminal (This!) - Interactive CLI portfolio");
        output.push("• AI Code Generator - Natural language to code conversion");
        output.push("• Smart Resume Builder - AI-powered resume optimization");
        output.push("• Blockchain Voting System - Secure decentralized voting");

        return output.join('\n');
      }
    },
    {
      command: 'matrix',
      description: 'Enter the Matrix (visual effect)',
      category: 'Fun',
      action: () => {
        setMatrixMode(!matrixMode);
        return matrixMode 
          ? "Exiting the Matrix... Reality restored." 
          : "Entering the Matrix... Follow the white rabbit. 🐰";
      }
    },
    {
      command: 'hack',
      description: 'Hacking simulation sequence',
      category: 'Fun',
      action: async () => {
        setHackingMode(true);
        const steps = [
          "🔐 INITIATING HACKING SEQUENCE...",
          "🌐 Scanning network topology...",
          "🔍 Identifying target systems...",
          "⚡ Bypassing firewall protocols...",
          "🔑 Cracking encryption algorithms...",
          "📊 Accessing mainframe database...",
          "💾 Extracting valuable data...",
          "🎯 TARGET: Hiring Manager's Attention",
          "✅ STATUS: Successfully Acquired!",
          "📈 SKILLS IMPRESSED: All of them",
          "💼 JOB OFFER: Pending...",
          "",
          "⚠️  ALERT: Exceptional developer detected!",
          "🚀 RECOMMENDATION: Proceed with interview immediately!",
          "💡 BONUS: Check out my GitHub for more impressive code!"
        ];

        let result = "";
        for (let i = 0; i < steps.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 500));
          result += steps[i] + "\n";
          // Update the display in real-time
          setHistory(prev => {
            const newHistory = [...prev];
            const lastItem = newHistory[newHistory.length - 1];
            if (lastItem && lastItem.type === 'output') {
              lastItem.content = result;
            }
            return newHistory;
          });
        }
        
        setHackingMode(false);
        return result;
      }
    },
    {
      command: 'ai',
      description: 'Chat with AI assistant',
      category: 'AI',
      action: (args) => {
        const message = args.join(' ');
        if (!message) {
          return "🤖 AI Assistant activated! Ask me anything about MEDA's skills, projects, or career.\nUsage: ai <your message>";
        }

        // Simple AI responses based on keywords
        const lowerMessage = message.toLowerCase();
        let response = "";

        if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
          response = "🤖 MEDA is highly skilled in AI/ML, full-stack development, and cloud technologies. His expertise spans Python, JavaScript/TypeScript, React, Node.js, and advanced AI frameworks like PyTorch and TensorFlow. He's particularly strong in building scalable AI applications!";
        } else if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
          response = "🤖 MEDA has built impressive projects including an AI Interview Platform with blockchain verification, a Deep Research Assistant using reinforcement learning, and a Vibe Coding Platform for natural language to code conversion. Each project demonstrates his ability to solve complex real-world problems!";
        } else if (lowerMessage.includes('hire') || lowerMessage.includes('job') || lowerMessage.includes('opportunity')) {
          response = "🤖 MEDA is actively seeking full-time opportunities! He's passionate about joining innovative teams where he can contribute to high-impact products. His combination of AI expertise and full-stack skills makes him perfect for modern tech companies building the future!";
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
          response = "🤖 Hello! I'm MEDA's AI assistant. I'm here to help you learn about his incredible skills and projects. What would you like to know about this talented developer?";
        } else {
          response = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
        }

        // Add typing effect
        setTimeout(() => addTypingResponse(response, 500), 100);
        return "🤖 Processing your query...";
      }
    },
    {
      command: 'analyze',
      description: 'AI analysis of my skills',
      category: 'AI',
      action: () => {
        const analysis = [
          '🔎 AI ANALYSIS',
          'Strong foundation across AI/ML and full-stack. Projects demonstrate end-to-end delivery, from model to deployment. Career fit: AI Product Engineer, ML Platform, Full-Stack AI.',
        ].join('\n');
        addTypingResponse(analysis, 15);
        return 'Analyzing profile...';
      }
    },
    {
      command: 'recommend',
      description: 'Get AI recommendations',
      category: 'AI',
      action: () => {
        const recs = [
          '🧠 RECOMMENDATIONS',
          '• Build MLOps demo with CI/CD for model deployments',
          '• Publish a technical blog on the RL research assistant',
          '• Ship an OSS library from the interview platform modules',
        ].join('\n');
        addTypingResponse(recs, 15);
        return 'Compiling recommendations...';
      }
    },
    {
      command: 'sound',
      description: 'Toggle sound effects',
      category: 'System',
      action: (args) => {
        if (args[0] === 'on') {
          setSoundEnabled(true);
          playSound('success');
          return '🔊 Sound effects enabled';
        }
        if (args[0] === 'off') {
          setSoundEnabled(false);
          return '🔇 Sound effects disabled';
        }
        setSoundEnabled(!soundEnabled);
        playSound(soundEnabled ? 'error' : 'success');
        return `🔊 Sound effects ${soundEnabled ? 'disabled' : 'enabled'}`;
      }
    },
    {
      command: 'theme',
      description: 'Toggle theme (dark/light)',
      category: 'System',
      action: (args) => {
        if (args[0] === 'dark') {
          setIsDarkMode(true);
          return '🎨 Theme set to Dark';
        }
        if (args[0] === 'light') {
          setIsDarkMode(false);
          return '🎨 Theme set to Light';
        }
        setIsDarkMode(prev => !prev);
        return `🎨 Theme set to ${!isDarkMode ? 'Dark' : 'Light'}`;
      }
    },
    {
      command: 'joke',
      description: 'Get a programming joke',
      category: 'Fun',
      action: () => {
        const jokes = [
          "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
          "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
          "Why don't programmers like nature? It has too many bugs! 🌿",
          "What's a programmer's favorite hangout place? Foo Bar! 🍺",
          "Why did the programmer quit his job? He didn't get arrays! 📊",
          "How do you comfort a JavaScript bug? You console it! 🐞",
          "Why do Java developers wear glasses? Because they can't C#! 👓",
          "What do you call a programmer from Finland? Nerdic! 🇫🇮"
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
      }
    },
    {
      command: 'game',
      description: 'Play number guessing game',
      category: 'Games',
      action: () => {
        setGameMode('guess');
        setGameState({ target: Math.floor(Math.random() * 100) + 1, attempts: 0 });
        return [
          '🎯 NUMBER GUESSING GAME',
          'I picked a number between 1 and 100. Try to guess it!',
          'Type your guess and press Enter. I will respond with higher/lower.',
        ].join('\n');
      }
    },
    {
      command: 'snake',
      description: 'Play Snake game',
      category: 'Games',
      action: () => {
        return [
          "🐍 SNAKE GAME",
          "",
          "Coming soon! This will be an interactive Snake game",
          "built right in the terminal. Stay tuned!",
          "",
          "For now, try 'game' for a number guessing game!"
        ].join('\n');
      }
    },
    {
      command: 'search',
      description: 'Search through portfolio content',
      category: 'Utilities',
      action: (args) => {
        const query = args.join(' ').toLowerCase();
        if (!query) {
          return "Usage: search <term>\nExample: search python";
        }

        const results: string[] = [];
        
        // Search skills
        skills.forEach(skill => {
          if (skill.name.toLowerCase().includes(query)) {
            results.push(`🔧 Skill: ${skill.name} (${skill.level}%)`);
          }
        });

        // Search projects
        projects.forEach(project => {
          if (project.name.toLowerCase().includes(query) || 
              project.description.toLowerCase().includes(query) ||
              project.tech.some(tech => tech.toLowerCase().includes(query))) {
            results.push(`📁 Project: ${project.name}`);
          }
        });

        if (results.length === 0) {
          return `No results found for "${query}". Try searching for: python, react, ai, blockchain, etc.`;
        }

        return `Search results for "${query}":\n\n${results.join('\n')}`;
      }
    },
    {
      command: 'history',
      description: 'Show command history',
      category: 'Utilities',
      action: () => {
        if (commandHistory.length === 0) return 'No history yet.';
        const items = commandHistory.slice(-20).map((c, i) => `${i + 1}. ${c}`);
        return items.join('\n');
      }
    },
    {
      command: 'echo',
      description: 'Display text with typing effect',
      category: 'Utilities',
      usage: 'echo <text>',
      action: (args) => {
        const text = args.join(' ');
        if (!text) return 'Usage: echo <text>';
        addTypingResponse(text, 10);
        return '';
      }
    },
    {
      command: 'cat',
      description: 'Display file contents',
      category: 'Utilities',
      usage: 'cat <file>',
      action: (args) => {
        const f = (args[0] || '').toLowerCase();
        const files: Record<string, string> = {
          'readme.md': 'Open the projects on GitHub: github.com/anilkumara9',
          'about.txt': 'AI Engineer & Full-Stack Developer based in Bengaluru.',
          'skills.json': JSON.stringify(skills, null, 2),
        };
        if (!f) return 'Usage: cat <file> (try: README.md, about.txt, skills.json)';
        return files[f] || `cat: ${f}: No such file`;
      }
    },
    {
      command: 'ls',
      description: 'List directory contents',
      category: 'System',
      action: () => {
        return ['about.txt', 'README.md', 'skills.json', 'projects/', 'contact/'].join('\n');
      }
    },
    {
      command: 'pwd',
      description: 'Show current directory',
      category: 'System',
      action: () => currentPath
    },
    {
      command: 'whoami',
      description: 'Show current user',
      category: 'System',
      action: () => userName
    },
    {
      command: 'date',
      description: 'Show current date and time',
      category: 'System',
      action: () => new Date().toString()
    },
    {
      command: 'uptime',
      description: 'Show system uptime',
      category: 'System',
      action: () => formatUptime(systemUptime)
    },
    {
      command: 'open',
      description: 'Open a link in new tab',
      category: 'Utilities',
      usage: 'open <url>',
      action: (args) => {
        const url = args[0];
        if (!url) return 'Usage: open <url>';
        try {
          const finalUrl = url.startsWith('http') ? url : `https://${url}`;
          window.open(finalUrl, '_blank');
          return `Opening ${finalUrl}...`;
        } catch {
          return 'Failed to open URL.';
        }
      }
    },
    {
      command: 'curl',
      description: 'Fetch a URL and display response',
      category: 'Utilities',
      usage: 'curl <url>',
      action: async (args) => {
        const url = args[0];
        if (!url) return 'Usage: curl <url>';
        try {
          const res = await fetch(url);
          const ct = res.headers.get('content-type') || '';
          if (ct.includes('application/json')) {
            const json = await res.json();
            return JSON.stringify(json, null, 2);
          }
          const text = await res.text();
          return text.slice(0, 2000);
        } catch (e) {
          return `curl: ${String(e)}`;
        }
      }
    },
    {
      command: 'man',
      description: 'Show help for a command',
      category: 'Utilities',
      usage: 'man <command>',
      action: (args) => {
        const name = (args[0] || '').toLowerCase();
        if (!name) return 'Usage: man <command>';
        const cmd = commands.find(c => c.command === name);
        if (!cmd) return `No manual entry for ${name}`;
        return [
          `NAME\n  ${cmd.command} — ${cmd.description}`,
          `CATEGORY\n  ${cmd.category}`,
          `USAGE\n  ${cmd.usage || cmd.command}`,
        ].join('\n\n');
      }
    },
    {
      command: 'alias',
      description: 'List or set command aliases',
      category: 'Utilities',
      usage: 'alias [name=value]',
      action: (args) => {
        if (args.length === 0) {
          const entries = Object.entries(aliasMap);
          if (entries.length === 0) return 'No aliases defined.';
          return entries.map(([k, v]) => `${k}='${v}'`).join('\n');
        }
        const pair = args.join(' ');
        const eq = pair.indexOf('=');
        if (eq === -1) return "Usage: alias name=value";
        const name = pair.slice(0, eq).trim();
        const value = pair.slice(eq + 1).trim().replace(/^'|"|\`|\s+|$/g, '');
        if (!name || !value) return 'Invalid alias.';
        setAliasMap(prev => ({ ...prev, [name]: value }));
        return `Alias set: ${name}='${value}'`;
      }
    },
    {
      command: 'unalias',
      description: 'Remove an alias',
      category: 'Utilities',
      usage: 'unalias <name>',
      action: (args) => {
        const name = args[0];
        if (!name) return 'Usage: unalias <name>';
        setAliasMap(prev => {
          const copy = { ...prev };
          delete copy[name];
          return copy;
        });
        return `Removed alias '${name}'.`;
      }
    },
    {
      command: 'stats',
      description: 'Show CLI stats',
      category: 'System',
      action: () => {
        return [
          `Commands executed: ${commandCount}`,
          `Uptime: ${formatUptime(systemUptime)}`,
          `Theme: ${isDarkMode ? 'Dark' : 'Light'}`,
          `Sound: ${soundEnabled ? 'Enabled' : 'Disabled'}`,
          `Matrix: ${matrixMode ? 'Active' : 'Inactive'}`,
        ].join('\n');
      }
    },
    {
      command: 'feedback',
      description: 'Open contact form for feedback',
      category: 'Utilities',
      action: () => {
        setShowContact(true);
        return 'Opening contact form...';
      }
    },
    {
      command: 'copy',
      description: 'Copy text to clipboard',
      category: 'Utilities',
      usage: 'copy <text>',
      action: async (args) => {
        const text = args.join(' ');
        if (!text) return 'Usage: copy <text>';
        try {
          await navigator.clipboard.writeText(text);
          return '📋 Copied to clipboard';
        } catch {
          return 'Failed to copy';
        }
      }
    },
    // ... (continuing with existing commands like contact, resume, etc.)
    {
      command: 'contact',
      description: 'Get contact information',
      category: 'Portfolio',
      action: () => {
        setShowContact(true);
        return [
          "╔════════════════════════════════════════════════════════════╗",
          "║                    CONTACT INFO                            ║",
          "╚════════════════════════════════════════════════════════════╝",
          "",
          "📧 Email: anilkumarmeda6@gmail.com",
          "📱 Phone: +91 9986489887",
          "📍 Location: Bengaluru, Karnataka, India",
          "💼 LinkedIn: linkedin.com/in/anilkumar-meda-2b2624331",
          "🐙 GitHub: github.com/anilkumara9",
          "",
          "⚡ Response Time: Within 24 hours",
          "🕒 Availability: Full-time opportunities",
          "🌐 Portfolio: Available 24/7",
          "💬 Preferred: Email or LinkedIn for professional inquiries",
          "",
          "Opening contact form..."
        ].join('\n');
      }
    },
    {
      command: 'clear',
      description: 'Clear the terminal',
      category: 'System',
      action: () => {
        setHistory([]);
        return "";
      }
    },
    {
      command: 'neofetch',
      description: 'Display system information',
      category: 'System',
      action: () => {
        return [
          "                    ██████████████████                    " + userName + "@portfolio",
          "                ██████████████████████████                ──────────────────────",
          "              ██████████████████████████████              OS: Portfolio Terminal v3.0.0",
          "            ████████████████████████████████████          Host: Developer Workspace",
          "          ██████████████████████████████████████████      Kernel: React 19.0.0",
          "        ████████████████████████████████████████████████  Uptime: " + formatUptime(systemUptime),
          "      ██████████████████████████████████████████████████  Packages: TypeScript, Next.js, AI/ML",
          "    ████████████████████████████████████████████████████  Shell: Advanced Terminal CLI v3.0.0",
          "  ██████████████████████████████████████████████████████  Resolution: Full-Stack Developer",
          "██████████████████████████████████████████████████████████CPU: AI Engineer",
          "██████████████████████████████████████████████████████████GPU: Data Science Specialist",
          "██████████████████████████████████████████████████████████Memory: Continuous Learning",
          "  ██████████████████████████████████████████████████████  Commands: " + commandCount,
          "    ████████████████████████████████████████████████████  Theme: " + (isDarkMode ? 'Dark' : 'Light'),
          "      ██████████████████████████████████████████████████  Sound: " + (soundEnabled ? 'Enabled' : 'Disabled'),
          "        ████████████████████████████████████████████████  Matrix: " + (matrixMode ? 'Active' : 'Inactive'),
          "          ██████████████████████████████████████████      ",
          "            ████████████████████████████████████          ",
          "              ██████████████████████████████              ",
          "                ██████████████████████████                ",
          "                    ██████████████████                    "
        ].join('\n');
      }
    },
    {
      command: 'fortune',
      description: 'Get random fortune cookie',
      category: 'Fun',
      action: () => {
        const fortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
        return `\n🔮 Fortune Cookie:\n\n"${fortune}"\n\n✨ Remember: Every line of code is a step towards innovation!`;
      }
    },
    {
      command: 'easter',
      description: 'Find easter eggs',
      category: 'Fun',
      action: () => {
        const egg = EASTER_EGGS[Math.floor(Math.random() * EASTER_EGGS.length)];
        return egg;
      }
    }
  ];

  // Initialize terminal
  useEffect(() => {
    // Add welcome messages immediately
    const welcomeHistory = WELCOME_TEXT.map(text => ({
      type: 'output' as const,
      content: text,
      timestamp: new Date().toLocaleTimeString()
    }));
    setHistory(welcomeHistory);
    
    // Focus input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when clicked
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const executeCommand = useCallback(async (cmdInput: string) => {
    // Handle chaining with ; or &&
    if (cmdInput.includes('&&') || cmdInput.includes(';')) {
      const segments = cmdInput.split(/&&|;/).map(s => s.trim()).filter(Boolean);
      const outputs: string[] = [];
      for (const segment of segments) {
        const out = await executeCommand(segment);
        if (out) outputs.push(out);
      }
      return outputs.join('\n');
    }

    // Alias expansion (only first token)
    const rawParts = cmdInput.trim().split(' ');
    const aliasKey = rawParts[0];
    let expandedInput = cmdInput;
    if (aliasMap[aliasKey]) {
      expandedInput = `${aliasMap[aliasKey]} ${rawParts.slice(1).join(' ')}`.trim();
    }

    const parts = expandedInput.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Increment command counter
    setCommandCount(prev => prev + 1);
    playSound('command');

    const command = commands.find(c => c.command === cmd);
    
    if (command) {
      const result = await command.action(args);
      return result;
    } else if (cmdInput.trim() === '') {
      return '';
    } else {
      // Easter eggs for common mistakes
      if (cmd === 'sudo') {
        return "🔐 Nice try! But you already have all the permissions you need... to be impressed! Try 'hack' for some fun!";
      } else if (cmd === 'rm' || cmd === 'delete') {
        return "⚠️  Whoa there! Let's keep things constructive. Try 'help' instead!";
      } else if (cmd === 'vim' || cmd === 'nano') {
        return "📝 Editor not available in this terminal. But I'm always open to editing... resumes and cover letters!";
      } else if (cmd === 'cd') {
        return "📁 Directory navigation disabled. But let's navigate toward a great opportunity together!";
      } else if (cmd === 'exit' || cmd === 'quit') {
        return "👋 Thanks for visiting! But why leave when there's so much to explore? Try 'matrix' or 'game'!";
      }
      
      playSound('error');
      return `Command '${cmd}' not found. Type 'help' for available commands or try 'ai ${cmd}' to ask the AI assistant!`;
    }
  }, [commands, playSound]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const timestamp = new Date().toLocaleTimeString();
    // Intercept game input if active
    if (gameMode === 'guess' && gameState) {
      const guess = Number(input.trim());
      let output = '';
      if (Number.isNaN(guess) || guess < 1 || guess > 100) {
        output = 'Please enter a valid number between 1 and 100.';
      } else {
        const attempts = gameState.attempts + 1;
        if (guess === gameState.target) {
          output = `✅ Correct! The number was ${gameState.target}. Attempts: ${attempts}. Type 'game' to play again.`;
          setGameMode(null);
          setGameState(null);
        } else if (guess < gameState.target) {
          output = 'Higher ⬆️';
          setGameState({ ...gameState, attempts });
        } else {
          output = 'Lower ⬇️';
          setGameState({ ...gameState, attempts });
        }
      }

      setHistory(prev => [
        ...prev,
        { type: 'input' as const, content: `${userName}@portfolio:${currentPath}$ ${input}`, timestamp },
        { type: 'output' as const, content: output, timestamp }
      ]);

      setCommandHistory(prev => [...prev, input]);
      setHistoryIndex(-1);
      setInput('');
      return;
    }

    const result = await executeCommand(input);

    // Add command to history
    setHistory(prev => [
      ...prev,
      { type: 'input' as const, content: `${userName}@portfolio:${currentPath}$ ${input}`, timestamp },
      ...(result ? [{ type: 'output' as const, content: result, timestamp }] : [])
    ]);

    // Update command history
    setCommandHistory(prev => [...prev, input]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {

    
    playSound('keypress');

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = historyIndex + 1;
      if (newIndex < commandHistory.length) {
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = historyIndex - 1;
      if (newIndex >= 0) {
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = commands.filter(cmd => cmd.command.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0].command);
      } else if (matches.length > 1) {
        // Show available matches
        const matchNames = matches.map(m => `${m.command} (${m.category})`).join(', ');
        const timestamp = new Date().toLocaleTimeString();
        setHistory(prev => [
          ...prev,
          { 
            type: 'output' as const, 
            content: `Available completions: ${matchNames}`, 
            timestamp 
          }
        ]);
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };



  return (
    <div className={`h-screen overflow-hidden transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <div className="h-screen bg-background text-foreground">
        {/* Main Content - Always fullscreen */}
        <div className="h-screen">
          <div className="terminal-container h-full terminal-fullscreen">
            

            {/* Terminal Content */}
            <div 
              ref={terminalRef}
              className="terminal-content h-[calc(100vh-60px)]"
            >
              {/* ASCII Art */}
              <pre className="terminal-ascii mb-4 text-terminal-fg opacity-90">
                {ASCII_ART}
              </pre>



              {/* Command History */}
              {history.map((item, index) => (
                <div key={index} className="terminal-line">
                  {item.type === 'input' ? (
                    <div className="text-terminal-fg flex items-center">
                      <ChevronRight className="h-3 w-3 mr-1 text-green-400" />
                      <span className="terminal-prompt times-bold">{item.content}</span>
                    </div>
                  ) : (
                    <pre className="text-terminal-fg whitespace-pre-wrap times-regular ml-4">
                      {item.content}
                      {item.isTyping && <span className="terminal-cursor">█</span>}
                    </pre>
                  )}
                </div>
              ))}

              {/* Current Input */}
              <form onSubmit={handleSubmit} className="flex items-center mt-2">
                <ChevronRight className="h-3 w-3 mr-1 text-green-400" />
                <span className="terminal-prompt text-terminal-fg times-bold">
                  {userName}@portfolio:{currentPath}$ 
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="terminal-input ml-2 flex-1 times-regular"
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="Type 'help' for available commands..."
                />
                <span className="terminal-cursor">█</span>
              </form>
            </div>
          </div>
        </div>

        {/* Resume Modal */}
        <AnimatePresence>
          {showResume && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card rounded-lg p-6 max-w-4xl w-full max-h-[85vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="dev-heading text-xl font-bold">Resume</h2>
                  <button
                    onClick={() => setShowResume(false)}
                    className="dev-button p-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="dev-subheading text-lg font-semibold">MEDA ANILKUMAR</h3>
                      <p className="dev-caption">AI Engineer & Full-Stack Developer</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => generateResumePDF()}
                        className="dev-button-primary flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download PDF
                      </button>
                    </div>
                  </div>
                  <div className="border rounded overflow-hidden bg-background">
                    <iframe
                      title="Resume PDF"
                      src={resumeDataUri || '/updated%20resume.pdf'}
                      className="w-full h-[65vh]"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Modal */}
        <AnimatePresence>
          {showContact && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card rounded-lg p-6 max-w-md w-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="dev-heading text-xl font-bold">Contact Me</h2>
                  <button
                    onClick={() => setShowContact(false)}
                    className="dev-button p-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <ContactForm />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}