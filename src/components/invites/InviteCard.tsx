import { Calendar, MapPin, Users, Ban } from 'lucide-react';
import { Invite } from '../../types/invite';
import Button from '../ui/Button';

interface InviteCardProps {
  invite: Invite;
  onRSVP: (inviteId: string) => void;
  className?: string;
}

export default function InviteCard({ invite, onRSVP, className = '' }: InviteCardProps) {
  return (
    <div className={`group relative aspect-[4/5] overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all duration-500 ${className}`}>
      <div className="absolute inset-0">
        <img
          src={invite.coverImage}
          alt={invite.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          width="400"
          height="500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-8">
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-display text-white mb-2 line-clamp-2">{invite.title}</h3>
            <div className="flex flex-col gap-2 text-neutral-light/80">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 shrink-0" />
                <span className="truncate">{invite.date} at {invite.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                <span className="truncate">{invite.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 shrink-0" />
                <span className="truncate">
                  {invite.rsvpCount} {invite.rsvpCount === 1 ? 'guest' : 'guests'} attending
                  {invite.maxCapacity && ` (${invite.maxCapacity - invite.rsvpCount} spots left)`}
                </span>
              </div>
            </div>
          </div>

          <p className="text-neutral-light/90 line-clamp-2">{invite.description}</p>

          {invite.acceptingRsvps ? (
            <Button
              onClick={() => onRSVP(invite.id)}
              className="w-full backdrop-blur-sm bg-white/20 hover:bg-white/30"
              variant="outline"
            >
              View Invitation
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-red-500/20 backdrop-blur-sm text-white rounded-lg">
              <Ban className="h-5 w-5" />
              RSVPs Closed
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
