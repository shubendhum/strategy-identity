/**
 * Pages Configuration
 * 
 * To add a new page:
 * 1. Add your markdown file to /src/content/
 * 2. Add an entry to this configuration file
 * 
 * Each page needs:
 * - id: unique identifier (used in URL as /pages/{id})
 * - title: Page heading
 * - description: Subtitle shown in header
 * - icon: Icon name from lucide-react (see iconMap in MarkdownPage.jsx)
 * - file: Markdown filename in /src/content/
 * - navLabel: Label shown in navigation (shorter version of title)
 * - order: Sort order in navigation (lower = first)
 * - showInNav: Whether to show in main navigation (default: true)
 */

export const pagesConfig = [
  {
    id: 'overview',
    title: 'Identity Strategy',
    description: 'Reducing cost, improving security, and enabling seamless experience across the enterprise.',
    icon: 'Shield',
    file: 'index.md',
    navLabel: 'Overview',
    order: 1,
    path: '/', // Special case: homepage
    showInNav: true,
  },
  {
    id: 'executive-summary',
    title: 'Executive Summary',
    description: 'A high-level overview of the identity strategy and its key objectives.',
    icon: 'FileText',
    file: 'executive-summary.md',
    navLabel: 'Executive Summary',
    order: 2,
    showInNav: true,
  },
  {
    id: 'why-change',
    title: 'Why Change Is Needed Now',
    description: 'Understanding the current challenges that make transformation essential for the organisation\'s future.',
    icon: 'AlertTriangle',
    file: 'why-change.md',
    navLabel: 'Why Change',
    order: 3,
    showInNav: true,
  },
  {
    id: 'what-is-changing',
    title: 'What Is Changing',
    description: 'We are repositioning identity from a back-office function to a business-enabled platform.',
    icon: 'RefreshCcw',
    file: 'what-is-changing.md',
    navLabel: 'What Is Changing',
    order: 4,
    showInNav: true,
  },
  {
    id: 'security-posture',
    title: 'How the Strategy Improves Security Posture',
    description: 'Security improves because controls are built into the platform, not layered on through process.',
    icon: 'Shield',
    file: 'security-posture.md',
    navLabel: 'Security Posture',
    order: 5,
    showInNav: true,
  },
  {
    id: 'reduces-cost',
    title: 'How This Reduces Cost',
    description: 'Cost reduction comes from simplification, not reduced coverage.',
    icon: 'TrendingDown',
    file: 'how-it-reduces-cost.md',
    navLabel: 'Cost Reduction',
    order: 6,
    showInNav: true,
  },
  {
    id: 'business-experience',
    title: 'How This Improves the Business Experience',
    description: 'Identity becomes an enabler of business velocity, not a barrier to getting work done.',
    icon: 'Briefcase',
    file: 'business-experience.md',
    navLabel: 'Business Experience',
    order: 7,
    showInNav: true,
  },
  {
    id: 'success',
    title: 'What Success Looks Like',
    description: 'Key outcomes and metrics that define success for the identity transformation.',
    icon: 'Target',
    file: 'Success_Looks_Like.md',
    navLabel: 'Success Metrics',
    order: 8,
    showInNav: true,
  },
];

// Helper functions
export const getPageById = (id) => pagesConfig.find(p => p.id === id);

export const getPageByPath = (path) => {
  if (path === '/') return pagesConfig.find(p => p.path === '/');
  const id = path.replace('/pages/', '').replace('/', '');
  return getPageById(id);
};

export const getNavItems = () => 
  pagesConfig
    .filter(p => p.showInNav !== false)
    .sort((a, b) => a.order - b.order)
    .map(p => ({
      href: p.path || `/pages/${p.id}`,
      label: p.navLabel,
    }));

export const getAllPages = () => 
  pagesConfig.sort((a, b) => a.order - b.order);
