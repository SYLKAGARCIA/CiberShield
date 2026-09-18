export interface ItemChecklist {
  id: string;
  texto: string;
  categoria: 'Cuentas' | 'Dispositivos' | 'Navegación' | 'Redes sociales';
}

export const CHECKLIST_SEGURIDAD: ItemChecklist[] = [
  { id: 'password-manager', texto: 'Instalé un gestor de contraseñas', categoria: 'Cuentas' },
  { id: '2fa-correo', texto: 'Activé 2FA en mi correo principal', categoria: 'Cuentas' },
  { id: '2fa-redes', texto: 'Activé 2FA en mis redes sociales', categoria: 'Cuentas' },
  { id: 'contrasenas-unicas', texto: 'Cambié mis contraseñas repetidas por únicas', categoria: 'Cuentas' },
  { id: 'bloqueo-pantalla', texto: 'Configuré bloqueo automático de pantalla', categoria: 'Dispositivos' },
  { id: 'actualizaciones-auto', texto: 'Activé actualizaciones automáticas', categoria: 'Dispositivos' },
  { id: 'backup-configurado', texto: 'Configuré una copia de seguridad periódica', categoria: 'Dispositivos' },
  { id: 'antivirus', texto: 'Tengo un antivirus/antimalware activo', categoria: 'Dispositivos' },
  { id: 'https-verificado', texto: 'Reviso que los sitios usen HTTPS antes de pagar/loguearme', categoria: 'Navegación' },
  { id: 'no-descargas-dudosas', texto: 'Evito descargar software de fuentes no oficiales', categoria: 'Navegación' },
  { id: 'privacidad-redes', texto: 'Revisé la configuración de privacidad de mis redes sociales', categoria: 'Redes sociales' },
  { id: 'ubicacion-desactivada', texto: 'Desactivé la ubicación en tiempo real en publicaciones públicas', categoria: 'Redes sociales' },
];
