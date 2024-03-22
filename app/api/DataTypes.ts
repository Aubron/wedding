export interface RsvpUser {
  _id: string;
  name_primary: string;
  name_secondary?: string;
  hasVisited: boolean;
  hasRsvped: boolean;
  rsvpStatus: boolean;
  vegan: boolean;
  rsvpSecondaryStatus: boolean;
  veganSecondary: boolean;
  secondaryEditable: boolean;
}

export interface UpdateUserInput {
  name_secondary?: string;
  rsvpStatus: boolean;
  vegan: boolean;
  veganSecondary: boolean;
  rsvpSecondaryStatus: boolean;
}
