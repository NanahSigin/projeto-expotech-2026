type OculosSVGProps = {
  cor?: string;
  tamanho?: number;
  tipo?: "sol" | "grau" | "armacao";
};

export default function OculosSVG({ cor = "#b8914a", tamanho = 200, tipo = "grau" }: OculosSVGProps) {
  const escuro = "#2c1f0e";

  if (tipo === "sol") return (
    <svg viewBox="0 0 300 130" width={tamanho} xmlns="http://www.w3.org/2000/svg" fill="none">
      <rect x="20" y="30" width="110" height="75" rx="12" stroke={escuro} strokeWidth="9"/>
      <rect x="20" y="30" width="110" height="75" rx="12" stroke={cor} strokeWidth="5"/>
      <rect x="170" y="30" width="110" height="75" rx="12" stroke={escuro} strokeWidth="9"/>
      <rect x="170" y="30" width="110" height="75" rx="12" stroke={cor} strokeWidth="5"/>
      <path d="M130 65 Q150 55 170 65" stroke={escuro} strokeWidth="9" strokeLinecap="round"/>
      <path d="M130 65 Q150 55 170 65" stroke={cor} strokeWidth="5" strokeLinecap="round"/>
      <line x1="20" y1="50" x2="2" y2="45" stroke={escuro} strokeWidth="8" strokeLinecap="round"/>
      <line x1="20" y1="50" x2="2" y2="45" stroke={cor} strokeWidth="4" strokeLinecap="round"/>
      <line x1="280" y1="50" x2="298" y2="45" stroke={escuro} strokeWidth="8" strokeLinecap="round"/>
      <line x1="280" y1="50" x2="298" y2="45" stroke={cor} strokeWidth="4" strokeLinecap="round"/>
      <rect x="20" y="30" width="110" height="75" rx="12" fill={cor} fillOpacity="0.08"/>
      <rect x="170" y="30" width="110" height="75" rx="12" fill={cor} fillOpacity="0.08"/>
    </svg>
  );

  if (tipo === "armacao") return (
    <svg viewBox="0 0 300 130" width={tamanho} xmlns="http://www.w3.org/2000/svg" fill="none">
      <ellipse cx="85" cy="65" rx="65" ry="48" stroke={escuro} strokeWidth="9"/>
      <ellipse cx="85" cy="65" rx="65" ry="48" stroke={cor} strokeWidth="5"/>
      <ellipse cx="215" cy="65" rx="65" ry="48" stroke={escuro} strokeWidth="9"/>
      <ellipse cx="215" cy="65" rx="65" ry="48" stroke={cor} strokeWidth="5"/>
      <path d="M150 65 Q152 56 160 56 Q168 56 170 65" stroke={escuro} strokeWidth="8"/>
      <path d="M150 65 Q152 56 160 56 Q168 56 170 65" stroke={cor} strokeWidth="4"/>
      <line x1="20" y1="48" x2="2" y2="44" stroke={escuro} strokeWidth="8" strokeLinecap="round"/>
      <line x1="20" y1="48" x2="2" y2="44" stroke={cor} strokeWidth="4" strokeLinecap="round"/>
      <line x1="280" y1="48" x2="298" y2="44" stroke={escuro} strokeWidth="8" strokeLinecap="round"/>
      <line x1="280" y1="48" x2="298" y2="44" stroke={cor} strokeWidth="4" strokeLinecap="round"/>
      <line x1="55" y1="30" x2="75" y2="22" stroke={cor} strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round"/>
    </svg>
  );

  return (
    <svg viewBox="0 0 300 130" width={tamanho} xmlns="http://www.w3.org/2000/svg" fill="none">
      <ellipse cx="80" cy="65" rx="60" ry="44" stroke={escuro} strokeWidth="9"/>
      <ellipse cx="80" cy="65" rx="60" ry="44" stroke={cor} strokeWidth="5"/>
      <ellipse cx="220" cy="65" rx="60" ry="44" stroke={escuro} strokeWidth="9"/>
      <ellipse cx="220" cy="65" rx="60" ry="44" stroke={cor} strokeWidth="5"/>
      <path d="M140 65 Q143 56 150 56 Q157 56 160 65" stroke={escuro} strokeWidth="8"/>
      <path d="M140 65 Q143 56 150 56 Q157 56 160 65" stroke={cor} strokeWidth="4"/>
      <line x1="20" y1="48" x2="2" y2="44" stroke={escuro} strokeWidth="8" strokeLinecap="round"/>
      <line x1="20" y1="48" x2="2" y2="44" stroke={cor} strokeWidth="4" strokeLinecap="round"/>
      <line x1="280" y1="48" x2="298" y2="44" stroke={escuro} strokeWidth="8" strokeLinecap="round"/>
      <line x1="280" y1="48" x2="298" y2="44" stroke={cor} strokeWidth="4" strokeLinecap="round"/>
    </svg>
  );
}
