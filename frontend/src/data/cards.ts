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
  },
  {
    id: 'cal-ripken-jr-2000-topps-chrome-4',
    title: 'Cal Ripken Jr. 2000 Topps Chrome #4',
    player: 'Cal Ripken Jr.',
    images: [
      '/cards/cal-ripken-jr-2000-topps-chrome-4-front.jpg', // Placeholder for front image
      '/cards/cal-ripken-jr-2000-topps-chrome-4-back.jpg'   // Placeholder for back image
    ],
    year: 2000,
    brand: 'Topps Chrome',
    set: 'Topps Chrome Baseball',
    condition: 'Near Mint', // Placeholder, assess actual condition
    description: "Cal Ripken Jr.\'s 2000 Topps Chrome card (#4) featuring the Iron Man with the Baltimore Orioles. The card highlights his durability and legendary status as a third baseman. The back provides his complete major league batting record up to the 1999 season.",
    cardNumber: "4",
    price: undefined, // Inquire for price
    averageValue: 3.00, // Updated based on research for raw/NM condition
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Cal Ripken Jr.', 'Orioles', 'Topps Chrome', '3B', 'Third Base', 'HOF', 'Iron Man', 'refractor', '2000s']
  },
  {
    id: 'jason-heyward-2010-bowman-platinum-91',
    title: 'Jason Heyward 2010 Bowman Platinum #91 (RC)',
    player: 'Jason Heyward',
    images: [
      '/cards/jason-heyward-2010-bowman-platinum-91-front.jpg', // Placeholder for front image
      '/cards/jason-heyward-2010-bowman-platinum-91-back.jpg'   // Placeholder for back image
    ],
    year: 2010,
    brand: 'Bowman Platinum',
    set: 'Bowman Platinum',
    condition: 'Near Mint', // Placeholder, assess actual condition
    description: "Jason Heyward's rookie card (#91) from the 2010 Bowman Platinum set, featuring him with the Atlanta Braves. The back highlights his MLB debut on 4/5/10 where he hit a three-run homer. Card notes 'PLATINUM ASCENSION'.",
    cardNumber: "91",
    price: undefined, // Inquire for price
    averageValue: 2.50, // Based on ungraded listings
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Jason Heyward', 'Braves', 'Bowman Platinum', 'rookie', 'RC', 'OF', 'outfielder', 'Platinum Ascension', '2010s']
  },
  {
    id: 'mark-mcgwire-1989-fleer-world-series-8',
    title: 'Mark McGwire 1989 Fleer 1988 World Series #8 - Game-Winning HR',
    player: 'Mark McGwire',
    images: [
      '/cards/mark-mcgwire-1989-fleer-ws-8-front.jpg', // Placeholder for front image
      '/cards/mark-mcgwire-1989-fleer-ws-8-back.jpg'   // Placeholder for back image
    ],
    year: 1989, // Copyright year of the card
    brand: 'Fleer',
    set: '1988 World Series Highlights', // Or similar subset name
    condition: 'Excellent', // Placeholder, assess actual condition
    description: "Commemorates Mark McGwire's game-winning home run for the Oakland A's in the 9th inning of Game 3 of the 1988 World Series against the Los Angeles Dodgers. Hit off relief pitcher Jay Howell, this was the second game-ending homer of that series. Card is #8 of 12 in the 'Game-Winning Home Run' subset.",
    cardNumber: "8", // Part of a 12-card subset
    price: undefined, // Inquire for price
    averageValue: 1.50, // Based on ungraded listings
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Mark McGwire', 'Athletics', 'Fleer', 'World Series', '1988 World Series', 'Game Winning Home Run', 'highlight', '80s', 'Dodgers', 'Jay Howell']
  },
  {
    id: 'nick-johnson-2003-topps-chrome-bat-refractor-bbcr-nj',
    title: 'Nick Johnson 2003 Topps Chrome Game-Used Bat Refractor #BBCR-NJ',
    player: 'Nick Johnson',
    images: [
      '/cards/nick-johnson-2003-topps-chrome-bat-refractor-bbcr-nj-front.jpg', // Placeholder for front image
      '/cards/nick-johnson-2003-topps-chrome-bat-refractor-bbcr-nj-back.jpg'   // Placeholder for back image
    ],
    year: 2003,
    brand: 'Topps Chrome',
    set: 'Topps Chrome Baseball',
    condition: 'Excellent', // Placeholder, based on visual and eBay listing
    description: "Nick Johnson's 2003 Topps Chrome Refractor card (#BBCR-NJ) featuring an authentic game-used bat piece. The card commemorates his debut achievement of being the only Yankee in 18 years to get two hits in his first MLB game (8/21/01).",
    cardNumber: "BBCR-NJ",
    price: undefined, // Inquire for price
    averageValue: 15.00, // Conservative estimate for ungraded refractor with memorabilia
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Nick Johnson', 'Yankees', 'Topps Chrome', 'Game-Used Bat', 'Memorabilia', 'Refractor', '1B', 'First Base', '2000s']
  },
  {
    id: 'mike-schmidt-1979-topps-610',
    title: 'Mike Schmidt 1979 Topps #610',
    player: 'Mike Schmidt',
    images: [
      '/cards/mike-schmidt-1979-topps-610-front.jpg', // Placeholder for front image
      '/cards/mike-schmidt-1979-topps-610-back.jpg'   // Placeholder for back image
    ],
    year: 1979,
    brand: 'Topps',
    set: 'Topps Baseball',
    condition: 'Excellent', // Placeholder, assess actual condition
    description: "Mike Schmidt's 1979 Topps card (#610) featuring him with the Philadelphia Phillies. The back highlights several career achievements, including setting a record with 17 total bases in a 1976 game and tying a National League record with two grand slams in June 1973.",
    cardNumber: "610",
    price: undefined, // Inquire for price
    averageValue: 33.00, // Estimate for ungraded card in good condition
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Mike Schmidt', 'Phillies', 'Topps', '3B', 'Third Base', 'HOF', '70s', 'vintage']
  },
  {
    id: 'mike-schmidt-1977-topps-140',
    title: 'Mike Schmidt 1977 Topps #140',
    player: 'Mike Schmidt',
    images: [
      '/cards/mike-schmidt-1977-topps-140-front.jpg', // Placeholder for front image
      '/cards/mike-schmidt-1977-topps-140-back.jpg'   // Placeholder for back image
    ],
    year: 1977,
    brand: 'Topps',
    set: 'Topps Baseball',
    condition: 'Excellent', // Placeholder, assess actual condition
    description: "Mike Schmidt's 1977 Topps card (#140) with the Philadelphia Phillies. The back highlights his 1976 homer rampage: 'Mike went on a Homer rampage in April of 1976. He hit 4 Homers in one game at Wrigley Field, had stretch of 8 straight games with 9 Homers and walloped 11 round trippers in April to tie record.' Also features a Hank Aaron cartoon regarding his 17-game World Series hitting streak.",
    cardNumber: "140",
    price: undefined, // Inquire for price
    averageValue: 30.00, // Estimate for a nice ungraded card
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Mike Schmidt', 'Phillies', 'Topps', '3B', 'Third Base', 'HOF', '70s', 'vintage', 'power hitter']
  },
  {
    id: 'pete-rose-1966-topps-30',
    title: 'Pete Rose 1966 Topps #30',
    player: 'Pete Rose',
    images: [
      '/cards/pete-rose-1966-topps-30-front.jpg', // Placeholder for front image
      '/cards/pete-rose-1966-topps-30-back.jpg'   // Placeholder for back image
    ],
    year: 1966,
    brand: 'Topps',
    set: 'Topps Baseball',
    condition: 'Excellent', // Placeholder, assess actual condition
    description: "Pete Rose\'s 1966 Topps card (#30) featuring him with the Cincinnati Reds as a 2nd baseman. The back notes: 'Hustling Pete is the spark plug of the Cincinnati infield. The 1965 campaign was Pete\'s most successful in the majors. He is truly one of the coming stars in the National League. Many experts pinpoint Pete\'s contribution to the high finish of the Reds in 1965 standings.' Card also mentions he was \'Rookie of the Year\' in 1963.",
    cardNumber: "30",
    price: undefined, // Inquire for price
    averageValue: 45.00, // Estimate for a nice ungraded card in Excellent condition
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Pete Rose', 'Reds', 'Topps', '2B', 'Second Base', 'Charlie Hustle', 'Hit King', '60s', 'vintage']
  },
  {
    id: 'steve-carlton-1969-topps-255',
    title: 'Steve Carlton 1969 Topps #255',
    player: 'Steve Carlton',
    images: [
      '/cards/steve-carlton-1969-topps-255-front.jpg', // Placeholder for front image
      '/cards/steve-carlton-1969-topps-255-back.jpg'   // Placeholder for back image
    ],
    year: 1969,
    brand: 'Topps',
    set: 'Topps Baseball',
    condition: 'Excellent', // Placeholder, assess actual condition
    description: "Steve Carlton's 1969 Topps card (#255) featuring him as a pitcher for the St. Louis Cardinals. The back notes: 'A rangy southpaw, Steve backed up his rookie year with another fine season in 1968. The lefty escaped the sophomore jinx as he posted five shutouts and struck out 162 batters. One of his shutouts was a neat one-hitter, which he fired at the Chicago Cubs in June. Steve was the top lefty winner for St. Louis in 1967 and 1968.'",
    cardNumber: "255",
    price: undefined, // Inquire for price
    averageValue: 20.00, // Estimate for a nice ungraded card in Excellent condition
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Steve Carlton', 'Cardinals', 'Topps', 'pitcher', 'P', 'HOF', 'Lefty', '60s', 'vintage']
  },
  {
    id: 'chipper-jones-1992-donruss-rated-rookie-721',
    title: 'Chipper Jones 1992 Donruss Rated Rookie #721',
    player: 'Chipper Jones',
    images: [
      '/cards/chipper-jones-1992-donruss-rated-rookie-721-front.jpg', // Placeholder for front image
      '/cards/chipper-jones-1992-donruss-rated-rookie-721-back.jpg'   // Placeholder for back image
    ],
    year: 1992,
    brand: 'Donruss',
    set: 'Donruss Rated Rookie (Series 2)',
    condition: 'Near Mint', // Placeholder, assess actual condition
    description: "Chipper Jones\' 1992 Donruss Rated Rookie card (#721, Series 2) as a shortstop for the Atlanta Braves. The back details his minor league stats from 1990-1992, birthdate (4/24/72), physical stats (6\'3\", 185 lbs), and notes he was the No. 1 June \'90 amateur draft pick with a contract through \'93. Card indicates \'NO MAJOR LEAGUE RECORD\'.",
    cardNumber: "721",
    price: undefined, // Inquire for price
    averageValue: 6.00, // Based on ungraded listings
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Chipper Jones', 'Braves', 'Donruss', 'Rated Rookie', 'rookie', 'SS', 'shortstop', 'HOF', '90s']
  },
  {
    id: 'steve-carlton-1974-topps-95',
    title: 'Steve Carlton 1974 Topps #95',
    player: 'Steve Carlton',
    images: [
      '/cards/steve-carlton-1974-topps-95-front.jpg', // Placeholder for front image
      '/cards/steve-carlton-1974-topps-95-back.jpg'   // Placeholder for back image
    ],
    year: 1974,
    brand: 'Topps',
    set: 'Topps Baseball',
    condition: 'Excellent', // Placeholder, assess actual condition
    description: "Steve Carlton\'s 1974 Topps card (#95) with the Philadelphia Phillies. The back highlights his 1972 Cy Young season and a record 19 strikeouts in a 9-inning game in 1969. Also features a cartoon noting he once worked as a lifeguard.",
    cardNumber: "95",
    price: undefined, // Inquire for price
    averageValue: 7.00, // Estimate for a nice ungraded card
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Steve Carlton', 'Phillies', 'Topps', 'pitcher', 'P', 'HOF', 'Lefty', '70s', 'vintage', 'Cy Young']
  },
  {
    id: 'steve-carlton-1975-topps-185',
    title: 'Steve Carlton 1975 Topps #185',
    player: 'Steve Carlton',
    images: [
      '/cards/steve-carlton-1975-topps-185-front.jpg', // Placeholder for front image
      '/cards/steve-carlton-1975-topps-185-back.jpg'   // Placeholder for back image
    ],
    year: 1975,
    brand: 'Topps',
    set: 'Topps Baseball',
    condition: 'Excellent', // Placeholder, assess actual condition
    description: "Steve Carlton\'s 1975 Topps card (#185) with the Philadelphia Phillies. The back details his Major League pitching record through 1974 and notes his achievement of being the 2nd N.L. hurler in history to top 300 K\'s in a season (1972). Also includes a baseball quiz: \'What is the record for most Homers in one month?\' (Answer: 18 by Rudy York).",
    cardNumber: "185",
    price: undefined, // Inquire for price
    averageValue: 15.00, // Estimate for a nice ungraded card
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Steve Carlton', 'Phillies', 'Topps', 'pitcher', 'P', 'HOF', 'Lefty', '70s', 'vintage', 'strikeouts']
  },
  {
    id: 'ken-griffey-jr-1990-topps-336',
    title: 'Ken Griffey Jr. 1990 Topps #336 (All-Star Rookie)',
    player: 'Ken Griffey Jr.',
    images: [
      '/cards/ken-griffey-jr-1990-topps-336-front.jpg', // Placeholder for front image
      '/cards/ken-griffey-jr-1990-topps-336-back.jpg'   // Placeholder for back image
    ],
    year: 1990,
    brand: 'Topps',
    set: 'Topps Baseball',
    condition: 'Excellent', // Placeholder, assess actual condition
    description: "Ken Griffey Jr.\'s 1990 Topps card (#336) featuring the \'Topps All-Star Rookie\' trophy. The back details his stats, biographical information (Born 11-21-69, Donora, PA), and notes: \'Ken graduated from Moeller (Cincinnati) High School in 1987. He played 3 years of football and 4 years of baseball. Was Baseball Player of the Year twice.\' Includes 1989 Monthly Scoreboard.",
    cardNumber: "336",
    price: undefined, // Inquire for price
    averageValue: 3.00, // Estimate for a nice ungraded card
    available: true,
    dateAdded: new Date().toISOString().split('T')[0],
    tags: ['Ken Griffey Jr.', 'Mariners', 'Topps', 'All-Star Rookie', 'OF', 'outfielder', 'HOF', '90s', 'The Kid']
  }
];

// Helper function to generate a unique slug
// export function generateSlug(parts: (string | number)[]): string {
//   return parts
//     .map(part => String(part).toLowerCase().replace(/[^a-z0-9\-]+/g, '-'))
//     .join('-')
//     .replace(/--+/g, '-') // Replace multiple hyphens with single
//     .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
// }

// Example of updating an ID (if needed during development)
// cards.forEach(card => {
//   if (!card.id) { // Or some other condition to identify cards needing an ID update
//     card.id = generateSlug([card.player, card.year, card.brand, card.set || 'base', card.cardNumber || 'NOCARDNO']);
//   }
// });
