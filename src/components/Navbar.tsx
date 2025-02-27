import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, X, GraduationCap, ChevronDown,
  Info, BookOpen, Building, Trophy, 
  Music, Palette, Users, Calendar,
  Heart, Star, Brain, Award,
  MapPin, Phone, Image
} from 'lucide-react';
import Container from './ui/Container';
import Button from './ui/Button';
import Logo from './ui/Logo';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SpeedInsights } from "@vercel/speed-insights/react";

interface NavItem {
  icon: React.ElementType;
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
}

function NavDropdown({ label, groups, textColor, isMenuOpen }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<NavItem | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div 
      ref={dropdownRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        // Add delay before closing to allow movement to dropdown content
        setTimeout(() => {
          if (!dropdownRef.current?.matches(':hover')) {
            setIsOpen(false);
            setHoveredItem(null);
          }
        }, 100);
      }}
    >
      <motion.div style={{ color: isMenuOpen ? '#FFFFFF' : textColor }}>
        <button 
          className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setIsOpen(!isOpen)} // Allow clicking to toggle on mobile
        >
          {label}
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </motion.div>
      
      {isOpen && (
        <div 
          className={`absolute top-full -left-4 w-[600px] py-4 rounded-2xl shadow-xl transition-all duration-300 ${
            isMenuOpen ? 'bg-orange' : 'bg-white'
          }`}
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
                      return (
                        <Link 
                          key={item.href}
                          to={item.href || '/'}
                          className={`group px-4 py-2 flex items-center gap-3 transition-colors ${
                            isMenuOpen 
                              ? 'hover:bg-orange-dark text-neutral-light' 
                              : 'hover:bg-primary/5 text-neutral-dark'
                          }`}
                          onMouseEnter={() => setHoveredItem(item)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          {Icon && <Icon className={`h-4 w-4 ${isMenuOpen ? 'text-neutral-light' : 'text-primary'}`} />}
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
                  transition={{ duration: 0.2 }}
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

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const navItems = [
    {
      type: 'dropdown',
      label: 'About',
      groups: [
        {
          label: 'Our Institution',
          items: [
            { icon: Info, label: 'Overview', href: '/about', description: 'Learn about our legacy and achievements' },
            { icon: Star, label: 'Vision & Mission', href: '/about/vision', description: 'Our guiding principles and goals' },
            { icon: Award, label: 'Leadership', href: '/about/messages', description: 'Messages from our school leaders' },
            { icon: Heart, label: 'Scholarships', href: '/scholarship', description: 'Financial aid and merit scholarships' }
          ]
        }
      ]
    },
    {
      type: 'dropdown',
      label: 'Academics',
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
      groups: [
        {
          label: 'Our Campuses',
          items: [
            { 
              icon: Building, 
              label: 'Paonta Sahib', 
              href: '/campus/paonta-sahib', 
              description: '🏛️ Our flagship campus spanning 25 acres with state-of-the-art facilities including smart classrooms, advanced laboratories, and comprehensive sports infrastructure. Home to over 1,400 students pursuing excellence in education from pre-primary to senior secondary levels.' 
            },
            { 
              icon: Heart, 
              label: 'Juniors', 
              href: '/campus/juniors', 
              description: '🌟 A specialized campus dedicated to early years education, featuring child-friendly spaces, Montessori-equipped classrooms, and safe play areas. Our nurturing environment helps young learners aged 2-7 develop foundational skills through play-based learning.' 
            },
            { 
              icon: Star, 
              label: 'Majra', 
              href: '/campus/majra', 
              description: '🎯 Modern educational facilities blending traditional values with contemporary learning approaches. Features digital classrooms, performing arts center, and dedicated sports academy serving 1,500+ students with a focus on holistic development.' 
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
              description: '🎭 Comprehensive performing arts program featuring music, dance, and theater. Professional training in classical and contemporary forms, regular performances, and state-of-the-art auditorium for showcasing talent.' 
            },
            { 
              icon: Trophy, 
              label: 'Sports', 
              href: '/co-curricular/sports-athletics', 
              description: '🏆 Excellence in sports with professional coaching across multiple disciplines. Features Olympic-size swimming pool, indoor sports complex, and specialized training programs for aspiring athletes.' 
            },
            { 
              icon: Palette, 
              label: 'Visual Arts', 
              href: '/co-curricular/visual-arts', 
              description: '🎨 Creative expression through various art forms including painting, sculpture, and digital arts. Well-equipped studios, regular exhibitions, and expert guidance for nurturing artistic talents.' 
            },
            { 
              icon: Users, 
              label: 'Clubs', 
              href: '/co-curricular/clubs-societies', 
              description: '👥 Diverse range of clubs and societies fostering leadership, innovation, and community service. From science and debate clubs to environmental initiatives and cultural societies.' 
            }
          ]
        }
      ]
    },
    {
      type: 'dropdown',
      label: 'Community',
      groups: [
        {
          label: 'Connect & Engage',
          items: [
            { 
              icon: Users, 
              label: 'Alumni Network', 
              href: '/alumni', 
              description: 'Connect with our vibrant alumni community. Access the alumni directory, share your success story, and stay connected with your alma mater.' 
            },
            { 
              icon: Image, 
              label: 'Photo Gallery', 
              href: '/gallery', 
              description: 'Explore our collection of memories through photos from various school events, celebrations, and achievements.' 
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
      icon: GraduationCap
    },
    {
      type: 'link',
      label: 'Contact',
      href: '/contact',
      icon: Phone
    }
  ];

  return (
    <>
      <nav className="fixed w-full z-50 pt-4">
        <Container>
          <motion.div 
            style={{ 
              backgroundColor: isMenuOpen ? 'transparent' : backgroundColor,
              boxShadow: isMenuOpen ? 'none' : boxShadow
            }}
            className="relative flex justify-between items-center rounded-full px-6 py-3 backdrop-blur-sm"
          >
            <motion.div style={{ color: isMenuOpen ? '#FFFFFF' : textColor }}>
              <Logo variant={isMenuOpen ? 'light' : 'default'} />
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                item.type === 'dropdown' ? (
                  <NavDropdown
                    key={item.label}
                    label={item.label}
                    groups={item.groups || []}
                    textColor={textColor}
                    isMenuOpen={isMenuOpen}
                  />
                ) : (
                  <motion.div key={item.label} style={{ color: isMenuOpen ? '#FFFFFF' : textColor }}>
                    <Link 
                      to={item.href || '/'}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      {item.label}
                    </Link>
                  </motion.div>
                )
              ))}
              <Link to="/admissions" className="ml-2">
                <Button 
                  variant="cta-green"
                  className="min-w-[140px] flex items-center justify-center gap-2"
                >
                  <GraduationCap className="h-5 w-5" />
                  Join Now
                </Button>
              </Link>
            </div>

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 z-50"
              style={{ color: isMenuOpen ? '#FFFFFF' : textColor }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </motion.div>
        </Container>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0,
          x: isMenuOpen ? 0 : '100%'
        }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 bg-primary z-40 ${isMenuOpen ? 'block' : 'hidden'}`}
      >
        <div className="absolute inset-0 overflow-y-auto overscroll-contain">
          <Container>
            <div className="min-h-screen pt-32 pb-safe">
              <div className="space-y-8">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.type === 'dropdown' ? (
                      <div className="space-y-6">
                        <h3 className="text-xl text-neutral-light font-semibold">{item.label}</h3>
                        {item.groups?.map((group) => (
                          <div key={group.label} className="space-y-4">
                            <h4 className="text-primary-light font-medium">{group.label}</h4>
                            <div className="space-y-3 pl-4">
                              {group.items.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  to={subItem.href || '/'}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="flex items-center gap-3 text-neutral-light/80 hover:text-neutral-light transition-colors"
                                >
                                  <subItem.icon className="h-4 w-4" />
                                  <span>{subItem.label}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Link
                        to={item.href || '/'}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 text-xl text-neutral-light hover:text-neutral-light/80 transition-colors"
                      >
                        {item.icon && <item.icon className="h-5 w-5" />}
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
                <Link 
                  to="/admissions" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block mt-8"
                >
                  <Button 
                    variant="cta"
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