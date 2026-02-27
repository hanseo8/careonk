import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const _playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })
const _geist = Geist({ subsets: ["latin"] })

const SITE_URL = 'https://careonk.com'
const SITE_NAME = 'CareOnK'
const DEFAULT_TITLE = 'CareOnK — Korea Premium Concierge for Indonesian Travelers'
const DEFAULT_DESC =
  'CareOnK adalah layanan concierge premium di Korea untuk wisatawan Indonesia. Medical beauty, day tour, K-Pop tickets, pharmacy, currency exchange, food & dining, personal helper, dan lebih. Turn ON your Korea Life.'

export const metadata: Metadata = {
  // ── Core ──────────────────────────────────────────────────────────────────
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESC,
  keywords: [
    // Korean-tourism + concierge
    'Korea concierge', 'Korea travel Indonesia', 'wisata Korea',
    'layanan concierge Korea', 'medical tourism Korea',
    // Service-specific
    'medical beauty Korea', 'klinik kecantikan Korea', 'klinik Korea Jakarta',
    'K-Pop concert tickets', 'tiket konser Korea', 'day tour Seoul',
    'pharmacy Korea', 'apotek Korea', 'currency exchange Seoul',
    'Seoul helper Bahasa Indonesia', 'personal companion Seoul',
    // Brand
    'CareOnK', 'On-K Medical', 'On-K Day Tour', 'On-K K-Pop',
    // Naver-friendly Korean keywords
    '한국 여행 인도네시아', '한국 컨시어지', '의료관광 한국',
  ],
  authors: [{ name: 'CareOnK', url: SITE_URL }],
  creator: 'CareOnK',
  publisher: 'CareOnK',

  // ── Verification ──────────────────────────────────────────────────────────
  verification: {
    google: 'REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE',
    other: {
      'naver-site-verification': 'REPLACE_WITH_NAVER_SEARCH_ADVISOR_CODE',
    },
  },

  // ── Open Graph (Facebook, KakaoTalk, etc.) ────────────────────────────────
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    alternateLocale: ['ko_KR', 'en_US'],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CareOnK — Premium Korea Concierge',
      },
    ],
  },

  // ── Twitter / X Card ─────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    images: ['/images/og-image.png'],
    creator: '@careonk',
    site: '@careonk',
  },

  // ── Canonical & Alternates ────────────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
    languages: {
      'id-ID': SITE_URL,
      'ko-KR': `${SITE_URL}/ko`,
      'en-US': `${SITE_URL}/en`,
    },
  },

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── App / PWA ─────────────────────────────────────────────────────────────
  applicationName: SITE_NAME,
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: 'default',
  },

  // ── Icons ─────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#FAFBFD',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// JSON-LD Structured Data — LocalBusiness + TouristInformationCenter
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'TouristInformationCenter'],
      '@id': `${SITE_URL}/#business`,
      name: 'CareOnK Premium Concierge',
      description: DEFAULT_DESC,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      image: `${SITE_URL}/images/og-image.png`,
      telephone: '+82-10-1234-5678',
      email: 'hello@careonk.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Seoul',
        addressCountry: 'KR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 37.5665,
        longitude: 126.9780,
      },
      areaServed: ['KR', 'ID'],
      currenciesAccepted: 'KRW, IDR, USD',
      priceRange: '$$',
      openingHours: 'Mo-Su 00:00-24:00',
      sameAs: [
        'https://wa.me/821012345678',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'CareOnK Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Medical Concierge', url: `${SITE_URL}/medical` } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Day Tour', url: `${SITE_URL}/daytour` } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'K-Pop Tickets', url: `${SITE_URL}/kpop` } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pharmacy', url: `${SITE_URL}/pharmacy` } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Exchange', url: `${SITE_URL}/exchange` } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dining', url: `${SITE_URL}/dining` } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Helper', url: `${SITE_URL}/helper` } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Photo Studio', url: `${SITE_URL}/photo` } },
        ],
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '50000',
        bestRating: '5',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: ['id', 'ko', 'en'],
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/home?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode,
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
        {/* Naver Search Advisor verification */}
        <meta name="naver-site-verification" content="REPLACE_WITH_NAVER_SEARCH_ADVISOR_CODE" />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        {/* JSON-LD Structured Data */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
