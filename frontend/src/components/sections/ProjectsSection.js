import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Folder } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const projects = [
  {
    id: 1,
    title: 'BMW Landing Page',
    description: 'Premium BMW M Series landing page with interactive 3D models, dark/light mode, smooth animations & responsive design. Built with cutting-edge web technologies.',
    tech: ['React', 'TypeScript', 'Three.js', 'Framer Motion', 'TailwindCSS'],
    github: 'https://github.com/SriramDivi1/BMW-Landing-Page',
    live: 'https://bmwgallery.vercel.app/',
    category: 'Frontend',
    featured: true,
    highlights: [
      'Interactive 3D car models',
      'Smooth scroll animations',
      'Dark/Light theme toggle',
      'Fully responsive design'
    ]
  },
  {
    id: 2,
    title: 'Expense Tracker Portfolio',
    description: 'A premium expense tracking application with advanced analytics, budget management, and glassmorphism UI. Features dark mode, interactive charts, and comprehensive financial reports.',
    tech: ['React', 'JavaScript', 'Vite', 'Vanilla CSS', 'Recharts'],
    github: 'https://github.com/SriramDivi1/expense-tracker-portfolio',
    live: 'https://expense-tracker-portfolio-omega.vercel.app',
    category: 'Frontend',
    featured: true,
    highlights: [
      'Budget management system',
      'Interactive analytics charts',
      'Glassmorphism UI design',
      'Advanced filtering & search'
    ]
  },
  {
    id: 3,
    title: 'Mini CRM Backend',
    description: 'Production-quality REST API with NestJS, PostgreSQL, and Prisma. Features JWT authentication, role-based authorization (RBAC), and comprehensive Swagger documentation.',
    tech: ['NestJS', 'TypeScript', 'PostgreSQL', 'Prisma', 'Docker', 'JWT'],
    github: 'https://github.com/SriramDivi1/Mini-CRM-Backend-Developer-Task',
    category: 'Backend',
    featured: true,
    highlights: [
      '15+ REST API endpoints',
      'JWT Auth & RBAC system',
      'Dockerized deployment',
      'Swagger API documentation'
    ]
  },
  {
    id: 4,
    title: 'SyncPlay',
    description: 'One-stop streaming solution for movies, series, and live streams. Watch together with friends in real-time with synchronized playback and chat features.',
    tech: ['TypeScript', 'React', 'WebSockets', 'Node.js'],
    github: 'https://github.com/SriramDivi1/SyncPlay',
    category: 'Full Stack',
    featured: false,
    highlights: [
      'Real-time synchronized playback',
      'Live chat integration',
      'Movie & series streaming',
      'WebSocket communication'
    ]
  },
  {
    id: 5,
    title: 'Real-time Chat App',
    description: 'Real-time messaging application with Socket.IO for instant communication. Features user authentication, message persistence, and responsive design.',
    tech: ['JavaScript', 'Socket.IO', 'Node.js', 'Express'],
    github: 'https://github.com/SriramDivi1/real-time-chat-app',
    category: 'Full Stack',
    featured: false,
    highlights: [
      'Instant messaging',
      'Real-time updates',
      'User authentication',
      'Message persistence'
    ]
  },
  {
    id: 6,
    title: 'ATS Resume System',
    description: 'Applicant Tracking System for resume management and job application tracking. Streamlines hiring process with automated resume parsing and candidate management.',
    tech: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/SriramDivi1/ats-resume-system',
    category: 'Full Stack',
    featured: false,
    highlights: [
      'Resume parsing',
      'Applicant tracking',
      'Job posting management',
      'Candidate database'
    ]
  },
  {
    id: 7,
    title: 'Fixapp',
    description: 'TypeScript-based utility application focused on solving common development workflow challenges with modern tooling and best practices.',
    tech: ['TypeScript', 'React', 'Node.js'],
    github: 'https://github.com/SriramDivi1/Fixapp',
    category: 'Full Stack',
    featured: false,
    highlights: [
      'Type-safe development',
      'Modern React patterns',
      'Developer utilities',
      'Clean architecture'
    ]
  },
];

const categories = ['All', 'Frontend', 'Backend', 'Full Stack'];

const ProjectsSection = () => {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section
      id="projects"
      data-testid="projects-section"
      className={`py-24 md:py-32 ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className={`font-mono text-sm ${isDark ? 'text-primary' : 'text-primary'}`}>
            {'// 02. PROJECTS'}
          </span>
          <h2 className={`font-display text-4xl md:text-6xl font-semibold mt-4 ${
            isDark ? 'text-dark-text' : 'text-light-text'
          }`}>
            What I've Built
          </h2>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              data-testid={`filter-${category.toLowerCase()}`}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-mono text-sm transition-all ${
                activeCategory === category
                  ? 'bg-primary text-white'
                  : isDark
                    ? 'bg-dark-surface text-dark-muted hover:text-dark-text border border-dark-border'
                    : 'bg-light-surface text-light-muted hover:text-light-text border border-light-border'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid - Bento Style */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                data-testid={`project-card-${project.id}`}
                className={`group relative p-6 rounded-2xl transition-all ${
                  project.featured ? 'md:col-span-2 lg:col-span-2' : ''
                } ${
                  isDark
                    ? 'bg-dark-surface border border-dark-border hover:border-primary/50'
                    : 'bg-light-surface border border-light-border hover:border-primary/50'
                }`}
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}>
                    <Folder size={24} className="text-primary" />
                  </div>
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`project-github-${project.id}`}
                        className={`p-2 rounded-lg transition-colors ${
                          isDark
                            ? 'hover:bg-dark-bg text-dark-muted hover:text-dark-text'
                            : 'hover:bg-light-bg text-light-muted hover:text-light-text'
                        }`}
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg transition-colors ${
                          isDark
                            ? 'hover:bg-dark-bg text-dark-muted hover:text-dark-text'
                            : 'hover:bg-light-bg text-light-muted hover:text-light-text'
                        }`}
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <span className="inline-block px-3 py-1 mb-4 text-xs font-mono bg-primary/20 text-primary rounded-full">
                    Featured Project
                  </span>
                )}

                {/* Project Info */}
                <h3 className={`font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors ${
                  isDark ? 'text-dark-text' : 'text-light-text'
                }`}>
                  {project.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-4 ${
                  isDark ? 'text-dark-muted' : 'text-light-muted'
                }`}>
                  {project.description}
                </p>

                {/* Highlights */}
                {project.featured && (
                  <ul className={`mb-4 space-y-2 ${isDark ? 'text-dark-muted' : 'text-light-muted'}`}>
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 text-xs font-mono rounded-lg ${
                        isDark
                          ? 'bg-dark-bg text-dark-muted'
                          : 'bg-light-bg text-light-muted'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;
