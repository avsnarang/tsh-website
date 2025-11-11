import { ReactNode } from 'react';
import '../styles/globals.css';

// Note: Font loading is handled in src/styles/index.css via @import

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <div className="font-body">
      {children}
    </div>
  );
}
