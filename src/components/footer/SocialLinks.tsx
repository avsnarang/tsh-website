import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const socialLinks = [
  { Icon: Facebook, href: '#', label: 'Facebook' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
  { Icon: Youtube, href: '#', label: 'YouTube' }
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