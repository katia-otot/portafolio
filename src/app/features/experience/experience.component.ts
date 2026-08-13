import { Component } from '@angular/core';
import { WaveDividerComponent } from '../../shared/components/wave-divider/wave-divider.component';

export interface ExperienceBullet {
  text: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  summary: string;
  bullets: ExperienceBullet[];
}

@Component({
  selector: 'app-experience',
  imports: [WaveDividerComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
})
export class ExperienceComponent {
  readonly experiences: ExperienceItem[] = [
    {
      role: 'Desarrolladora de Software Full-Stack',
      company: 'Unit0 Studio',
      period: 'Octubre 2025 — Mayo 2026',
      summary:
        'Desarrollo de aplicaciones web y mobile a medida: contactos, turnos y mensajería.',
      bullets: [
        {
          text: 'Web de contactos: listado de personas con emails, celulares y notas por contacto, con registro e inicio de sesión con Google.',
        },
        {
          text: 'App móvil para lavaderos de autos: registro de turnos, autenticación con Google y persistencia de las reservas en Firebase.',
        },
        {
          text: 'Sistema para guardar mensajes entrantes de WhatsApp e interfaz de chat estilo WhatsApp para enviar y conservar la conversación.',
        },
        {
          text: 'Backend e integraciones (APIs, auth, almacenamiento y webhooks) para sostener esas apps en web y mobile.',
        },
      ],
    },
  ];
}
