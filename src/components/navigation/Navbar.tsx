'use client';

import { useState, useEffect, useRef, memo, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu, X, GraduationCap, ChevronDown,
  Info, BookOpen, Building, Trophy,
  Music, Palette, Users, Calendar,
  Heart, Star, Brain, Award,
  Phone, Image, Video, MoreHorizontal,
  LucideIcon
} from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import Logo from '../ui/Logo';
import BreadcrumbNav from './BreadcrumbNav';
import { motion, useScroll, useTransform } from 'framer-motion';
import { supabase } from '../../lib/supabase';

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  description: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

interface NavDropdownProps {
  label: string;
  groups: NavGroup[];
  textColor: any;
  isMenuOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  isAnyDropdownOpen?: boolean;
}

interface NavItemType {
  type: 'dropdown' | 'link';
  label: string;
  href?: string;
  icon?: LucideIcon;
  groups?: NavGroup[];
  priority?: 'high' | 'low'; // high = always visible, low = hidden in "More" at smaller screens
}

function NavDropdown({ label, groups, textColor, isMenuOpen, onOpenChange, isAnyDropdownOpen }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<NavItem | null>(null);
  const [alignRight, setAlignRight] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if dropdown should align right to stay on screen
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const dropdownWidth = 500;
      const wouldOverflow = rect.left + dropdownWidth > window.innerWidth - 20;
      setAlignRight(wouldOverflow);
    }
  }, [isOpen]);

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onOpenChange]);

  const handleMouseEnter = () => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
    onOpenChange?.(true);
  };

  const handleMouseLeave = () => {
    // Add delay before closing, but only if not switching to another dropdown
    closeTimeoutRef.current = setTimeout(() => {
      if (!dropdownRef.current?.matches(':hover')) {
        setIsOpen(false);
        setHoveredItem(null);
        onOpenChange?.(false);
      }
    }, 150);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div style={{ color: isMenuOpen ? '#FFFFFF' : textColor }}>
        <button
          className="flex items-center gap-1 px-2 2xl:px-4 py-2 rounded-lg hover:bg-white/10 transition-colors whitespace-nowrap text-sm 2xl:text-base"
          onClick={() => {
            setIsOpen(!isOpen);
            onOpenChange?.(!isOpen);
          }}
        >
          {label}
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </motion.div>

      {isOpen && (
        <div
          className={`absolute top-full w-[500px] py-4 rounded-2xl shadow-xl ${
            isMenuOpen ? 'bg-orange' : 'bg-white'
          } ${alignRight ? 'right-0' : 'left-0'}`}
          style={{ transform: 'translateY(0.5rem)' }}
        >
          <div className="flex">
            {/* Links Column */}
            <div className="w-1/2 border-r border-neutral-dark/10">
              {groups.map((group) => (
                <div key={group.label}>
                  <div className="px-4 py-2 text-sm font-semibold text-primary/80">{group.label}</div>
                  <div>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      if (!item.href) return null;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`group px-4 py-2 flex items-center gap-3 transition-colors ${
                            isMenuOpen
                              ? 'hover:bg-orange-dark text-neutral-light'
                              : 'hover:bg-primary/5 text-neutral-dark'
                          }`}
                          onMouseEnter={() => setHoveredItem(item)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <Icon className={`h-4 w-4 ${isMenuOpen ? 'text-neutral-light' : 'text-primary'}`} />
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Description Column */}
            <div className="w-1/2 p-4">
              {hoveredItem ? (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`text-sm leading-relaxed ${
                    isMenuOpen
                      ? 'text-neutral-light/90'
                      : 'text-neutral-dark/80'
                  }`}
                >
                  {hoveredItem.description}
                </motion.div>
              ) : (
                <div className={`text-sm italic ${
                  isMenuOpen
                    ? 'text-neutral-light/60'
                    : 'text-neutral-dark/60'
                }`}>
                  Hover over a link to learn more
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// "More" menu for overflow items at intermediate screen sizes
interface MoreMenuProps {
  items: NavItemType[];
  textColor: any;
  isMenuOpen: boolean;
}

function MoreMenu({ items, textColor, isMenuOpen }: MoreMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Flatten all links from the overflow items
  const allLinks = items.flatMap(item =>
    item.groups?.flatMap(group => group.items) || []
  );

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setTimeout(() => {
          if (!dropdownRef.current?.matches(':hover')) {
            setIsOpen(false);
          }
        }, 150);
      }}
    >
      <motion.div style={{ color: isMenuOpen ? '#FFFFFF' : textColor }}>
        <button
          className="flex items-center gap-1 px-2 py-2 rounded-lg hover:bg-white/10 transition-colors whitespace-nowrap text-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MoreHorizontal className="h-5 w-5" />
          <span className="sr-only">More</span>
        </button>
      </motion.div>

      {isOpen && (
        <div
          className={`absolute top-full right-0 w-[280px] py-3 rounded-2xl shadow-xl ${
            isMenuOpen ? 'bg-orange' : 'bg-white'
          }`}
          style={{ transform: 'translateY(0.5rem)' }}
        >
          {items.map((item) => (
            <div key={item.label} className="mb-2 last:mb-0">
              <div className={`px-4 py-1 text-xs font-semibold uppercase tracking-wide ${
                isMenuOpen ? 'text-neutral-light/60' : 'text-primary/60'
              }`}>
                {item.label}
              </div>
              {item.groups?.map((group) => (
                <div key={group.label}>
                  {group.items.map((subItem) => {
                    if (!subItem.href) return null;
                    const Icon = subItem.icon;
                    return (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={`px-4 py-2 flex items-center gap-3 transition-colors ${
                          isMenuOpen
                            ? 'hover:bg-orange-dark text-neutral-light'
                            : 'hover:bg-primary/5 text-neutral-dark'
                        }`}
                      >
                        <Icon className={`h-4 w-4 ${isMenuOpen ? 'text-neutral-light' : 'text-primary'}`} />
                        <span className="text-sm font-medium">{subItem.label}</span>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Memoize the Navbar to prevent unnecessary re-renders
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [updates, setUpdates] = useState<Array<{ content: string; link?: string }>>([]);
  const [currentUpdateIndex, setCurrentUpdateIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(166, 90, 32, 0.95)', 'rgba(255, 255, 255, 1)']
  );
  const textColor = useTransform(
    scrollY,
    [0, 100],
    ['rgb(255, 255, 255)', 'rgb(32, 32, 32)']
  );
  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    ['none', '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)']
  );

  // Add these new transforms
  const bannerOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  const bannerTransform = useTransform(
    scrollY,
    [0, 100],
    ['translateY(0px)', 'translateY(-20px)']
  );
  const bannerPointerEvents = useTransform(
    scrollY,
    (value) => value > 50 ? 'none' : 'auto'
  );

  // Breadcrumb auto-hide transforms (same pattern as banner)
  const breadcrumbOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  const breadcrumbTransform = useTransform(
    scrollY,
    [0, 100],
    ['translateY(0px)', 'translateY(-20px)']
  );
  const breadcrumbPointerEvents = useTransform(
    scrollY,
    (value) => value > 50 ? 'none' : 'auto'
  );

  // Defer non-critical updates fetch to after initial render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only fetch updates after component has mounted (not blocking initial render)
    if (isMounted) {
      const timer = setTimeout(() => {
        fetchUpdates();
      }, 100); // Small delay to not block initial paint
      return () => clearTimeout(timer);
    }
  }, [isMounted]);

  useEffect(() => {
    if (updates.length > 0) {
      const interval = setInterval(() => {
        setCurrentUpdateIndex((prevIndex) => 
          prevIndex === updates.length - 1 ? 0 : prevIndex + 1
        );
      }, 10000); // Rotate every 10 seconds

      return () => clearInterval(interval);
    }
  }, [updates]);

  const fetchUpdates = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('latest_updates')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUpdates(data || []);
    } catch (error) {
      console.error('Error fetching updates:', error);
    }
  }, []);

  const navItems: NavItemType[] = [
    {
      type: 'dropdown',
      label: 'About',
      priority: 'high',
      groups: [
        {
          label: 'Our Institution',
          items: [
            { icon: Info, label: 'Our Story', href: '/about', description: 'Learn about our legacy and achievements' },
            { icon: Star, label: 'Mission & Vision', href: '/about/vision', description: 'Our guiding principles and goals' },
            { icon: Award, label: 'What our Leaders Say', href: '/about/messages', description: 'Messages from our school leaders' },
            { icon: Heart, label: 'Scholarships', href: '/scholarship', description: 'Financial aid and merit scholarships' }
          ]
        }
      ]
    },
    {
      type: 'dropdown',
      label: 'Academics',
      priority: 'high',
      groups: [
        {
          label: 'School Levels',
          items: [
            { icon: Heart, label: 'Pre-Primary', href: '/academics/pre-primary', description: 'Early childhood education (Ages 2-6)' },
            { icon: Star, label: 'Primary', href: '/academics/primary', description: 'Foundation years (Grades 1-5)' },
            { icon: Brain, label: 'Middle School', href: '/academics/middle', description: 'Grades 6-8 curriculum' },
            { icon: BookOpen, label: 'Secondary', href: '/academics/secondary', description: 'CBSE Grades 9-10' },
            { icon: Award, label: 'Senior Secondary', href: '/academics/senior-secondary', description: 'Grades 11-12 with streams' }
          ]
        }
      ]
    },
    {
      type: 'dropdown',
      label: 'Campus Life',
      priority: 'low', // Hidden in "More" at smaller desktop sizes
      groups: [
        {
          label: 'Our Campuses',
          items: [
            {
              icon: Building,
              label: 'Paonta Sahib',
              href: '/campus/paonta-sahib',
              description: 'Our flagship campus spanning 25 acres with state-of-the-art facilities including smart classrooms, advanced laboratories, and comprehensive sports infrastructure.'
            },
            {
              icon: Heart,
              label: 'Juniors',
              href: '/campus/juniors',
              description: 'A specialized campus dedicated to early years education, featuring child-friendly spaces, Montessori-equipped classrooms, and safe play areas.'
            },
            {
              icon: Star,
              label: 'Majra',
              href: '/campus/majra',
              description: 'Modern educational facilities blending traditional values with contemporary learning approaches. Features digital classrooms and dedicated sports academy.'
            }
          ]
        },
        {
          label: 'Activities & Programs',
          items: [
            {
              icon: Music,
              label: 'Performing Arts',
              href: '/co-curricular/performing-arts',
              description: 'Comprehensive performing arts program featuring music, dance, and theater with professional training.'
            },
            {
              icon: Trophy,
              label: 'Sports',
              href: '/co-curricular/sports-athletics',
              description: 'Excellence in sports with professional coaching across multiple disciplines.'
            },
            {
              icon: Palette,
              label: 'Visual Arts',
              href: '/co-curricular/visual-arts',
              description: 'Creative expression through various art forms including painting, sculpture, and digital arts.'
            },
            {
              icon: Users,
              label: 'Clubs',
              href: '/co-curricular/clubs-societies',
              description: 'Diverse range of clubs and societies fostering leadership, innovation, and community service.'
            }
          ]
        }
      ]
    },
    {
      type: 'dropdown',
      label: 'Community',
      priority: 'low', // Hidden in "More" at smaller desktop sizes
      groups: [
        {
          label: 'Connect & Engage',
          items: [
            {
              icon: Users,
              label: 'Alumni Network',
              href: '/alumni',
              description: 'Connect with our vibrant alumni community. Access the alumni directory and share your success story.'
            },
            {
              icon: Image,
              label: 'Photo Gallery',
              href: '/gallery',
              description: 'Explore our collection of memories through photos from various school events and celebrations.'
            },
            {
              icon: Video,
              label: 'Video Gallery',
              href: '/video-gallery',
              description: 'Watch our curated collection of videos showcasing school events and student performances.'
            },
            {
              icon: Calendar,
              label: 'Events',
              href: '/invites',
              description: 'Stay updated with upcoming school events and activities. RSVP for functions and join our celebrations.'
            }
          ]
        }
      ]
    },
    {
      type: 'link',
      label: 'Admissions',
      href: '/admissions',
      icon: GraduationCap,
      priority: 'high'
    },
    {
      type: 'link',
      label: 'Contact',
      href: '/contact',
      icon: Phone,
      priority: 'high'
    }
  ];

  // Split items by priority
  const highPriorityItems = navItems.filter(item => item.priority === 'high');
  const lowPriorityItems = navItems.filter(item => item.priority === 'low');

  return (
    <>
      <nav className="fixed w-full z-50 pt-4">
        <Container>
          <motion.div
            style={{
              backgroundColor: isMenuOpen ? "transparent" : backgroundColor,
              boxShadow: isMenuOpen ? "none" : boxShadow,
            }}
            className="relative flex justify-between items-center rounded-full px-6 py-3 backdrop-blur-sm"
          >
            <motion.div style={{ color: isMenuOpen ? "#FFFFFF" : textColor }}>
              <Logo variant={isMenuOpen ? "light" : "default"} />
            </motion.div>

            <div className="hidden lg:flex items-center space-x-1 2xl:space-x-2">
              {/* High priority items - always visible */}
              {highPriorityItems.map((item) =>
                item.type === "dropdown" ? (
                  <NavDropdown
                    key={item.label}
                    label={item.label}
                    groups={item.groups || []}
                    textColor={textColor}
                    isMenuOpen={isMenuOpen}
                  />
                ) : (
                  item.icon && (
                    <motion.div
                      key={item.label}
                      style={{ color: isMenuOpen ? "#FFFFFF" : textColor }}
                    >
                      <Link
                        href={item.href || '#'}
                        className="flex items-center gap-1.5 2xl:gap-2 px-2 2xl:px-3 py-2 rounded-lg hover:bg-white/10 transition-colors whitespace-nowrap text-sm 2xl:text-base"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                )
              )}

              {/* Low priority items - only visible at 2xl (1536px) and above */}
              {lowPriorityItems.map((item) =>
                item.type === "dropdown" ? (
                  <div key={item.label} className="hidden 2xl:block">
                    <NavDropdown
                      label={item.label}
                      groups={item.groups || []}
                      textColor={textColor}
                      isMenuOpen={isMenuOpen}
                    />
                  </div>
                ) : null
              )}

              {/* "More" menu - visible at lg-xl, hidden at 2xl */}
              {lowPriorityItems.length > 0 && (
                <div className="2xl:hidden">
                  <MoreMenu
                    items={lowPriorityItems}
                    textColor={textColor}
                    isMenuOpen={isMenuOpen}
                  />
                </div>
              )}

              <Link href="/admissions" className="ml-1 2xl:ml-2">
                <Button
                  variant="cta-green"
                  className="flex items-center justify-center gap-1.5 2xl:gap-2 text-sm 2xl:text-base px-3 2xl:px-4 whitespace-nowrap"
                >
                  <GraduationCap className="h-4 w-4 2xl:h-5 2xl:w-5" />
                  <span className="2xl:hidden">Apply</span>
                  <span className="hidden 2xl:inline">Join Now</span>
                </Button>
              </Link>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 z-50"
              style={{ color: isMenuOpen ? "#FFFFFF" : textColor.toString() }}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </motion.div>

          {/* Dynamic Updates Banner */}
          {updates.length > 0 && !isMenuOpen && (
            <div className="absolute left-0 right-0 md:right-[60px] md:left-auto top-[80px] -z-40">
              <Container>
                <motion.div
                  key={currentUpdateIndex}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  style={{
                    opacity: bannerOpacity,
                    transform: bannerTransform,
                    pointerEvents: bannerPointerEvents
                  }}
                  transition={{ 
                    duration: 0.3,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="px-6 md:px-0"
                >
                  <Link
                    href={updates[currentUpdateIndex]?.link || "#"}
                    className="inline-flex items-center gap-2 px-4 md:px-6 py-3 md:pt-6 md:pb-4 text-xs md:text-sm font-semibold bg-orange-light/60 text-orange-dark hover:bg-orange-light/90 transition-all duration-300 rounded-b-[30px] md:rounded-b-[30px] hover:scale-100 hover:translate-y-2 transform border border-orange/20 w-full md:w-auto justify-center md:justify-start text-center"
                    onClick={(e) => {
                      if (!updates[currentUpdateIndex]?.link) {
                        e.preventDefault();
                      }
                    }}
                  >
                    {updates[currentUpdateIndex]?.content.split('•')[0].trim()} →
                  </Link>
                </motion.div>
              </Container>
            </div>
          )}

          {/* Breadcrumbs - shown below navbar with frosted glass effect */}
          {!isMenuOpen && (
            <motion.div
              className="absolute left-0 right-0 top-[80px] z-10 px-8 mt-16 sm:mt-2 md:mt-4
                lg:mt-8 sm:px-12 lg:px-16 flex justify-center sm:justify-start"
              style={{
                opacity: breadcrumbOpacity,
                transform: breadcrumbTransform,
                pointerEvents: breadcrumbPointerEvents
              }}
            >
              <BreadcrumbNav />
            </motion.div>
          )}
        </Container>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          x: isMenuOpen ? 0 : "100%",
        }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 bg-primary z-40 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="absolute inset-0 overflow-y-auto overscroll-contain">
          <Container>
            <div className="min-h-screen pt-32 pb-safe">
              <div className="space-y-8">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.type === "dropdown" && item.groups ? (
                      <div className="space-y-6">
                        <h3 className="text-xl text-neutral-light font-semibold">
                          {item.label}
                        </h3>
                        {item.groups.map((group) => (
                          <div key={group.label} className="space-y-4">
                            <h4 className="text-primary-light font-medium">
                              {group.label}
                            </h4>
                            <div className="space-y-3 pl-4">
                              {group.items.map((subItem) => (
                                subItem.href ? (
                                  <Link
                                    key={subItem.href}
                                    href={subItem.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-3 text-neutral-light/80 hover:text-neutral-light transition-colors"
                                  >
                                    <subItem.icon className="h-4 w-4" />
                                    <span>{subItem.label}</span>
                                  </Link>
                                ) : null
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : item.icon && item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 text-xl text-neutral-light hover:text-neutral-light/80 transition-colors"
                      >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    ) : null}
                  </div>
                ))}
                <Link
                  href="/admissions"
                  onClick={() => setIsMenuOpen(false)}
                  className="block mt-8"
                >
                  <Button
                    variant="cta-green"
                    className="w-full text-lg flex items-center justify-center gap-2"
                  >
                    <GraduationCap className="h-5 w-5" />
                    Join Now
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </motion.div>
    </>
  );
}

export default memo(Navbar);
