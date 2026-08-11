const colors = {
  bleu_memoways: '#515792',
  orange_marque: '#E27227',
  orange_cta: '#E07428',
  orange_accessible: '#A8440D',
  texte_cta: '#1F2937',
  vert_marque: '#3AAB8A',
  vert_accessible: '#167A5E',
  vert_olive: '#7AB648',
  vert_olive_accessible: '#4C741B',
  violet: '#9B59B6',
  violet_accessible: '#7A3F95',
  gris_300: '#D1D5DB',
  gris_400: '#9CA3AF',
  gris_500: '#6B7280',
  blanc: '#FFFFFF',
  surface: '#F8F9FC',
};

function linear(value) {
  const channel = Number.parseInt(value, 16) / 255;
  return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const compact = hex.replace('#', '');
  const [r, g, b] = [compact.slice(0, 2), compact.slice(2, 4), compact.slice(4, 6)].map(linear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
}

const pairs = [
  ['bleu_memoways', 'blanc'],
  ['orange_marque', 'blanc'],
  ['orange_cta', 'texte_cta'],
  ['orange_accessible', 'blanc'],
  ['vert_marque', 'blanc'],
  ['vert_accessible', 'blanc'],
  ['vert_olive', 'blanc'],
  ['vert_olive_accessible', 'blanc'],
  ['violet', 'blanc'],
  ['violet_accessible', 'blanc'],
  ['gris_300', 'blanc'],
  ['gris_400', 'blanc'],
  ['gris_500', 'blanc'],
  ['gris_500', 'surface'],
];

console.table(pairs.map(([foreground, background]) => {
  const ratio = contrast(colors[foreground], colors[background]);
  return {
    foreground,
    background,
    ratio: ratio.toFixed(2),
    'AA texte normal (4.5)': ratio >= 4.5 ? 'OK' : 'ÉCHEC',
    'AA grand texte / UI (3)': ratio >= 3 ? 'OK' : 'ÉCHEC',
  };
}));
