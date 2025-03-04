import { Link } from 'react-router-dom';

const links = [
  { label: 'About Us', href: '/about' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Academics', href: '/academics' },
  { label: 'Campus Life', href: '/campuses' },
  { label: 'Co-Curricular', href: '/co-curricular' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' }
];

export default function QuickLinks() {
  return (
    <div className="text-center">
      <h3 className="text-xl text-neutral-light mb-4">Quick Links</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.href}
              className="text-neutral-light/80 hover:text-primary-light transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}