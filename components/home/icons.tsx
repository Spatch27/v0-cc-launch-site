export function IconCustomer() {
  return (
    <svg viewBox="0 0 64 64" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Center circle */}
      <circle cx="32" cy="32" r="4" />
      {/* Outer circle */}
      <circle cx="32" cy="32" r="16" />
      {/* Cross lines */}
      <line x1="32" y1="12" x2="32" y2="20" />
      <line x1="32" y1="44" x2="32" y2="52" />
      <line x1="12" y1="32" x2="20" y2="32" />
      <line x1="44" y1="32" x2="52" y2="32" />
      {/* Diagonal dots */}
      <circle cx="22" cy="22" r="2" />
      <circle cx="42" cy="22" r="2" />
      <circle cx="22" cy="42" r="2" />
      <circle cx="42" cy="42" r="2" />
    </svg>
  )
}

export function IconTeam() {
  return (
    <svg viewBox="0 0 64 64" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Triangle */}
      <polygon points="32,16 48,44 16,44" />
      {/* Nodes */}
      <circle cx="32" cy="16" r="3" />
      <circle cx="48" cy="44" r="3" />
      <circle cx="16" cy="44" r="3" />
      <circle cx="32" cy="32" r="2" />
      {/* Connection lines */}
      <line x1="32" y1="19" x2="32" y2="28" />
      <line x1="40" y1="28" x2="40" y2="40" />
      <line x1="24" y1="28" x2="24" y2="40" />
    </svg>
  )
}

export function IconData() {
  return (
    <svg viewBox="0 0 64 64" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Ascending line chart */}
      <polyline points="16,44 28,32 40,24 52,16" />
      {/* Nodes on the line */}
      <circle cx="16" cy="44" r="2.5" />
      <circle cx="28" cy="32" r="2.5" />
      <circle cx="40" cy="24" r="2.5" />
      <circle cx="52" cy="16" r="2.5" />
      {/* Connection lines down */}
      <line x1="16" y1="44" x2="16" y2="50" />
      <line x1="28" y1="32" x2="28" y2="50" />
      <line x1="40" y1="24" x2="40" y2="50" />
      <line x1="52" y1="16" x2="52" y2="50" />
    </svg>
  )
}

export function IconProcess() {
  return (
    <svg viewBox="0 0 64 64" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Circular arrows / motion */}
      <circle cx="32" cy="32" r="14" />
      <circle cx="32" cy="32" r="8" />
      {/* Arrow heads indicating motion */}
      <line x1="32" y1="18" x2="28" y2="24" />
      <line x1="32" y1="18" x2="36" y2="24" />
      <line x1="46" y1="32" x2="40" y2="28" />
      <line x1="46" y1="32" x2="40" y2="36" />
      {/* Accent circle */}
      <circle cx="32" cy="20" r="2" />
    </svg>
  )
}

export function IconTechnology() {
  return (
    <svg viewBox="0 0 64 64" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Central square/module */}
      <rect x="24" y="24" width="16" height="16" rx="2" />
      {/* Connection points */}
      <circle cx="32" cy="16" r="2" />
      <circle cx="48" cy="32" r="2" />
      <circle cx="32" cy="48" r="2" />
      <circle cx="16" cy="32" r="2" />
      {/* Connection lines */}
      <line x1="32" y1="18" x2="32" y2="24" />
      <line x1="46" y1="32" x2="40" y2="32" />
      <line x1="32" y1="46" x2="32" y2="40" />
      <line x1="18" y1="32" x2="24" y2="32" />
      {/* Diagonal connectors */}
      <line x1="38" y1="26" x2="44" y2="20" />
      <line x1="44" y1="38" x2="38" y2="38" />
      <line x1="26" y1="38" x2="20" y2="44" />
      <line x1="26" y1="26" x2="20" y2="20" />
    </svg>
  )
}
