import Calendar from '@/pages/Calendar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Academic Calendar',
  description: 'View our academic calendar with important dates and events.',
};

export default function CalendarPage() {
  return <Calendar />;
}

