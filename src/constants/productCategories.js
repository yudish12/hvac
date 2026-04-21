// Hard-coded product taxonomy — single source of truth.
// Used by both the admin panel (dropdowns) and the public product pages (filtering/grouping).
// Categories and subcategories mirror Blue Star's Central Air Conditioning lineup.

export const productCategories = [
  {
    slug: 'vrf-systems',
    label: 'VRF Systems',
    tagline:
      'Variable Refrigerant Flow systems for multi-zone commercial and institutional cooling.',
    subcategories: [
      { slug: 'vrf-v-plus-100-inverter', label: 'VRF V Plus 100% Inverter' },
      { slug: 'vrf-v-s-side-discharge', label: 'VRF V S — Side Discharge' },
      { slug: 'vrf-lite-100-inverter', label: 'VRF Lite 100% Inverter' },
    ],
  },
  {
    slug: 'ducted-systems',
    label: 'Ducted Systems',
    tagline:
      'Concealed ducted and packaged split systems for offices, halls, and institutional facilities.',
    subcategories: [
      {
        slug: 'next-gen-inverter-packaged-ducted',
        label: 'Next Generation Inverter Packaged & Ducted Split AC',
      },
      { slug: 'inverter-ducted-hot-cold', label: 'Inverter Ducted Hot & Cold AC' },
      { slug: 'packaged-ducted-split', label: 'Packaged Ducted Split AC' },
      { slug: 'water-cooled-mini-dx', label: 'Water Cooled Mini-DX System' },
      { slug: 'hiper-packaged-ducted', label: 'Hiper Packaged & Ducted Split AC' },
      { slug: 'concealed-split-ac', label: 'Concealed Split AC' },
    ],
  },
  {
    slug: 'chillers',
    label: 'Chillers',
    tagline:
      'Water- and air-cooled chillers for industrial plants, large buildings, and process cooling.',
    subcategories: [
      { slug: 'process-chillers', label: 'Process Chillers' },
      { slug: 'scroll-chillers', label: 'Scroll Chillers' },
      { slug: 'screw-chillers', label: 'Screw Chillers' },
      { slug: 'centrifugal-chillers', label: 'Centrifugal Chillers' },
      { slug: 'brine-chillers', label: 'Brine Chillers' },
      { slug: 'data-centre-chillers', label: 'Data Centre Chillers' },
    ],
  },
  {
    slug: 'others',
    label: 'Others',
    tagline: 'Supporting HVAC equipment including condensing units and specialty products.',
    subcategories: [{ slug: 'condensing-units', label: 'Condensing Units' }],
  },
]

const categoryMap = Object.fromEntries(productCategories.map((c) => [c.slug, c]))

export function getCategory(slug) {
  return categoryMap[slug]
}

export function getCategoryLabel(slug) {
  return categoryMap[slug]?.label ?? slug
}

export function getSubcategories(categorySlug) {
  return categoryMap[categorySlug]?.subcategories ?? []
}

export function getSubcategoryLabel(categorySlug, subcategorySlug) {
  return (
    getSubcategories(categorySlug).find((s) => s.slug === subcategorySlug)?.label ??
    subcategorySlug
  )
}

export const categorySlugs = productCategories.map((c) => c.slug)
