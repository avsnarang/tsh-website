import { useEffect } from 'react';

interface TitleProps {
  title: string;
  description?: string;
}

export default function Title({ title, description }: TitleProps) {
  useEffect(() => {
    // Update the document title
    document.title = description 
      ? `${title} | The Scholars' Home`
      : `The Scholars' Home | ${title}`;

    // Cleanup
    return () => {
      document.title = "The Scholars' Home | Excellence in Education Since 2003";
    };
  }, [title, description]);

  return null;
}