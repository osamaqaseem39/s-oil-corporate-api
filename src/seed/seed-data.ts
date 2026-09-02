/**
 * One-time migration seed, transcribed from the original static
 * `web/data/products.ts` / `web/data/blog.ts`. Only used by SeedService
 * when the corresponding collection is empty.
 */

const productLatest = (n: number) => `/product latest/${n}.jpg`;

const img = {
  superGtMotorcycleOil_20w40_0_7L: productLatest(1),
  superGtMotorcycleOil_20w50_0_7L: productLatest(2),
  superGtMotorOil4T_20w50_1L: productLatest(3),
  superGtS1_20w50_3L: productLatest(4),
  superGtS2_10w40_3L: productLatest(6),
  superGtS2_10w40_4L: productLatest(7),
  superGtS3_5w30_3L: productLatest(8),
  dezoD1_sae50_4L: productLatest(10),
  dezoD1_sae50_8L: productLatest(11),
  dezoD2_20w50_10L: productLatest(12),
  dezoD2_20w50_8L: productLatest(13),
  dezoD2_20w50_4L: productLatest(14),
  dezoD2_20w50_1L: productLatest(15),
  superGtMotorOil_20w50_1L: productLatest(18),
  superGtMotorOil_20w50_3L: productLatest(17),
  petroleumTreatment_444ml: productLatest(19),
  ultraGearOil_140: productLatest(20),
};

interface SeedProduct {
  slug: string;
  name: string;
  category: string;
  viscosity: string;
  packSize: string;
  image: string;
  shortDescription: string;
  benefits: string[];
  specs: { label: string; value: string }[];
  usage: string;
  datasheetUrl: string;
  msdsUrl: string;
  shopUrl: string;
  status: 'published';
}

const commonLinks = { datasheetUrl: '#', msdsUrl: '#' };

const dezoD2_20w50TypicalSpecs = [
  { label: 'API Rating', value: 'CF-4 / CF / SG' },
  { label: 'ACEA', value: 'E2' },
  {
    label: 'Builder Specifications',
    value: 'MAN 270/271, Volvo VDS, Deutz DQC-I-02, MB 228.0/1',
  },
  { label: 'Viscosity Grade', value: '20W-50' },
  { label: 'Density @ 15°C', value: '0.890 g/cm³ (ASTM D4052)' },
  { label: 'Viscosity @ 100°C', value: '19.60 cSt (ASTM D445)' },
  { label: 'Viscosity @ 40°C', value: '175 cSt (ASTM D445)' },
  { label: 'Viscosity Index', value: '130 (ASTM D2270)' },
  { label: 'Pour Point', value: '-30°C (ASTM D97)' },
  { label: 'Flash Point (COC)', value: '250°C (ASTM D92)' },
  { label: 'Total Base Number', value: '11.9 mg KOH/g (ASTM D2896)' },
  { label: 'CCS Viscosity', value: '8586 cP @ -15°C (ASTM D5293)' },
];

const dezoD2_20w50Shared = {
  name: 'S-OIL DEZO D2',
  category: 'diesel',
  viscosity: '20W-50',
  shortDescription:
    'High performance multigrade diesel engine oil (API CF-4/SG). Formulated with high-quality base stocks and selected additives for optimum performance and protection in diesel engines requiring API CF-4, including turbocharged and naturally aspirated engines under severe service in all seasons.',
  benefits: [
    'Good oxidation and thermal stability reduces sludge build-up and keeps the engine cleaner',
    'Optimum wear protection to extend engine efficiency and service life',
    'Improved fuel economy due to high fluidity at low temperatures',
    'Reduced oil consumption at high operating engine temperatures',
    'Improved resistance to deposit formation for maximum power under extreme operating conditions',
    'Optimum TBN reserves for improved acid neutralization and corrosion protection, especially in older heavy-duty diesel engines',
  ],
  usage:
    'For turbocharged and naturally aspirated diesel engines requiring API CF-4/SG 20W-50, operating under severe service conditions in all seasons. Meets or exceeds API CF-4/CF/SG, ACEA E2, and listed builder specifications. Typical values are for production blends and do not constitute a specification. For further information, contact the S-Oil sales team.',
};

