'use client';

import { useMemo, useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { 
  Footer, 
  TopPools, 
  PoolsTable, 
  Filters, 
  Stats 
} from '@/components';
import { usePools, useStats } from '@/hooks/usePools';
import { Shield, TrendingUp, Clock, CheckCircle, RefreshCw, Menu, X, Globe } from 'lucide-react';

// ============================================
// SYSTÈME I18N INTÉGRÉ
// ============================================

type Locale = 'en' | 'fr' | 'it' | 'es' | 'de';

const translations = {
  en: {
    'hero.title1': 'Find the best',
    'hero.title2': 'yields',
    'hero.title3': 'with complete',
    'hero.title4': 'security',
    'hero.subtitle': 'Compare stablecoin yields from top DeFi protocols. Our security score helps you make the best choices.',
    'nav.topYields': 'Top Yields',
    'nav.allPools': 'All Pools',
    'nav.security': 'Security',
    'nav.faq': 'FAQ',
    'security.title': 'How does our security score work?',
    'security.subtitle': 'A score from 0 to 100 based on 4 objective criteria',
    'security.auditsTitle': 'Security audits',
    'security.auditsDesc': 'Number of audits by recognized firms',
    'security.ageTitle': 'Age',
    'security.ageDesc': 'Protocol age. Older = more battle-tested.',
    'security.tvlTitle': 'Liquidity (TVL)',
    'security.tvlDesc': 'Total value locked indicates market confidence.',
    'security.historyTitle': 'History',
    'security.historyDesc': 'No past exploits reduces risk.',
    'security.recommendation': 'Our recommendation',
    'security.recommendationText': 'We recommend pools with score above 80 for safer investment.',
    'common.updated': 'Updated',
    'common.realtime': 'Real-time',
    'common.audited': 'Audited',
  },
  fr: {
    'hero.title1': 'Trouvez les meilleurs',
    'hero.title2': 'rendements',
    'hero.title3': 'en toute',
    'hero.title4': 'sécurité',
    'hero.subtitle': 'Comparez les yields stablecoins des principaux protocoles DeFi. Notre score de sécurité vous aide à faire les meilleurs choix.',
    'nav.topYields': 'Top Yields',
    'nav.allPools': 'Tous les pools',
    'nav.security': 'Sécurité',
    'nav.faq': 'FAQ',
    'security.title': 'Comment fonctionne notre score de sécurité ?',
    'security.subtitle': 'Un score de 0 à 100 basé sur 4 critères objectifs',
    'security.auditsTitle': 'Audits de sécurité',
    'security.auditsDesc': "Nombre d'audits par des firmes reconnues",
    'security.ageTitle': 'Ancienneté',
    'security.ageDesc': "Plus le protocole est ancien, plus il a fait ses preuves.",
    'security.tvlTitle': 'Liquidité (TVL)',
    'security.tvlDesc': 'Montant total déposé indique la confiance du marché.',
    'security.historyTitle': 'Historique',
    'security.historyDesc': "Absence d'exploits réduit le risque.",
    'security.recommendation': 'Notre recommandation',
    'security.recommendationText': 'Nous recommandons les pools avec un score supérieur à 80.',
    'common.updated': 'MAJ',
    'common.realtime': 'Temps réel',
    'common.audited': 'Audités',
  },
  it: {
    'hero.title1': 'Trova i migliori',
    'hero.title2': 'rendimenti',
    'hero.title3': 'in completa',
    'hero.title4': 'sicurezza',
    'hero.subtitle': 'Confronta i rendimenti stablecoin dei principali protocolli DeFi.',
    'nav.topYields': 'Top Rendimenti',
    'nav.allPools': 'Tutti i Pool',
    'nav.security': 'Sicurezza',
    'nav.faq': 'FAQ',
    'security.title': 'Come funziona il nostro punteggio?',
    'security.subtitle': 'Un punteggio da 0 a 100 basato su 4 criteri',
    'security.auditsTitle': 'Audit di sicurezza',
    'security.auditsDesc': 'Numero di audit da aziende riconosciute',
    'security.ageTitle': 'Età',
    'security.ageDesc': 'Più è vecchio, più è testato.',
    'security.tvlTitle': 'Liquidità (TVL)',
    'security.tvlDesc': 'Valore totale indica fiducia del mercato.',
    'security.historyTitle': 'Storico',
    'security.historyDesc': 'Assenza di exploit riduce il rischio.',
    'security.recommendation': 'La nostra raccomandazione',
    'security.recommendationText': 'Raccomandiamo pool con punteggio sopra 80.',
    'common.updated': 'Agg.',
    'common.realtime': 'Tempo reale',
    'common.audited': 'Verificati',
  },
  es: {
    'hero.title1': 'Encuentra los mejores',
    'hero.title2': 'rendimientos',
    'hero.title3': 'con total',
    'hero.title4': 'seguridad',
    'hero.subtitle': 'Compara los yields de stablecoins de los principales protocolos DeFi.',
    'nav.topYields': 'Top Rendimientos',
    'nav.allPools': 'Todos los Pools',
    'nav.security': 'Seguridad',
    'nav.faq': 'FAQ',
    'security.title': '¿Cómo funciona nuestra puntuación?',
    'security.subtitle': 'Una puntuación de 0 a 100 basada en 4 criterios',
    'security.auditsTitle': 'Auditorías',
    'security.auditsDesc': 'Número de auditorías por firmas reconocidas',
    'security.ageTitle': 'Antigüedad',
    'security.ageDesc': 'Más antiguo = más probado.',
    'security.tvlTitle': 'Liquidez (TVL)',
    'security.tvlDesc': 'Valor total indica confianza del mercado.',
    'security.historyTitle': 'Historial',
    'security.historyDesc': 'Sin exploits reduce el riesgo.',
    'security.recommendation': 'Nuestra recomendación',
    'security.recommendationText': 'Recomendamos pools con puntuación sobre 80.',
    'common.updated': 'Act.',
    'common.realtime': 'Tiempo real',
    'common.audited': 'Auditados',
  },
  de: {
    'hero.title1': 'Finden Sie die besten',
    'hero.title2': 'Renditen',
    'hero.title3': 'mit voller',
    'hero.title4': 'Sicherheit',
    'hero.subtitle': 'Vergleichen Sie Stablecoin-Renditen der führenden DeFi-Protokolle.',
    'nav.topYields': 'Top Renditen',
    'nav.allPools': 'Alle Pools',
    'nav.security': 'Sicherheit',
    'nav.faq': 'FAQ',
    'security.title': 'Wie funktioniert unser Score?',
    'security.subtitle': 'Ein Score von 0 bis 100 basierend auf 4 Kriterien',
    'security.auditsTitle': 'Sicherheits-Audits',
    'security.auditsDesc': 'Anzahl der Audits durch anerkannte Firmen',
    'security.ageTitle': 'Alter',
    'security.ageDesc': 'Älter = mehr getestet.',
    'security.tvlTitle': 'Liquidität (TVL)',
    'security.tvlDesc': 'Gesamtwert zeigt Marktvertrauen.',
    'security.historyTitle': 'Historie',
    'security.historyDesc': 'Keine Exploits reduziert das Risiko.',
    'security.recommendation': 'Unsere Empfehlung',
    'security.recommendationText': 'Wir empfehlen Pools mit Score über 80.',
    'common.updated': 'Akt.',
    'common.realtime': 'Echtzeit',
    'common.audited': 'Geprüft',
  },
} as const;

const localeFlags: Record<Locale, string> = {
  en: '🇬🇧', fr: '🇫🇷', it: '🇮🇹', es: '🇪🇸', de: '🇩🇪',
};

const localeNames: Record<Locale, string> = {
  en: 'English', fr: 'Français', it: 'Italiano', es: 'Español', de: 'Deutsch',
};

const locales: Locale[] = ['en', 'fr', 'it', 'es', 'de'];

// Contexte i18n
interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof typeof translations.en) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
}

