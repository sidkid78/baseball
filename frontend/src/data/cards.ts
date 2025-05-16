export interface BaseballCard {
  id: string;                                   // Unique identifier (slug or UUID)
  title: string;                                // Title (e.g., "Ken Griffey Jr. Rookie Card")
  player: string;                               // Main featured player
  images: string[];                             // Array of image paths/URLs (multiple angles)
  year: number;                                 // Card's year of issue
  brand: string;                                // Manufacturer (e.g., Topps, Upper Deck)
  set?: string;                                 // Set/Series (optional, e.g., "Topps Chrome")
  condition: 'Mint' | 'Near Mint' | 'Excellent' | 'Good' | 'Fair' | 'Poor' | string;
  description: string;                          // Detailed description/story
  cardNumber?: string;                          // Card number in set (optional)
  price?: number;                               // Price in USD (optional, undefined = "inquire")
  averageValue?: number;                        // Average market value in USD (optional)
  available: boolean;                           // If card is available (unsold)
  dateAdded: string;                            // ISO date (YYYY-MM-DD)
  tags?: string[];                              // Keywords for search/filtering (team, position, rookie)
}

// Sample card data
export const cards: BaseballCard[] = [
  {
    id: 'griffey-rc-1989-upperdeck',
    title: 'Ken Griffey Jr. Rookie Card',
    player: 'Ken Griffey Jr.',
    images: [
      '/cards/griffey-rc-1989-upperdeck-1.jpg',
      '/cards/griffey-rc-1989-upperdeck-2.jpg'
    ],
    year: 1989,
    brand: 'Upper Deck',
    set: 'Upper Deck (Rookie)',
    condition: 'Near Mint',
    description: "Iconic Ken Griffey Jr. rookie card. Vibrant colors, sharp corners - a centerpiece of any collection.",
    cardNumber: "1",
    price: 650,
    averageValue: 600,
    available: true,
    dateAdded: '2024-05-01',
    tags: ['rookie', 'Mariners', 'outfielder']
  },
  {
    id: 'pete-rose-1964-topps-125',
    title: 'Pete Rose 1964 Topps #125',
    player: 'Pete Rose',
    images: [
      '/cards/pete-rose-1964-topps-125-front.jpg',
      '/cards/pete-rose-1964-topps-125-back.jpg'
    ],
    year: 1964,
    brand: 'Topps',
    set: 'Topps Baseball',
    condition: 'Excellent',
    description: "Pete Rose\'s 1964 Topps card (#125), his first solo Topps card, featuring the '1963 All-Star Rookie' trophy. A key card for any vintage collector.",
    cardNumber: "125",
    price: undefined, // Inquire for price
    averageValue: 350,
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Reds', '2nd base', 'All-Star Rookie', 'vintage', 'Charlie Hustle']
  },
  // {
  //   id: 'mantle-1952-topps',
  //   title: 'Mickey Mantle 1952 Topps',
  //   player: 'Mickey Mantle',
  //   images: ['/cards/mantle-1952-topps-1.jpg'],
  //   year: 1952,
  //   brand: 'Topps',
  //   set: 'Topps',
  //   condition: 'Good',
  //   description: "The legendary 1952 Topps Mantle, the holy grail for collectors. This one shows some edge wear but remains highly attractive. Part of a permanent collection, display only.",
  //   cardNumber: "311",
  //   price: undefined,
  //   averageValue: 150000,
  //   available: true,
  //   dateAdded: '2024-05-03',
  //   tags: ['Yankees', 'vintage', 'HOF', 'display only']
  // },
  {
    id: 'trout-2011-topps-update',
    title: 'Mike Trout RC 2011 Topps Update',
    player: 'Mike Trout',
    images: ['/cards/trout-2011-topps-update-1.jpg'],
    year: 2011,
    brand: 'Topps',
    set: 'Update',
    condition: 'Mint',
    description: "Stunning Mike Trout rookie, arguably the best player of his generation. Pack-fresh condition.",
    cardNumber: "US175",
    price: 425,
    averageValue: 400,
    available: false,
    dateAdded: '2024-05-08',
    tags: ['rookie', 'Angels', 'MVP']
  },
  {
    id: 'nolan-ryan-1972-topps-595',
    title: 'Nolan Ryan 1972 Topps #595',
    player: 'Nolan Ryan',
    images: [
      '/cards/nolan-ryan-1972-topps-595-front.jpg',
      '/cards/nolan-ryan-1972-topps-595-back.jpg'
    ],
    year: 1972,
    brand: 'Topps',
    set: 'Topps Baseball',
    condition: 'Excellent',
    description: "Nolan Ryan\'s 1972 Topps card (#595), featuring him as a pitcher for the California Angels. The back includes his major and minor league pitching record up to 1971.",
    cardNumber: "595",
    price: undefined,
    averageValue: 120,
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Nolan Ryan', 'Angels', 'HOF', 'strikeout king', 'vintage', '1972']
  },
  {
    id: 'michael-jordan-1993-topps-finest-refractor',
    title: 'Michael Jordan 1993 Topps Finest Refractor #1',
    player: 'Michael Jordan',
    images: ['/cards/jordan-1993-finest-refractor.jpg'],
    year: 1993,
    brand: 'Topps Finest',
    set: 'Finest Refractors',
    condition: 'Mint',
    description: 'Highly sought-after refractor of Michael Jordan during his baseball career.',
    cardNumber: '1',
    price: 2500,
    averageValue: 2200,
    available: true,
    dateAdded: '2025-05-13',
    tags: ['basketball', 'baseball', 'MLB', 'minor league', 'refractor', 'iconic']
  },
  {
    id: 'nolan-ryan-1973-topps-220',
    title: 'Nolan Ryan 1973 Topps #220',
    player: 'Nolan Ryan',
    images: [
      '/cards/nolan-ryan-1973-topps-220-front.jpg',
      '/cards/nolan-ryan-1973-topps-220-back.jpg'
    ],
    year: 1973,
    brand: 'Topps',
    set: 'Topps Baseball',
    condition: 'Excellent',
    description: "Key 1973 Topps card of Hall of Famer Nolan Ryan, showcasing his time with the California Angels. The back details his impressive 1972 season statistics.",
    cardNumber: "220",
    price: undefined,
    averageValue: 90,
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['HOF', 'Angels', 'pitcher', 'strikeout leader']
  },
  {
    id: 'ken-griffey-jr-1995-ud-amazing-greats-ag1',
    title: 'Ken Griffey Jr. 1995 Upper Deck Amazing Greats',
    player: 'Ken Griffey Jr.',
    images: [
      '/cards/ken-griffy-jr-upper-deck-front.jpg',
      '/cards/ken-griffy-jr-upper-deck-back.jpg'
    ],
    year: 1995,
    brand: 'Upper Deck',
    set: "Collector's Choice Special Edition - Amazing Greats",
    condition: 'Near Mint',
    description: "Ken Griffey Jr. \'Amazing Greats\' (AG1) insert from 1995 Upper Deck Collector\'s Choice Special Edition. Marked as \'One of 2,000\'.",
    cardNumber: "AG1",
    price: undefined,
    averageValue: 75,
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Mariners', 'outfielder', 'insert', 'limited edition', '90s']
  },
  {
    id: 'nolan-ryan-1971-topps-513',
    title: 'Nolan Ryan 1971 Topps #513',
    player: 'Nolan Ryan',
    images: [
      '/cards/nolan-ryan-topps-1971-513-front.jpg',
      '/cards/nolan-ryan-topps-1971-back.jpg'
    ],
    year: 1971,
    brand: 'Topps',
    set: 'Topps Baseball',
    condition: 'Excellent',
    description: "Nolan Ryan\'s 1971 Topps card (#513) from his time with the New York Mets. Features a classic Topps design and early career stats.",
    cardNumber: "513",
    price: undefined,
    averageValue: 150,
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Mets', 'pitcher', 'HOF', 'vintage', '70s']
  },
  {
    id: 'albert-pujols-2001-bowman-264',
    title: 'Albert Pujols 2001 Bowman Rookie #264',
    player: 'Albert Pujols',
    images: [
      '/cards/albert-pujols-2001-bowman-rookie-264-front.jpg',
      '/cards/albert-pujols-2001-bowman-rookie-264-back.jpg'
    ],
    year: 2001,
    brand: 'Bowman',
    set: 'Bowman',
    condition: 'Near Mint',
    description: "Albert Pujols\' 2001 Bowman rookie card (#264). Highlights his MVP performance in the 2000 Midwest League and Pacific Coast League playoffs. Notes his complete hitting package, plate discipline, and defensive skills.",
    cardNumber: "264",
    price: undefined,
    averageValue: 150,
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['rookie', 'Cardinals', '3B', 'MVP', 'HOF']
  },
  {
    id: 'mark-mcgwire-1987-donruss-rated-rookie-46',
    title: 'Mark McGwire 1987 Donruss Rated Rookie #46',
    player: 'Mark McGwire',
    images: [
      '/cards/mark-mcgwire-1987-donruss-rated-rookie-46-front.jpg',
      // Add back image if available, e.g., '/cards/mark-mcgwire-1987-donruss-rated-rookie-46-back.jpg'
    ],
    year: 1987,
    brand: 'Donruss',
    set: 'Rated Rookie',
    condition: 'Near Mint', // Placeholder
    description: "Mark McGwire's iconic 1987 Donruss Rated Rookie card (#46), a staple for collectors of 1980s baseball cards. Features McGwire as a promising rookie with the Oakland Athletics.",
    cardNumber: "46",
    price: undefined, // Inquire for price
    averageValue: 25, // Placeholder, research current value
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Athletics', 'rookie', 'Rated Rookie', 'Donruss', 'slugger', '80s']
  },
  {
    id: 'mark-mcgwire-1987-donruss-the-rookies-1',
    title: 'Mark McGwire 1987 Donruss The Rookies #1',
    player: 'Mark McGwire',
    images: [
      '/cards/mark-mcgwire-1987-donruss-the-rookies-1-front.jpg',
      // Add back image if available
    ],
    year: 1987,
    brand: 'Donruss',
    set: 'The Rookies',
    condition: 'Near Mint', // Placeholder
    description: "Mark McGwire's card (#1) from the 1987 Donruss 'The Rookies' boxed set, showcasing him early in his impactful career with the Oakland Athletics.",
    cardNumber: "1",
    price: undefined, // Inquire for price
    averageValue: 15, // Placeholder
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Athletics', 'rookie', 'The Rookies', 'Donruss', 'boxed set', '80s']
  },
  {
    id: 'mark-mcgwire-1996-upper-deck-power-package-pp10',
    title: 'Mark McGwire 1996 Upper Deck Power Package #PP10',
    player: 'Mark McGwire',
    images: [
      '/cards/mark-mcgwire-1996-upper-deck-power-package-pp10-front.jpg',
      '/cards/mark-mcgwire-1996-upper-deck-power-package-pp10-back.jpg'
    ],
    year: 1996,
    brand: 'Upper Deck',
    set: 'Power Package',
    condition: 'Excellent', // Placeholder
    description: "Mark McGwire 'Power Package' die-cut insert card (#PP10) from 1996 Upper Deck. The back highlights his impressive home run and RBI statistics, noting him as a perennial All-Star.",
    cardNumber: "PP10",
    price: undefined, // Inquire for price
    averageValue: 8, // Placeholder
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Athletics', 'insert', 'die-cut', 'Upper Deck', '90s', 'slugger']
  },
  {
    id: 'mark-mcgwire-1997-pacific-crown-collection-gc15',
    title: 'Mark McGwire 1997 Pacific Crown Collection Gold Crown Die-Cuts #GC15',
    player: 'Mark McGwire',
    images: [
      '/cards/mark-mcgwire-1997-pacific-crown-collection-gc15-front.jpg', // You'll need to add this image
      '/cards/mark-mcgwire-1997-pacific-crown-collection-gc15-back.jpg'   // And this image
    ],
    year: 1997,
    brand: 'Pacific',
    set: 'Crown Collection Gold Crown Die-Cuts',
    condition: 'Near Mint', // Placeholder, assess actual condition
    description: "Mark McGwire Gold Crown Die-Cuts insert (#GC15) from the 1997 Pacific Crown Collection. The back notes: 'Last season, Mark McGwire powered 52 homers, recording his seventh consecutive season of at least 30 long balls. He also led the majors with a .730 slugging percentage in 1996.'",
    cardNumber: "GC15",
    price: undefined, // Inquire for price
    averageValue: 10, // Placeholder, research current value
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Athletics', 'insert', 'die-cut', 'Pacific', 'Crown Collection', '90s', 'slugger']
  },
  {
    id: 'troy-glaus-1998-upper-deck-al-debut',
    title: 'Troy Glaus 1998 Upper Deck AL Debut',
    player: 'Troy Glaus',
    images: [
      '/cards/troy-glaus-1998-upper-deck-al-debut-front.jpg',
      '/cards/troy-glaus-1998-upper-deck-al-debut-back.jpg'
    ],
    year: 1998,
    brand: 'Upper Deck',
    set: 'AL Debut',
    condition: 'Near Mint',
    description: "Third baseman Troy Glaus, the Anaheim Angels\' No. 1 draft pick in 1997, made his Major League debut for the Angels on July 31, 1998. He started at third and hit an RBI double off Bret Saberhagen in his first at-bat. Glaus was called up after a stellar minor-league season, leading all of minor-league ball with 35 homers at the time of his promotion.",
    cardNumber: undefined, // Or specific number if known
    price: undefined,
    averageValue: 5,
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Angels', 'third base', 'rookie', 'debut', '90s', 'Upper Deck']
  },
  {
    id: 'rickey-henderson-1991-leaf-gold-leaf-moments-bc26',
    title: "Rickey Henderson - Baseball's All-Time Base King",
    player: 'Rickey Henderson',
    images: [
      '/cards/rickey-henderson-1991-leaf-bc26-front.jpg', // You'll need to add this image
      '/cards/rickey-henderson-1991-leaf-bc26-back.jpg'   // And this image
    ],
    year: 1991,
    brand: 'Leaf',
    set: 'Gold Leaf Moments',
    condition: 'Near Mint', // Placeholder, assess actual condition
    description: "It had been an event that was inevitable, but the ravages of running, sliding and stealing had taken their toll on Rickey Henderson's body and his date with destiny had to be postponed a few times because of nagging injuries. Finally, though, on 5/1/91, Henderson made a headlong dash from second to third base in the fourth inning against his former team, the New York Yankees. The count was 1-0 and Henderson beat catcher Matt Nokes' throw. When he did, the Oakland Alameda Coliseum crowd went wild—none more enthusiastically than Henderson's mother, Bobbie, who had come to see her son eclipse Hall of Famer Lou Brock's all-time stolen base record of 938. Henderson quickly rose to his feet and held base No. 939 aloft as Brock joined him on the field. \"Lou Brock was a symbol of great basestealing,\" Henderson said, \"but today I am the greatest of all time.\"",
    cardNumber: "BC26",
    price: undefined, // Inquire for price
    averageValue: 5, // Placeholder, research current value
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Athletics', 'HOF', 'stolen base king', 'Leaf', 'Gold Leaf Moments', '90s', 'LF']
  },
  {
    id: 'mark-mcgwire-1987-fleer-update-u76',
    title: 'Mark McGwire 1987 Fleer Update #U-76',
    player: 'Mark McGwire',
    images: [
      '/cards/mark-mcgwire-1987-fleer-u76-front.jpg', // You'll need to add this image
      '/cards/mark-mcgwire-1987-fleer-u76-back.jpg'   // And this image
    ],
    year: 1987,
    brand: 'Fleer',
    set: 'Fleer Update',
    condition: 'Excellent', // Placeholder, assess actual condition
    description: "Mark McGwire's 1987 Fleer Update card (#U-76). The card shows his early career stats with Modesto, Huntsville, Tacoma, and his debut with the Oakland A's in 1986. The back also includes a hitter classification and spray chart.",
    cardNumber: "U-76",
    price: undefined, // Inquire for price
    averageValue: 15, // Placeholder, research current value
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Athletics', 'rookie', 'Fleer Update', 'Fleer', 'slugger', '80s', 'First Base']
  },
  {
    id: 'mark-mcgwire-1997-upper-deck-collectors-choice-all-star',
    title: 'Mark McGwire 1997 Upper Deck Collector\'s Choice All-Star & Record Breaker Plaque',
    player: 'Mark McGwire',
    images: [
      '/cards/mark-mcgwire-1997-ud-collectors-choice-all-star-plaque.jpg' // Placeholder image path
    ],
    year: 1997, // Year of the card
    brand: 'Upper Deck',
    set: "Collector\'s Choice All-Star",
    condition: 'Near Mint', // Placeholder, assess actual condition
    description: "Mark McGwire 1997 Upper Deck Collector\'s Choice All-Star card (First Base). The item includes a commemorative plaque for his record-breaking 62nd Home Run hit on September 8, 1998, at Busch Stadium, St. Louis, off pitcher Steve Trachsel.",
    cardNumber: undefined, // Card number not visible on the front of this specific card
    price: undefined, // Inquire for price
    averageValue: undefined, // Placeholder, research current value
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Mark McGwire', 'All-Star', 'Upper Deck', "Collector\'s Choice", 'First Base', 'Athletics', 'Cardinals', 'record breaker', 'home run', 'plaque', '90s']
  },
  {
    id: 'mark-mcgwire-1989-bowman-197',
    title: 'Mark McGwire 1989 Bowman #197',
    player: 'Mark McGwire',
    images: [
      '/cards/mark-mcgwire-1989-bowman-197-front.jpg', // Placeholder for front image
      '/cards/mark-mcgwire-1989-bowman-197-back.jpg'   // Placeholder for back image
    ],
    year: 1989,
    brand: 'Bowman',
    set: 'Bowman Baseball',
    condition: 'Near Mint', // Placeholder, assess actual condition
    description: "Mark McGwire\'s 1989 Bowman card (#197) featuring him with the Oakland Athletics. The back details his stats up to 1988 and personal information. Card includes a printed autograph on the front.",
    cardNumber: "197",
    price: undefined, // Inquire for price
    averageValue: undefined, // Placeholder, research current value
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Mark McGwire', 'Athletics', 'Bowman', '1B', '80s', 'slugger', 'printed autograph']
  },
  {
    id: 'derek-jeter-1997-topps-160',
    title: 'Derek Jeter 1997 Topps #160',
    player: 'Derek Jeter',
    images: [
      '/cards/derek-jeter-1997-topps-160-front.jpg', // Placeholder for front image
      '/cards/derek-jeter-1997-topps-160-back.jpg'   // Placeholder for back image
    ],
    year: 1997,
    brand: 'Topps',
    set: 'Topps Baseball',
    condition: 'Near Mint', // Placeholder, assess actual condition
    description: "Derek Jeter\'s 1997 Topps card (#160) as shortstop for the New York Yankees. The back includes his complete major and minor league batting record and a blurb about his 1995 ML debut and future prospects.",
    cardNumber: "160",
    price: undefined, // Inquire for price
    averageValue: undefined, // Placeholder, research current value
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Derek Jeter', 'Yankees', 'Topps', 'shortstop', 'SS', '90s', 'HOF']
  }
];
