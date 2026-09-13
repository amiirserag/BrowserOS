/**
 * Demonstration copy only.
 * The buyer did not supply a restaurant name, menu, hours, location, or assets.
 * Replace this file after client answers land — do not treat these strings as facts.
 */
export const SAMPLE_NOTICE =
  'Sample preview — restaurant name, menu, hours, and location were not provided. Nothing on this site is client data.';

export const brand = {
  isSample: true,
  name: 'Restaurant',
  wordmark: 'Restaurant',
  tagline: 'An evening, composed',
  cuisine: 'Seasonal tasting kitchen',
} as const;

export type MenuCategoryId = 'tasting' | 'starters' | 'mains' | 'desserts' | 'wine';

export interface MenuItem {
  name: string;
  description: string;
  priceLabel: string;
  note?: string;
}

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
  intro: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'tasting',
    label: 'Tasting',
    intro: 'A sample seven-course cadence. Replace with the kitchen’s actual tasting menu and pairing notes.',
    items: [
      {
        name: 'First light',
        description: 'Chilled herb consommé, citrus oil, garden herbs.',
        priceLabel: 'Included',
      },
      {
        name: 'The garden',
        description: 'Charred leek, smoked almond cream, pickled shallot.',
        priceLabel: 'Included',
      },
      {
        name: 'From the coast',
        description: 'Day-boat crudo, green strawberry, fennel pollen.',
        priceLabel: 'Included',
      },
      {
        name: 'The hearth',
        description: 'Slow-roasted root, bone jus, cracked pepper.',
        priceLabel: 'Included',
      },
      {
        name: 'Last fire',
        description: 'Warm chocolate, olive oil, sea salt.',
        priceLabel: 'Included',
      },
    ],
  },
  {
    id: 'starters',
    label: 'Starters',
    intro: 'Sample starters for layout and pacing. Prices and dishes are not the client’s.',
    items: [
      {
        name: 'Heirloom tomato',
        description: 'Basil oil, aged vinegar, warm bread.',
        priceLabel: 'Price pending',
      },
      {
        name: 'Hand-cut tartare',
        description: 'Cured yolk, rye crumb, mustard leaf.',
        priceLabel: 'Price pending',
      },
      {
        name: 'Baked oyster',
        description: 'Brown butter, lemon thyme, brioche.',
        priceLabel: 'Price pending',
      },
    ],
  },
  {
    id: 'mains',
    label: 'Mains',
    intro: 'Sample plates to show hierarchy, pairing notes, and motion. Not a live menu.',
    items: [
      {
        name: 'Line-caught fish',
        description: 'Beurre blanc, early peas, new potato.',
        priceLabel: 'Price pending',
        note: 'Wine pairing pending',
      },
      {
        name: 'Dry-aged cut',
        description: 'Charred allium, bone marrow butter, greens.',
        priceLabel: 'Price pending',
        note: 'Wine pairing pending',
      },
      {
        name: 'Woodland mushroom',
        description: 'Buckwheat, aged cheese, black garlic.',
        priceLabel: 'Price pending',
        note: 'Wine pairing pending',
      },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    intro: 'Closing courses for the tasting of the layout. Client pastry list required.',
    items: [
      {
        name: 'Citrus and cream',
        description: 'Yuzu curd, cultured cream, honeycomb.',
        priceLabel: 'Price pending',
      },
      {
        name: 'Dark chocolate',
        description: '70% ganache, smoked salt, olive oil.',
        priceLabel: 'Price pending',
      },
    ],
  },
  {
    id: 'wine',
    label: 'Cellar',
    intro: 'A sample cellar grouping. Replace with the actual list, vintages, and markups.',
    items: [
      {
        name: 'Sparkling, coastal',
        description: 'Grower bottle, fine bead, citrus peel.',
        priceLabel: 'Glass / bottle pending',
      },
      {
        name: 'White, mineral',
        description: 'Cool-climate, stone fruit, saline finish.',
        priceLabel: 'Glass / bottle pending',
      },
      {
        name: 'Red, structured',
        description: 'Old vine, dark fruit, fine tannin.',
        priceLabel: 'Glass / bottle pending',
      },
    ],
  },
];

export const experiences = [
  {
    title: 'The kitchen',
    copy: 'A tasting built around the day’s produce. The real kitchen story and chef credit still need to be supplied.',
  },
  {
    title: 'The room',
    copy: 'Low light, unhurried service, a table meant to hold the evening. Interior photos were not provided.',
  },
  {
    title: 'The cellar',
    copy: 'A short, considered list by the glass. Sommelier notes and producers are pending.',
  },
] as const;

export const contactPlaceholders = {
  addressLines: ['Street address pending', 'City, region, and postal code pending'],
  phone: 'Phone number pending',
  email: 'Reservations email pending',
  hours: [
    { day: 'Tuesday – Thursday', time: 'Hours pending' },
    { day: 'Friday – Saturday', time: 'Hours pending' },
    { day: 'Sunday – Monday', time: 'Hours pending' },
  ],
} as const;

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/contact', label: 'Contact' },
] as const;
