import { Review } from '../types';

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r-1',
    listingId: 'l-1',
    userName: 'Carlos Mendoza',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'Hace 3 días',
    comment: 'La mejor experiencia de churrasco en toda Atlanta. Los cortes de carne estaban perfectos y la atención en español por parte de Andrés hizo la noche inolvidable para el aniversario de mi esposa.',
    ownerResponse: {
      response: '¡Muchísimas gracias Carlos! Fue un honor celebrar su aniversario con nosotros en Buckhead. Esperamos verlos pronto de nuevo.',
      date: 'Hace 2 días',
    },
  },
  {
    id: 'r-2',
    listingId: 'l-2',
    userName: 'Mariana Gutiérrez',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'Hace 1 semana',
    comment: 'La Dra. García logró solucionar el proceso de residencia de mi esposo cuando otros abogados nos decían que no había opción. Éticos, transparentes y súper profesionales.',
    ownerResponse: {
      response: 'Estimada Mariana, nos alegra enormemente compartir esta alegría con tu familia. Estamos para servirles siempre.',
      date: 'Hace 5 días',
    },
  },
  {
    id: 'r-3',
    listingId: 'l-3',
    userName: 'José Luis Torrealba',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'Hace 2 semanas',
    comment: 'Excelente atención médica en Duluth. Llegué sin cita previa por un malestar fuerte y el Dr. Morales me atendió súper rápido, me hicieron los análisis ahí mismo.',
  },
  {
    id: 'r-4',
    listingId: 'l-4',
    userName: 'Valeria Rivas',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 4,
    date: 'Hace 3 semanas',
    comment: 'Los tacos de birria y las margaritas artesanales en la terraza de Midtown son insuperables. ¡El ambiente de los viernes en la noche es genial!',
  },
];