const superGtS2_10w40BaseSpecs = [
  { label: 'API Rating', value: 'SP' },
  { label: 'Viscosity Grade', value: '10W-40' },
  { label: 'Base Oil', value: 'Fully Synthetic' },
];

const superGtS2_10w40Shared = {
  name: 'S-OIL SUPER GT S2',
  category: 'passenger-car',
  viscosity: '10W-40',
  shortDescription:
    'Multigrade gasoline fully synthetic engine oil (API SP). Advanced technology oil blended from high-performance fully synthetic base stocks and high-quality additives. Suitable for latest downsized engines with stop & start and hybrid systems requiring API SP, with very high viscosity index for longer drain intervals and maximum protection under severe conditions.',
  benefits: [
    'Excellent fuel economy and easy cold starts due to extreme fluidity at low temperatures',
    'High-resistant oil film even at high engine operating temperatures',
    'Advanced additive technology reduces sludge formation for improved engine cleanliness',
    'Excellent oxidation and thermal stability helps extend oil drain intervals',
    'Outstanding engine protection helps maintain longer engine life and greater compatibility with engine seals',
  ],
  usage:
    'For passenger cars, SUVs, light trucks, and vans. Suitable for downsized gasoline engines with stop & start and hybrid technology, and for modern high-performance turbocharged, supercharged, multi-valve fuel-injected gasoline engines requiring API SP 10W-40. Typical values are for production blends and do not constitute a specification. For further information, contact the S-Oil sales team.',
};

const superGtMotorOil_20w50TypicalSpecs = [
  { label: 'API Rating', value: 'SG / CF' },
  { label: 'Viscosity Grade', value: '20W-50' },
  { label: 'Base Oil', value: 'Group II' },
  { label: 'Density @ 15°C', value: '0.877 g/cm³ (ASTM D4052)' },
  { label: 'Viscosity @ 100°C', value: '19.60 cSt (ASTM D445)' },
  { label: 'Viscosity @ 40°C', value: '174 cSt (ASTM D445)' },
  { label: 'Viscosity Index', value: '130 (ASTM D2270)' },
  { label: 'Pour Point', value: '-30°C (ASTM D97)' },
  { label: 'Flash Point (COC)', value: '260°C (ASTM D92)' },
  { label: 'Total Base Number', value: '8.50 mg KOH/g (ASTM D2896)' },
  { label: 'CCS Viscosity', value: '8500 cP @ -15°C (ASTM D5293)' },
];

const superGtMotorOil_20w50Shared = {
  name: 'S-OIL SUPER GT',
  category: 'passenger-car',
  viscosity: '20W-50',
  shortDescription:
    'Multigrade gasoline and diesel engine oil (API SG/CF). Formulated with high-quality Group II base stocks and a balanced additive system for high engine protection and performance—helping prevent dirt and sludge build-up and reduce engine noise. Meets requirements of most car manufacturers and is suitable for standard services.',
  benefits: [
    'Good engine cleanliness due to improved detergency and dispersancy',
    'Good wear protection and improved resistance to oxidation',
    'Superior protection against viscosity and thermal breakdown',
    'Superior sludge protection for greater engine reliability',
    'Easier cold starting compared to mono-grade engine oils',
  ],
  usage:
    'For gasoline and diesel engines requiring API SG/CF SAE 20W-50 multigrade motor oil under standard service conditions. Typical values are for production blends and do not constitute a specification. For further information, contact the S-Oil sales team.',
};

