import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const socialLinks = [
  { Icon: Facebook, href: 'https://www.facebook.com/tscholarshome', label: 'Facebook' },
  { Icon: Instagram, href: 'https://www.instagram.com/thescholars.home', label: 'Instagram' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/school/thescholarshome', label: 'LinkedIn' },
  { Icon: Youtube, href: 'https://www.youtube.com/@the.scholarshome', label: 'YouTube' }
];

export default function SocialLinks() {
  return (
    <div className="flex gap-4">
      {socialLinks.map(({ Icon, href, label }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="text-neutral-light/80 hover:text-primary-light transition-colors"
        >
          <Icon className="h-6 w-6" />
        </a>
      ))}
    </div>
  );
}