// Site-wide settings. Anything left empty here shows a clear,
// honest placeholder on the site instead of a dead link.

export const site = {
  name: 'Had A Nice Day',
  tagline: 'Wear the moment.',
  founder: 'Ron LaBeau',
  podcast: 'Had A Nice Day Podcast Show with Ron LaBeau',
  url: 'https://hadaniceday.com', // TODO: confirm production domain

  // Where form submissions go (Formspree, Klaviyo, HubSpot, a serverless
  // function...). While empty, forms run in preview mode and say so.
  forms: {
    dropList: '',
    story: '',
    guest: '',
  },

  // Podcast listening links. Leave empty until episode one is live.
  listen: [
    { label: 'Apple Podcasts', href: '' },
    { label: 'Spotify', href: '' },
    { label: 'YouTube', href: '' },
  ],

  // Store link for when the first drop goes on sale (Shopify etc.).
  store: '',
};