export const seedProducts: SeedProduct[] = [
  {
    slug: 'super-gt-s1-20w50-3l',
    name: 'S-OIL SUPER GT S1',
    category: 'passenger-car',
    viscosity: '20W-50',
    packSize: '3L',
    image: img.superGtS1_20w50_3L,
    shortDescription:
      'Multigrade gasoline engine oil (API SN). Designed with high-quality semi-synthetic base stocks and the latest additive technology for excellent protection and performance—preventing dirt and sludge build-up and reducing engine noise. Suitable for gasoline and turbocharged engines in all seasons, including vehicles with catalytic converters on unleaded fuel.',
    benefits: [
      'Superior protection against viscosity and thermal breakdown',
      'Excellent detergency and dispersancy',
      'Superior sludge protection for greater engine reliability',
      'Enhanced wear protection and improved engine cleanliness',
      'Easier cold starts and improved fuel economy compared to mono-grade engine oils',
    ],
    specs: [
      { label: 'API Rating', value: 'SN' },
      { label: 'Viscosity Grade', value: '20W-50' },
      { label: 'Base Oil', value: 'Semi-Synthetic' },
      { label: 'Density @ 15°C', value: '0.873 g/cm³ (ASTM D4052)' },
      { label: 'Viscosity @ 100°C', value: '20.588 cSt (ASTM D445)' },
      { label: 'Viscosity @ 40°C', value: '169 cSt (ASTM D445)' },
      { label: 'Viscosity Index', value: '142 (ASTM D2270)' },
      { label: 'Pour Point', value: '-30°C (ASTM D97)' },
      { label: 'Flash Point (COC)', value: '252°C (ASTM D92)' },
      { label: 'Total Base Number', value: '7.3 mg KOH/g (ASTM D2896)' },
      { label: 'CCS Viscosity', value: '6050 cP @ -15°C (ASTM D5293)' },
      { label: 'Pack Size', value: '3L' },
    ],
    usage:
      'For gasoline and turbocharged passenger car engines requiring API SN 20W-50 multigrade oil, including vehicles with catalytic converters running on unleaded fuel, in all-round seasons. Meets requirements of most car manufacturers. Typical values are for production blends and do not constitute a specification. For further information, contact the S-Oil sales team.',
    ...commonLinks,
    shopUrl: 'https://shop.soillubricants.com/products/super-gt-s1-20w50-3l',
    status: 'published',
  },
  {
    slug: 'super-gt-s2-10w40-3l',
    ...superGtS2_10w40Shared,
    packSize: '3L',
    image: img.superGtS2_10w40_3L,
    specs: [...superGtS2_10w40BaseSpecs, { label: 'Pack Size', value: '3L' }],
    ...commonLinks,
    shopUrl: 'https://shop.soillubricants.com/products/super-gt-s2-10w40-3l',
    status: 'published',
  },
  {
    slug: 'super-gt-s2-10w40-4l',
    ...superGtS2_10w40Shared,
    packSize: '4L',
    image: img.superGtS2_10w40_4L,
    specs: [...superGtS2_10w40BaseSpecs, { label: 'Pack Size', value: '4L' }],
    ...commonLinks,
    shopUrl: 'https://shop.soillubricants.com/products/super-gt-s2-10w40-4l',
    status: 'published',
  },
  {
    slug: 'super-gt-s3-5w30-3l',
    name: 'S-OIL SUPER GT S3',
    category: 'passenger-car',
    viscosity: '5W-30',
    packSize: '3L',
    image: img.superGtS3_5w30_3L,
    shortDescription:
      'Extra high-performance gasoline fully synthetic engine oil (API SP, ILSAC GF-6A). Formulated with fully synthetic base stocks and advanced technology additives to provide a very high level of engine protection and performance. Suitable for the latest downsized engines equipped with stop & start technologies requiring API SP / ILSAC GF-6A; high viscosity index formulation supports longer drain intervals and maximum protection in modern designs operating under severe conditions.',
    benefits: [
      'Excellent fuel economy & easy cold starts due to extreme fluidity at low temperatures',
      'High resistant oil film even at high engine operating temperatures',
      'Excellent detergency & dispersancy reduces sludge formation which improves engine cleanliness',
      'Excellent oxidation & thermal stability, helps in extending oil drain intervals',
      'Outstanding wear protection for greater engine reliability and performance',
    ],
    specs: [
      { label: 'API Rating', value: 'SP' },
      { label: 'ILSAC', value: 'GF-6A' },
      { label: 'Viscosity Grade', value: '5W-30' },
      { label: 'Base Oil', value: 'Fully Synthetic' },
      { label: 'Pack Size', value: '3L' },
    ],
    usage:
      'For latest downsized gasoline engines equipped with stop & start technology requiring API SP / ILSAC GF-6A 5W-30. High viscosity index formulation supports longer drain intervals in modern engines and maximum protection under severe operating conditions. Typical values are for production blends and do not constitute a specification. For further information, contact the S-Oil sales team.',
    ...commonLinks,
    shopUrl: 'https://shop.soillubricants.com/products/super-gt-s3-5w30-3l',
    status: 'published',
  },
  {
    slug: 'super-gt-motor-oil-20w50-1l',
    ...superGtMotorOil_20w50Shared,
    packSize: '1L',
    image: img.superGtMotorOil_20w50_1L,
    specs: [...superGtMotorOil_20w50TypicalSpecs, { label: 'Pack Size', value: '1L' }],
    ...commonLinks,
    shopUrl: 'https://shop.soillubricants.com/products/super-gt-motor-oil-20w50-1l',
    status: 'published',
  },
  {
    slug: 'super-gt-motor-oil-20w50-3l',
    ...superGtMotorOil_20w50Shared,
    packSize: '3L',
    image: img.superGtMotorOil_20w50_3L,
    specs: [...superGtMotorOil_20w50TypicalSpecs, { label: 'Pack Size', value: '3L' }],
    ...commonLinks,
    shopUrl: 'https://shop.soillubricants.com/products/super-gt-motor-oil-20w50-3l',
    status: 'published',
  },
  {
    slug: 'super-gt-motorcycle-oil-20w40-0-7l',
    name: 'S-OIL SUPER GT MOTORCYCLE OIL',
    category: 'motorcycle',
    viscosity: '20W-40',
    packSize: '0.7L',
    image: img.superGtMotorcycleOil_20w40_0_7L,
    shortDescription:
      'High-quality, shear-stable multigrade motorcycle engine oil (API SG, JASO MA2). Multifunctional fluid for four-stroke motorcycle engines, clutches, and gearboxes, and portable power equipment requiring JASO MA2 and API SG lubricants.',
    benefits: [
      'Effective technology keeps the engine clean by controlling deposits for sustained power and acceleration',
      'Detergent and dispersant system slows piston and ring deposit build-up to help maintain engine power and performance',
      'Optimum frictional properties to prevent clutch slippage for a smoother ride',
      'Easier cold starts and improved fuel economy compared to mono-grade engine oils',
    ],
    specs: [
      { label: 'API Rating', value: 'SG' },
      { label: 'JASO', value: 'MA2' },
      { label: 'Viscosity Grade', value: '20W-40' },
      { label: 'Application', value: '4-Stroke Motorcycles (engine, clutch, gearbox)' },
      { label: 'Density @ 15°C', value: '0.8935 g/cm³ (ASTM D4052)' },
      { label: 'Viscosity @ 100°C', value: '15.60 cSt (ASTM D445)' },
      { label: 'Viscosity @ 40°C', value: '136.0 cSt (ASTM D445)' },
      { label: 'Viscosity Index', value: '119 (ASTM D2270)' },
      { label: 'Pour Point', value: '-27°C (ASTM D97)' },
      { label: 'Flash Point (COC)', value: '252°C (ASTM D92)' },
      { label: 'Total Base Number', value: '5.54 mg KOH/g (ASTM D2896)' },
      { label: 'CCS Viscosity', value: '8702 cP @ -15°C (ASTM D5293)' },
      { label: 'Pack Size', value: '0.7L' },
    ],
    usage:
      'For four-stroke motorcycle engines, clutches, and gearboxes, and portable power equipment requiring SAE 20W-40 API SG / JASO MA2 lubricants. Typical values are for production blends and do not constitute a specification. For further information, contact the S-Oil sales team.',
    ...commonLinks,
    shopUrl:
      'https://shop.soillubricants.com/products/super-gt-motorcycle-oil-20w40-0-7l',
    status: 'published',
  },
  {
    slug: 'super-gt-motorcycle-oil-20w50-0-7l',
    name: 'S-OIL SUPER GT MOTORCYCLE OIL',
    category: 'motorcycle',
    viscosity: '20W-50',
    packSize: '0.7L',
    image: img.superGtMotorcycleOil_20w50_0_7L,
    shortDescription:
      'High-quality, shear-stable multigrade motorcycle engine oil (API SG, JASO MA2). Multifunctional fluid for four-stroke motorcycle engines, clutches, and gearboxes, and portable power equipment requiring JASO MA2 and API SG lubricants.',
    benefits: [
      'Effective technology keeps the engine clean by controlling deposits for sustained power and acceleration',
      'Detergent and dispersant system slows piston and ring deposit build-up to help maintain engine power and performance',
      'Optimum frictional properties to prevent clutch slippage for a smoother ride',
      'Easier cold starts and improved fuel economy compared to mono-grade engine oils',
    ],
    specs: [
      { label: 'API Rating', value: 'SG' },
      { label: 'JASO', value: 'MA2' },
      { label: 'Viscosity Grade', value: '20W-50' },
      { label: 'Application', value: '4-Stroke Motorcycles (engine, clutch, gearbox)' },
      { label: 'Density @ 15°C', value: '0.8926 g/cm³ (ASTM D4052)' },
      { label: 'Viscosity @ 100°C', value: '19.55 cSt (ASTM D445)' },
      { label: 'Viscosity @ 40°C', value: '171.0 cSt (ASTM D445)' },
      { label: 'Viscosity Index', value: '131 (ASTM D2270)' },
      { label: 'Pour Point', value: '-27°C (ASTM D97)' },
      { label: 'Flash Point (COC)', value: '258°C (ASTM D92)' },
      { label: 'Total Base Number', value: '5.54 mg KOH/g (ASTM D2896)' },
      { label: 'CCS Viscosity', value: '8800 cP @ -15°C (ASTM D5293)' },
      { label: 'Pack Size', value: '0.7L' },
    ],
    usage:
      'For four-stroke motorcycle engines, clutches, and gearboxes, and portable power equipment requiring SAE 20W-50 API SG / JASO MA2 lubricants. Typical values are for production blends and do not constitute a specification. For further information, contact the S-Oil sales team.',
    ...commonLinks,
    shopUrl:
      'https://shop.soillubricants.com/products/super-gt-motorcycle-oil-20w50-0-7l',
    status: 'published',
  },
  {
    slug: 'super-gt-motor-oil-4t-20w50-1l',
    name: 'S-OIL SUPER GT MOTOR OIL 4T',
    category: 'motorcycle',
    viscosity: '20W-50',
    packSize: '1L',
    image: img.superGtMotorOil4T_20w50_1L,
    shortDescription:
      'Four-stroke motorcycle motor oil for reliable engine and clutch protection.',
    benefits: [
      'API SF performance',
      'Smooth clutch engagement',
      'Engine and gearbox protection',
      'Convenient 1L pack',
    ],
    specs: [
      { label: 'API Rating', value: 'SF' },
      { label: 'Viscosity Grade', value: '20W-50' },
      { label: 'Application', value: '4-Stroke Motorcycles' },
      { label: 'Pack Size', value: '1L' },
    ],
    usage: 'For four-stroke motorcycles requiring SAE 20W-50 4T motor oil.',
    ...commonLinks,
    shopUrl: 'https://shop.soillubricants.com/products/super-gt-motor-oil-4t-20w50-1l',
    status: 'published',
  },
  {
    slug: 'dezo-d1-sae50-4l',
    name: 'S-OIL DEZO D1',
    category: 'diesel',
    viscosity: 'SAE-50',
    packSize: '4L',
    image: img.dezoD1_sae50_4L,
    shortDescription:
      'Heavy-duty monograde diesel engine oil for demanding commercial operation.',
    benefits: [
      'Heavy-duty diesel protection',
      'Strong oxidation resistance',
      'Deposit control under load',
      'Reliable high-temperature lubrication',
    ],
    specs: [
      { label: 'API Rating', value: 'CF' },
      { label: 'SAE Grade', value: 'SAE-50' },
      { label: 'Application', value: 'Heavy-Duty Diesel' },
      { label: 'Pack Size', value: '4L' },
    ],
    usage: 'For diesel engines specifying API CF SAE-50 monograde oil.',
    ...commonLinks,
    shopUrl: 'https://shop.soillubricants.com/products/dezo-d1-sae50-4l',
    status: 'published',
  },
  {
    slug: 'dezo-d1-sae50-8l',
    name: 'S-OIL DEZO D1',
    category: 'diesel',
    viscosity: 'SAE-50',
    packSize: '8L',
    image: img.dezoD1_sae50_8L,
    shortDescription:
      'Heavy-duty monograde diesel engine oil for demanding commercial operation.',
    benefits: [
      'Heavy-duty diesel protection',
      'Strong oxidation resistance',
      'Deposit control under load',
      'Larger pack for workshop and fleet use',
    ],
    specs: [
      { label: 'API Rating', value: 'CF' },
      { label: 'SAE Grade', value: 'SAE-50' },
      { label: 'Application', value: 'Heavy-Duty Diesel' },
      { label: 'Pack Size', value: '8L' },
    ],
    usage: 'For diesel engines specifying API CF SAE-50 monograde oil.',
    ...commonLinks,
    shopUrl: 'https://shop.soillubricants.com/products/dezo-d1-sae50-8l',
    status: 'published',
  },
  {
    slug: 'dezo-d2-20w50-1l',
    ...dezoD2_20w50Shared,
    packSize: '1L',
    image: img.dezoD2_20w50_1L,
    specs: [...dezoD2_20w50TypicalSpecs, { label: 'Pack Size', value: '1L' }],
    ...commonLinks,
    shopUrl: 'https://shop.soillubricants.com/products/dezo-d2-20w50-1l',
    status: 'published',
  },
  {
    slug: 'dezo-d2-20w50-4l',
    ...dezoD2_20w50Shared,
    packSize: '4L',
    image: img.dezoD2_20w50_4L,
    specs: [...dezoD2_20w50TypicalSpecs, { label: 'Pack Size', value: '4L' }],
    ...commonLinks,
    shopUrl: 'https://shop.soillubricants.com/products/dezo-d2-20w50-4l',
    status: 'published',
  },
  {
    slug: 'dezo-d2-20w50-8l',
    ...dezoD2_20w50Shared,
    packSize: '8L',
    image: img.dezoD2_20w50_8L,
    specs: [...dezoD2_20w50TypicalSpecs, { label: 'Pack Size', value: '8L' }],
    ...commonLinks,
    shopUrl: 'https://shop.soillubricants.com/products/dezo-d2-20w50-8l',
    status: 'published',
  },
  {
    slug: 'dezo-d2-20w50-10l',
    ...dezoD2_20w50Shared,
    packSize: '10L',
    image: img.dezoD2_20w50_10L,
    specs: [...dezoD2_20w50TypicalSpecs, { label: 'Pack Size', value: '10L' }],
    ...commonLinks,
    shopUrl: 'https://shop.soillubricants.com/products/dezo-d2-20w50-10l',
    status: 'published',
  },
  {
    slug: 'ultra-gear-oil-sae-140',
    name: 'S-OIL ULTRA GEAR OIL',
    category: 'gear-oil',
    viscosity: 'SAE 140',
    packSize: 'Contact sales',
    image: img.ultraGearOil_140,
    shortDescription:
      'High-performance heavy-duty gear oil (API GL-4). Formulated from high-quality base oils and advanced additives for automotive heavy-duty transmissions, axles, and final drives where wear and scoring protection and a high level of oil film protection are required.',
    benefits: [
      'Enhanced anti-wear properties and outstanding film strength for exceptional equipment protection, fewer breakdowns, and improved transmission efficiency',
      'Excellent rust and corrosion protection for longer component life',
      'Compatibility with seals and gaskets helps minimize oil leakage and reduced contamination',
      'Suitable for heavy-duty manual transmissions, axles, and final drives requiring API GL-4 performance',
      'Off-highway applications including construction, mining, quarrying, and agriculture',
    ],
    specs: [
      { label: 'API Rating', value: 'GL-4' },
      { label: 'Viscosity Grade', value: 'SAE 140' },
      { label: 'Density @ 15°C', value: '0.907 g/cm³ (ASTM D4052)' },
      { label: 'Viscosity @ 40°C', value: '419 cSt (ASTM D445)' },
      { label: 'Viscosity @ 100°C', value: '29.7 cSt (ASTM D445)' },
      { label: 'Viscosity Index', value: '99 (ASTM D2270)' },
      { label: 'Pour Point', value: '-9°C (ASTM D97)' },
      { label: 'Flash Point (COC)', value: '260°C (ASTM D92)' },
      { label: 'Copper Strip Corrosion', value: '1B (ASTM D130)' },
      { label: 'Foam Seq I, II, III', value: '20/0 ml/ml (ASTM D892)' },
      { label: 'Phosphorus', value: '0.019 %wt (ASTM D4951)' },
    ],
    usage:
      'For heavy-duty manual transmissions, axles, and final drives requiring API GL-4 SAE 140 gear oil, including off-highway construction, mining, quarrying, and agricultural equipment. Typical values are for production blends and do not constitute a specification. For pack sizes and further information, contact the S-Oil sales team.',
    ...commonLinks,
    shopUrl: 'https://shop.soillubricants.com',
    status: 'published',
  },
  {
    slug: 'premium-petroleum-treatment-444ml',
    name: 'S-OIL PREMIUM PETROLEUM TREATMENT',
    category: 'treatment',
    viscosity: 'Premium Concentrated',
    packSize: '444ml',
    image: img.petroleumTreatment_444ml,
    shortDescription:
      'New improved premium concentrated petroleum treatment is a scientifically blended motor oil supplement designed to give the highest level of performance and engine protection. Special chemical additives are used to give triple wear protection.',
    benefits: [
      'Reduce oil burning',
      'Reduce exhaust smoking',
      'Seal rings to improve compression',
      'Boost power',
      'Save fuel by reducing blow-by',
      'Reduce friction',
      'Triple anti-wear protection',
      'Increases engine life and cuts costly engine repairs',
      'Prevents oil foaming',
      'Reducing valves and lifter noise',
      'Improved engine efficiency',
    ],
    specs: [
      { label: 'Density @ 15°C', value: '0.858 g/cc (ASTM D4052)' },
      { label: 'Kinematic Viscosity @ 100°C', value: '485.1 mm²/s (ASTM D445)' },
      { label: 'Net Volume', value: '444 ml' },
      { label: 'Product Type', value: 'Premium Concentrated Treatment' },
    ],
    usage:
      'Add to engine oil according to the product label. For smooth shifting in automatic and manual transmissions and differentials, add the contents of petroleum treatment with your regular lubricant. Typical values are for production blends and do not constitute a specification. For further information, contact the S-Oil sales team.',
    ...commonLinks,
    shopUrl:
      'https://shop.soillubricants.com/products/premium-petroleum-treatment-444ml',
    status: 'published',
  },
];

