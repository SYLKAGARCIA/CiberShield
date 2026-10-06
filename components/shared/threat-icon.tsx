import { Mail, MessageSquareWarning, PhoneCall, QrCode, Users, UserX, Bug, Lock, Eye, KeyRound, Link2, Smartphone, Share2, Wifi, Bot, ShieldAlert, type LucideIcon } from 'lucide-react';

const MAPA: Record<string, LucideIcon> = {
  mail: Mail, message: MessageSquareWarning, phone: PhoneCall, qr: QrCode, users: Users, 'user-x': UserX,
  bug: Bug, lock: Lock, eye: Eye, key: KeyRound, link: Link2, smartphone: Smartphone, share: Share2, wifi: Wifi, bot: Bot,
};

export function ThreatIcon({ nombre, size = 22, className }: { nombre: string; size?: number; className?: string }) {
  const Icono = MAPA[nombre] ?? ShieldAlert;
  return <Icono size={size} className={className} aria-hidden="true" />;
}
