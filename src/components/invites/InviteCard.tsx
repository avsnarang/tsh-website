import { Calendar, MapPin, Users, Ban } from 'lucide-react';
import { Invite } from '../../types/invite';
import Button from '../ui/Button';

interface InviteCardProps {
  invite: Invite;
  onRSVP: (inviteId: string) => void;
  isFullScreen?: boolean;
}

export default function InviteCard({ invite, onRSVP, isFullScreen = false }: InviteCardProps) {
  if (isFullScreen) {
    return (
      <div className="group relative h-full w-full overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-500">
        <div className="absolute inset-0">
          {invite.coverImage ? (
            <img
              src={invite.coverImage}
              alt={invite.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-green-light/20 to-orange-light/20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
          <div className="space-y-6 max-w-3xl">
            <div>
              <h3 className="text-3xl md:text-4xl font-display text-white mb-4 line-clamp-2">{invite.title}</h3>
              <div className="flex flex-col gap-3 text-base md:text-lg text-neutral-light/90">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 shrink-0 text-green-light" />
                  <span>{invite.date} at {invite.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-green-light" />
                  <span>{invite.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 shrink-0 text-green-light" />
                  <span>
                    {invite.rsvpCount} {invite.rsvpCount === 1 ? 'guest' : 'guests'} attending
                    {invite.maxCapacity && ` (${invite.maxCapacity - invite.rsvpCount} spots left)`}
                  </span>
                </div>
              </div>
            </div>

            {invite.description && (
              <p className="text-base md:text-lg text-neutral-light/90 line-clamp-3">{invite.description}</p>
            )}

            {invite.acceptingRsvps ? (
              <Button
                onClick={() => onRSVP(invite.id)}
                className="w-full md:w-auto px-8 py-3 backdrop-blur-sm bg-white/20 hover:bg-white/30 text-base md:text-lg"
                variant="outline"
              >
                View Invitation
              </Button>
            ) : (
              <div className="flex items-center justify-center gap-3 w-full md:w-auto px-6 py-3 bg-red-500/20 backdrop-blur-sm text-white rounded-lg text-base md:text-lg">
                <Ban className="h-5 w-5" />
                RSVPs Closed
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Original compact card design
  return (
    <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-500">
      <div className="absolute inset-0">
        {invite.coverImage ? (
          <img
            src={invite.coverImage}
            alt={invite.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            width="400"
            height="500"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-green-light/20 to-orange-light/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-display text-white mb-2 line-clamp-2">{invite.title}</h3>
            <div className="flex flex-col gap-1.5 text-sm text-neutral-light/80">
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{invite.date} at {invite.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{invite.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">
                  {invite.rsvpCount} {invite.rsvpCount === 1 ? 'guest' : 'guests'} attending
                  {invite.maxCapacity && ` (${invite.maxCapacity - invite.rsvpCount} spots left)`}
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm text-neutral-light/90 line-clamp-2">{invite.description}</p>

          {invite.acceptingRsvps ? (
            <Button
              onClick={() => onRSVP(invite.id)}
              className="w-full backdrop-blur-sm bg-white/20 hover:bg-white/30 text-sm py-2"
              variant="outline"
            >
              View Invitation
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-red-500/20 backdrop-blur-sm text-white rounded-lg text-sm">
              <Ban className="h-4 w-4" />
              RSVPs Closed
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
