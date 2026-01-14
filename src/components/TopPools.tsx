'use client';

import { YieldPool } from '@/types';
import { SecurityScore } from './SecurityScore';
import { formatNumber, formatPercent } from '@/utils/security';
import { ExternalLink, TrendingUp, Shield, Clock } from 'lucide-react';

interface TopPoolCardProps {
  pool: YieldPool;
  rank: number;
}

export function TopPoolCard({ pool, rank }: TopPoolCardProps) {
  // Médailles emoji
  const medals: Record<number, string> = {
    1: '🥇',
    2: '🥈',
    3: '🥉',
  };

  // Couleurs de liseré lumineux par rang
  const glowColors: Record<number, string> = {
    1: 'shadow-[0_0_30px_rgba(250,204,21,0.3)] border-yellow-500/40',
    2: 'shadow-[0_0_25px_rgba(156,163,175,0.25)] border-gray-400/40',
    3: 'shadow-[0_0_20px_rgba(217,119,6,0.25)] border-amber-600/40',
  };

  const exploitCount = pool.exploits || 0;

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border p-6
        bg-gradient-to-br from-white/[0.08] to-white/[0.02]
        hover:from-white/[0.12] hover:to-white/[0.04]
        transition-all duration-300 hover:scale-[1.02]
        ${glowColors[rank] || ''}
      `}
    >
      {/* Médaille en haut à droite */}
      <div className="absolute top-4 right-4 text-3xl">
        {medals[rank]}
      </div>

      {/* Protocol info with logo */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
          {pool.protocolLogo ? (
            <img
              src={pool.protocolLogo}
              alt={pool.protocol}
              className="w-10 h-10 rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-2xl font-bold text-white/60">${pool.protocol.charAt(0)}</span>`;
              }}
            />
          ) : (
            <span className="text-2xl font-bold text-white/60">{pool.protocol.charAt(0)}</span>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-lg text-white flex items-center gap-2">
            {pool.protocol}
            {pool.protocolType && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-medium ${
                pool.protocolType === 'lending' 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'bg-purple-500/20 text-purple-400'
              }`}>
                {pool.protocolType === 'lending' ? 'Lending' : 'Vault'}
              </span>
            )}
          </h3>
          <div className="flex items-center gap-2 text-sm text-white/50 mt-1">
            {pool.chainLogo && (
              <img src={pool.chainLogo} alt={pool.chain} className="w-4 h-4 rounded-full" 
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            )}
            <span>{pool.chain}</span>
            <span className="opacity-40">•</span>
            {pool.stablecoinLogo && (
              <img src={pool.stablecoinLogo} alt={pool.stablecoin} className="w-4 h-4 rounded-full"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            )}
            <span>{pool.stablecoin}</span>
            {/* Indicateur USD/EUR */}
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
              pool.currency === 'EUR' 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'bg-green-500/20 text-green-400'
            }`}>
              {pool.currency}
            </span>
          </div>
        </div>
      </div>

      {/* APY highlight */}
      <div className="mb-6">
        <div className="text-sm text-white/40 mb-1">Rendement annuel</div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-gradient">
            {formatPercent(pool.apy)}
          </span>
          <span className="text-sm text-safe-400 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            APY
          </span>
        </div>
        {pool.apyReward > 0 && (
          <div className="text-xs text-white/40 mt-2">
            Base: {formatPercent(pool.apyBase)} + Rewards: {formatPercent(pool.apyReward)}
          </div>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 rounded-xl bg-black/20">
          <div className="text-xs text-white/40 mb-1 flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Sécurité
          </div>
          <SecurityScore score={pool.securityScore} size="sm" showLabel={false} />
        </div>
        <div className="p-3 rounded-xl bg-black/20">
          <div className="text-xs text-white/40 mb-1">TVL</div>
          <div className="text-lg font-semibold text-white">
            {formatNumber(pool.tvl)}
          </div>
        </div>
      </div>

      {/* Security details */}
      <div className="flex items-center gap-4 text-xs text-white/50 mb-6">
        <div className="flex items-center gap-1">
          <Shield className="w-3 h-3" />
          {pool.audits} audits
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {pool.protocolAge > 365
            ? `${Math.floor(pool.protocolAge / 365)}+ ans`
            : `${pool.protocolAge} jours`
          }
        </div>
        {exploitCount > 0 && (
          <div className={`flex items-center gap-1 ${exploitCount >= 2 ? 'text-red-400' : 'text-yellow-400'}`}>
            ⚠ {exploitCount} exploit{exploitCount > 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* CTA */}
      <a
        href={pool.poolUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary w-full text-center justify-center"
      >
        Déposer
        <ExternalLink className="w-4 h-4 ml-2" />
      </a>
    </div>
  );
}

// Container pour les 3 top pools
interface TopPoolsProps {
  pools: YieldPool[];
}

export function TopPools({ pools }: TopPoolsProps) {
  if (pools.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Top rendements
          </h2>
          <p className="text-white/50 text-sm mt-2">
            Les meilleurs yields avec un score de sécurité optimal
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pools.slice(0, 3).map((pool, index) => (
          <TopPoolCard key={pool.id} pool={pool} rank={index + 1} />
        ))}
      </div>
    </section>
  );
}
