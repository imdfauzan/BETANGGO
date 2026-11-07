import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PillInput } from '../components/ui/PillInput';
import { FilterChip } from '../components/ui/FilterChip';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { PriceText } from '../components/ui/PriceText';
import { SEED_DESTINATIONS } from '@betanggo/shared';
import { Search, Clock, MapPin, Bookmark, BookmarkCheck } from 'lucide-react';
import { t } from '../i18n';

export const ExploreScreen: React.FC = () => {
  const { lang, setDetailModalDestId, savedOfflineDestIds, toggleSaveOffline } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKind, setSelectedKind] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const categories = [
    { id: 'all', label: t('explore.cat.all', lang) },
    { id: 'attraction', label: t('explore.cat.nature', lang) },
    { id: 'lodging', label: t('explore.cat.stay', lang) },
    { id: 'restaurant', label: t('explore.cat.food', lang) }
  ];

  const regions = [
    { id: 'all', label: t('explore.all_regions', lang) },
    { id: 'palangka-raya', label: 'Palangka Raya' },
    { id: 'kobar', label: 'Kobar (Tanjung Puting)' },
    { id: 'gunung-mas', label: 'Gunung Mas' },
    { id: 'kotim', label: 'Sampit' }
  ];

  const filteredDestinations = useMemo(() => {
    return SEED_DESTINATIONS.filter(item => {
      const matchKind = selectedKind === 'all' || item.kind === selectedKind;
      const matchRegion = selectedRegion === 'all' || item.region === selectedRegion;
      const query = searchQuery.toLowerCase().trim();
      const matchQuery =
        !query ||
        item.name.id.toLowerCase().includes(query) ||
        item.name.en.toLowerCase().includes(query) ||
        item.summary.id.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query));

      return matchKind && matchRegion && matchQuery;
    });
  }, [searchQuery, selectedKind, selectedRegion]);

  return (
    <div className="flex flex-col gap-4 px-4 pt-3 pb-8">
      {/* Search Bar */}
      <PillInput
        icon={<Search size={18} />}
        placeholder={t('explore.search.placeholder', lang)}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onClear={() => setSearchQuery('')}
      />

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => (
          <FilterChip
            key={cat.id}
            label={cat.label}
            isActive={selectedKind === cat.id}
            onClick={() => setSelectedKind(cat.id)}
          />
        ))}
      </div>

      {/* Region Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
        {regions.map((reg) => (
          <button
            key={reg.id}
            type="button"
            onClick={() => setSelectedRegion(reg.id)}
            className={`px-3 py-1.5 rounded-[var(--r-pill)] border transition-all shrink-0 text-xs font-medium ${
              selectedRegion === reg.id
                ? 'bg-[var(--surface-2)] border-[var(--primary)] text-[var(--primary)] font-bold'
                : 'border-[var(--border)] text-[var(--muted)] hover:text-[var(--fg)]'
            }`}
          >
            {reg.label}
          </button>
        ))}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[var(--muted)] px-1">
        <div className="flex items-center gap-2">
          <span>{t('explore.showing', lang)} {filteredDestinations.length} {t('explore.destinations', lang)}</span>
          {(searchQuery || selectedKind !== 'all' || selectedRegion !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedKind('all');
                setSelectedRegion('all');
              }}
              className="text-[var(--primary)] font-bold hover:underline"
            >
              {t('explore.clear_filters', lang)}
            </button>
          )}
        </div>
      </div>

      {/* Destination Cards List */}
      {filteredDestinations.length === 0 ? (
        <div className="py-12 text-center text-xs text-[var(--muted)]">
          {t('explore.empty', lang)}
        </div>
      ) : (
        <div className="flex flex-col gap-3.5">
          {filteredDestinations.map((dest) => {
            const isSaved = savedOfflineDestIds.includes(dest.id);

            return (
              <SurfaceCard
                key={dest.id}
                rounded="card"
                interactive
                onClick={() => setDetailModalDestId(dest.id)}
                className="overflow-hidden p-0 flex flex-col border border-[var(--border)]"
              >
                <div className="relative h-40 w-full">
                  <img
                    src={dest.image_url}
                    alt={dest.name[lang] || dest.name.id}
                    className="w-full h-full object-cover"
                  />
                  {/* Region Pill */}
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-[var(--r-pill)] bg-[var(--surface)]/90 backdrop-blur-sm text-[11px] font-bold text-[var(--fg)] border border-[var(--border)] flex items-center gap-1">
                    <MapPin size={11} className="text-[var(--primary)]" />
                    <span>{dest.region === 'palangka-raya' ? 'Palangka Raya' : dest.region === 'kobar' ? 'Kotawaringin Barat' : dest.region}</span>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveOffline(dest.id);
                    }}
                    className={`absolute top-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm ${
                      isSaved
                        ? 'bg-[var(--accent)] text-[var(--on-accent)]'
                        : 'bg-[var(--surface)]/90 backdrop-blur-sm text-[var(--fg)] border border-[var(--border)] hover:bg-[var(--surface)]'
                    }`}
                    aria-label="Simpan offline"
                  >
                    {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                  </button>
                </div>

                <div className="p-3.5">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-sm text-[var(--fg)]">
                      {dest.name[lang] || dest.name.id}
                    </h3>
                  </div>

                  <p className="text-xs text-[var(--muted)] line-clamp-2 leading-relaxed mb-3">
                    {dest.summary[lang] || dest.summary.id}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[var(--border)] text-xs">
                    <div className="flex items-center gap-1 text-[var(--muted)]">
                      <Clock size={13} />
                      <span>{dest.min_dwell_min} {t('explore.minutes', lang)}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-[var(--muted)]">{t('explore.from_price', lang)}</span>
                      <PriceText amountIdr={dest.price_estimate_idr} lang={lang} size="sm" />
                    </div>
                  </div>
                </div>
              </SurfaceCard>
            );
          })}
        </div>
      )}
    </div>
  );
};
