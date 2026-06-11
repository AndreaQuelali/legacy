export const STAT_CONFIG = [
  { icon: 'public', value: '48', labelKey: 'nations' },
  { icon: 'sports_soccer', value: '104', labelKey: 'matches' },
  { icon: 'groups', value: '1248', labelKey: 'players' },
  { icon: 'stadium', valueKey: 'host_cities' as const },
  { icon: 'emoji_events', value: '1', labelKey: 'champion' },
] as const

export type StatConfigItem = (typeof STAT_CONFIG)[number]