function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('yiield-locale') as Locale | null;
    const browserLang = navigator.language.split('-')[0].toLowerCase() as Locale;
    const initial = saved && locales.includes(saved) ? saved : 
                    locales.includes(browserLang) ? browserLang : 'en';
    setLocaleState(initial);
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('yiield-locale', newLocale);
  };

  const t = (key: keyof typeof translations.en): string => {
    return translations[locale]?.[key] || translations.en[key] || key;
  };

  if (!mounted) return null;

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

// ============================================
// LOGO YIIELD - ALIGNEMENT AMÉLIORÉ
// ============================================

function YiieldLogo() {
  return (
    <div className="flex items-center h-8">
      <span className="text-2xl font-bold text-white leading-none">y</span>
      <div className="flex items-end gap-[3px] h-[22px] mx-[2px] mb-[1px]">
        <div className="w-[5px] h-[13px] bg-red-500 rounded-[2px]" />
        <div className="w-[5px] h-[19px] bg-safe-400 rounded-[2px]" />
      </div>
      <span className="text-2xl font-bold text-white leading-none">eld</span>
    </div>
  );
}

// ============================================
// SÉLECTEUR DE LANGUE
// ============================================

function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale } = useI18n();
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm text-white/70"
      >
        <Globe className="w-4 h-4" />
        <span>{localeFlags[locale]} {locale.toUpperCase()}</span>
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 bg-dark-900 border border-white/10 rounded-xl overflow-hidden min-w-[160px] shadow-xl">
            {locales.map(lang => (
              <button
                key={lang}
                onClick={() => { setLocale(lang); setIsOpen(false); }}
                className={`w-full px-4 py-3 text-left text-sm flex items-center gap-3 hover:bg-white/5 transition-colors
                           ${lang === locale ? 'bg-safe-500/10 text-safe-400' : 'text-white/70'}`}
              >
                <span>{localeFlags[lang]}</span>
                <span>{localeNames[lang]}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ============================================
// HEADER AVEC I18N
// ============================================

function HeaderWithI18n({ lastUpdated, onRefresh, isLoading }: { lastUpdated: Date | null; onRefresh: () => void; isLoading: boolean }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-dark-950/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <YiieldLogo />

          <nav className="hidden md:flex items-center gap-8">
            <a href="#top-pools" className="text-sm text-white/60 hover:text-white transition-colors">{t('nav.topYields')}</a>
            <a href="#all-pools" className="text-sm text-white/60 hover:text-white transition-colors">{t('nav.allPools')}</a>
            <a href="#security" className="text-sm text-white/60 hover:text-white transition-colors">{t('nav.security')}</a>
            <a href="/faq" className="text-sm text-white/60 hover:text-white transition-colors">{t('nav.faq')}</a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block"><LanguageSelector /></div>
            {lastUpdated && (
              <div className="hidden lg:flex items-center gap-2 text-xs text-white/40">
                <Clock className="w-3 h-3" />
                <span>{t('common.updated')} {lastUpdated.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            )}
            <button onClick={onRefresh} disabled={isLoading} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50">
              <RefreshCw className={`w-4 h-4 text-white/70 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 rounded-lg bg-white/5">
              {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-dark-950/95 backdrop-blur-xl">
          <nav className="px-4 py-4 space-y-2">
            <div className="px-4 py-2 mb-2"><LanguageSelector /></div>
            <a href="#top-pools" className="block px-4 py-2 rounded-lg text-white/70 hover:bg-white/5" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.topYields')}</a>
            <a href="#all-pools" className="block px-4 py-2 rounded-lg text-white/70 hover:bg-white/5" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.allPools')}</a>
            <a href="#security" className="block px-4 py-2 rounded-lg text-white/70 hover:bg-white/5" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.security')}</a>
            <a href="/faq" className="block px-4 py-2 rounded-lg text-white/70 hover:bg-white/5" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.faq')}</a>
          </nav>
        </div>
      )}
    </header>
  );
}

// ============================================
// CONTENU PRINCIPAL
// ============================================

function HomeContent() {
  const { pools, topPools, filteredPools, isLoading, error, lastUpdated, filters, setFilters, refresh } = usePools();
  const stats = useStats(filteredPools);
  const { locale, t } = useI18n();
  
  const availableChains = useMemo(() => [...new Set(pools.map(p => p.chain))], [pools]);

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWithI18n lastUpdated={lastUpdated} onRefresh={refresh} isLoading={isLoading} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-safe-500/5 via-transparent to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {t('hero.title1')} <span className="text-gradient">{t('hero.title2')}</span>
                <br />
                {t('hero.title3')} <span className="text-gradient">{t('hero.title4')}</span>
              </h1>
              <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">{t('hero.subtitle')}</p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-white/50"><Shield className="w-4 h-4 text-safe-400" /><span>{t('nav.security')}</span></div>
                <div className="flex items-center gap-2 text-white/50"><TrendingUp className="w-4 h-4 text-safe-400" /><span>APY</span></div>
                <div className="flex items-center gap-2 text-white/50"><Clock className="w-4 h-4 text-safe-400" /><span>{t('common.realtime')}</span></div>
                <div className="flex items-center gap-2 text-white/50"><CheckCircle className="w-4 h-4 text-safe-400" /><span>{t('common.audited')}</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {error && (
            <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
              <p>Error: {error}</p>
              <button onClick={refresh} className="mt-2 text-sm underline hover:no-underline">Retry</button>
            </div>
          )}

          <Stats {...stats} />
          <section id="top-pools"><TopPools pools={topPools} /></section>
          <Filters filters={filters} onFilterChange={setFilters} availableChains={availableChains} />
          <section id="all-pools"><PoolsTable pools={filteredPools} isLoading={isLoading} /></section>

          {/* Security Section */}
          <section id="security" className="mt-16">
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-safe-500/10"><Shield className="w-6 h-6 text-safe-400" /></div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{t('security.title')}</h2>
                  <p className="text-white/50">{t('security.subtitle')}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 rounded-xl bg-white/5">
                  <div className="text-3xl font-bold text-safe-400 mb-2">25pts</div>
                  <h3 className="font-semibold text-white mb-1">{t('security.auditsTitle')}</h3>
                  <p className="text-sm text-white/50">{t('security.auditsDesc')}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                  <div className="text-3xl font-bold text-safe-400 mb-2">25pts</div>
                  <h3 className="font-semibold text-white mb-1">{t('security.ageTitle')}</h3>
                  <p className="text-sm text-white/50">{t('security.ageDesc')}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                  <div className="text-3xl font-bold text-safe-400 mb-2">25pts</div>
                  <h3 className="font-semibold text-white mb-1">{t('security.tvlTitle')}</h3>
                  <p className="text-sm text-white/50">{t('security.tvlDesc')}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                  <div className="text-3xl font-bold text-safe-400 mb-2">25pts</div>
                  <h3 className="font-semibold text-white mb-1">{t('security.historyTitle')}</h3>
                  <p className="text-sm text-white/50">{t('security.historyDesc')}</p>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-safe-500/5 border border-safe-500/20">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-safe-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">{t('security.recommendation')}</h4>
                    <p className="text-sm text-white/60">{t('security.recommendationText')}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer avec locale */}
      <Footer locale={locale} />
    </div>
  );
}

// ============================================
// PAGE PRINCIPALE
// ============================================

export default function HomePage() {
  return (
    <I18nProvider>
      <HomeContent />
    </I18nProvider>
  );
}
