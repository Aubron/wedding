export interface RsvpUser {
  _id: string;
  name_primary: string;
  name_secondary?: string;
  hasVisited: boolean;
  hasRsvped: boolean;
  rsvpStatus: boolean;
  vegan: boolean;
}
