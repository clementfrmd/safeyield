'use client';

import { ExternalLink } from 'lucide-react';

type Locale = 'en' | 'fr' | 'it' | 'es' | 'de';

interface FooterProps {
  locale?: Locale;
}

// Traductions du Footer
const footerTranslations = {
  en: {
    description: 'Find the best stablecoin yields safely. Our security score helps you make informed decisions.',
    resources: 'Resources',
    securityScore: 'Security Score',
    legal: 'Legal',
    terms: 'Terms of Use',
    privacy: 'Privacy Policy',
    disclaimer: 'Risk Disclaimer',
    disclaimerText: 'Yields shown are for informational purposes only and may vary. DeFi investments carry risks. Do your own research before investing. Yiield is not financial advice.',
    rights: 'All rights reserved.',
  },
  fr: {
    description: 'Trouvez les meilleurs rendements stablecoins en toute sécurité. Notre score de sécurité vous aide à décider.',
    resources: 'Ressources',
    securityScore: 'Score de sécurité',
    legal: 'Légal',
    terms: "Conditions d'utilisation",
    privacy: 'Politique de confidentialité',
    disclaimer: 'Avertissement',
    disclaimerText: "Les rendements affichés sont informatifs et peuvent varier. Les investissements DeFi comportent des risques. Faites vos propres recherches avant d'investir. Yiield n'est pas un conseil financier.",
    rights: 'Tous droits réservés.',
  },
  it: {
    description: 'Trova i migliori rendimenti stablecoin in sicurezza. Il nostro punteggio ti aiuta a decidere.',
    resources: 'Risorse',
    securityScore: 'Punteggio sicurezza',
    legal: 'Legale',
    terms: 'Termini di utilizzo',
    privacy: 'Privacy Policy',
    disclaimer: 'Avviso',
    disclaimerText: 'I rendimenti mostrati sono solo informativi e possono variare. Gli investimenti DeFi comportano rischi. Fai le tue ricerche prima di investire. Yiield non è consulenza finanziaria.',
    rights: 'Tutti i diritti riservati.',
  },
  es: {
    description: 'Encuentra los mejores rendimientos stablecoin de forma segura. Nuestra puntuación te ayuda a decidir.',
    resources: 'Recursos',
    securityScore: 'Puntuación seguridad',
    legal: 'Legal',
    terms: 'Términos de uso',
    privacy: 'Política de privacidad',
    disclaimer: 'Aviso',
    disclaimerText: 'Los rendimientos mostrados son solo informativos y pueden variar. Las inversiones DeFi conllevan riesgos. Haz tu propia investigación antes de invertir. Yiield no es asesoramiento financiero.',
    rights: 'Todos los derechos reservados.',
  },
  de: {
    description: 'Finden Sie die besten Stablecoin-Renditen sicher. Unser Score hilft Ihnen bei der Entscheidung.',
    resources: 'Ressourcen',
    securityScore: 'Sicherheits-Score',
    legal: 'Rechtliches',
    terms: 'Nutzungsbedingungen',
    privacy: 'Datenschutz',
    disclaimer: 'Hinweis',
    disclaimerText: 'Die angezeigten Renditen dienen nur zu Informationszwecken und können variieren. DeFi-Investitionen bergen Risiken. Recherchieren Sie selbst vor dem Investieren. Yiield ist keine Finanzberatung.',
    rights: 'Alle Rechte vorbehalten.',
  },
};

// Logo Yiield - alignement amélioré
function YiieldLogo() {
  return (
    <div className="flex items-center h-6">
      <span className="text-xl font-bold text-white leading-none">y</span>
      <div className="flex items-end gap-[2px] h-[18px] mx-[1px] mb-[1px]">
        <div className="w-[4px] h-[11px] bg-red-500 rounded-[2px]" />
        <div className="w-[4px] h-[16px] bg-safe-400 rounded-[2px]" />
      </div>
      <span className="text-xl font-bold text-white leading-none">eld</span>
    </div>
  );
}

export function Footer({ locale = 'en' }: FooterProps) {
  const t = footerTranslations[locale] || footerTranslations.en;

  return (
    <footer className="mt-20 border-t border-white/5 bg-dark-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <YiieldLogo />
            </div>
            <p className="text-sm text-white/50 max-w-sm leading-relaxed">
              {t.description}
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t.resources}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://defillama.com/yields"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  DefiLlama
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="#security"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {t.securityScore}
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t.legal}</h3>
            <ul className="space-y-3">
              <li>
                <a href="/terms" className="text-sm text-white/50 hover:text-white transition-colors">
                  {t.terms}
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-sm text-white/50 hover:text-white transition-colors">
                  {t.privacy}
                </a>
              </li>
              <li>
                <a href="/disclaimer" className="text-sm text-white/50 hover:text-white transition-colors">
                  {t.disclaimer}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-5 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
          <p className="text-xs text-yellow-500/70 text-center leading-relaxed">
            ⚠️ <strong>{t.disclaimer}:</strong> {t.disclaimerText}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-xs text-white/30 text-center">
            © COMMIT MEDIA 2026. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
