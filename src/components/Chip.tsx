export type ChipTone = 'ion' | 'nebula' | 'aurora' | 'comet' | 'flare' | 'pulsar' | 'dim'

interface ChipProps {
  tone?: ChipTone
  children: React.ReactNode
}

export default function Chip({ tone = 'dim', children }: ChipProps) {
  return <span className={`chip chip--${tone}`}>{children}</span>
}