interface SeedBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  content: string[];
  status: 'published';
}

export const seedBlogPosts: SeedBlogPost[] = [
  {
    slug: 'choose-right-motor-oil-viscosity',
    title: 'How to Choose the Right Motor Oil Viscosity for Your Car',
    excerpt:
      "Understanding viscosity grades like 5W-30 and 10W-40 is essential for engine protection and fuel efficiency in Pakistan's climate.",
    image: '/blog-engine-tips.jpg',
    category: 'engine-tips',
    date: '2026-05-15',
    readTime: '5 min read',
    content: [
      'Motor oil viscosity is one of the most important factors in engine protection. The numbers on the bottle — like 5W-30 — tell you how the oil flows at different temperatures.',
      'The first number (5W) indicates cold-start performance. Lower numbers mean better flow when you start your engine on a cold morning. The second number (30) indicates viscosity at operating temperature.',
      'For most modern cars in Pakistan, 5W-30 or 5W-40 synthetic oils are recommended. Older vehicles or those with high mileage may benefit from 10W-40 or 20W-50.',
      "Always check your owner's manual for the manufacturer's recommended viscosity grade. Using the wrong oil can reduce fuel efficiency and accelerate engine wear.",
    ],
    status: 'published',
  },
  {
    slug: 'extend-engine-life-maintenance-tips',
    title: '10 Maintenance Tips to Extend Your Engine Life',
    excerpt:
      'Simple habits that protect your engine, improve performance, and save money on costly repairs over the long term.',
    image: '/blog-maintenance.jpg',
    category: 'maintenance',
    date: '2026-05-01',
    readTime: '7 min read',
    content: [
      "Regular oil changes are the single most important maintenance task for any vehicle. Follow your manufacturer's recommended drain interval, or sooner if you drive in severe conditions.",
      'Check oil levels monthly using the dipstick. Low oil levels can cause catastrophic engine damage within minutes of driving.',
      'Replace air filters regularly. A clogged air filter reduces fuel efficiency and can allow contaminants into the engine.',
      'Use quality fuel and avoid running on empty. Sediment at the bottom of the fuel tank can clog injectors and damage the fuel pump.',
      'Warm up your engine briefly before driving aggressively, especially in cold weather. This allows oil to circulate to all critical components.',
    ],
    status: 'published',
  },
  {
    slug: 'commercial-fleet-oil-management',
    title: 'Fleet Oil Management: Reducing Costs for Commercial Operators',
    excerpt:
      'How fleet managers can optimize lubricant selection, drain intervals, and oil analysis to cut operating costs.',
    image: '/blog-fleet.jpg',
    category: 'industry',
    date: '2026-04-20',
    readTime: '6 min read',
    content: [
      'For commercial fleet operators, lubricants represent a significant operating cost — but the right oil program can deliver substantial savings through reduced wear, fewer breakdowns, and improved fuel economy.',
      'Extended drain interval oils like API CK-4 rated products allow fleets to safely extend oil change intervals, reducing downtime and disposal costs.',
      'Oil analysis programs help fleet managers monitor engine health and optimize drain intervals based on actual condition rather than fixed schedules.',
      'Partnering with a reliable lubricant supplier ensures consistent product quality, technical support, and supply chain reliability across your fleet network.',
    ],
    status: 'published',
  },
  {
    slug: 'motorcycle-oil-wet-clutch-guide',
    title: 'Motorcycle Oil Guide: Why Wet Clutch Compatibility Matters',
    excerpt:
      'Using the wrong oil in your motorcycle can cause clutch slippage. Learn what JASO MA2 means and why it matters.',
    image: '/blog-motorcycle.jpg',
    category: 'engine-tips',
    date: '2026-04-08',
    readTime: '4 min read',
    content: [
      'Most motorcycles use a wet clutch system where the clutch plates are bathed in engine oil. This means your motorcycle oil must be formulated differently from car engine oil.',
      'Car oils often contain friction modifiers that improve fuel economy but cause motorcycle clutches to slip. Motorcycle oils with JASO MA or MA2 certification are designed to prevent this.',
      'Look for JASO MA2 rated oils for modern 4-stroke motorcycles. For 2-stroke engines, use a dedicated 2T oil mixed at the ratio specified by your manufacturer.',
    ],
    status: 'published',
  },
];
