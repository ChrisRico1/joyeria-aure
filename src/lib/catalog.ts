export type Category = 'Anillos' | 'Cadenitas' | 'Aros';
export type Product = { id: string; name: string; category: Category; material: string; description: string; ars: number; usd: number; imageIndex: number; featured?: boolean };
export const categories: Category[] = ['Anillos', 'Cadenitas', 'Aros'];
export const products: Product[] = [
  { id: 'AN01', name: 'Solitaire', category: 'Anillos', material: 'Oro 18k · Diamante', description: 'Una silueta delicada que deja todo el protagonismo a una piedra luminosa. Un clásico para los momentos que importan.', ars: 1450000, usd: 1200, imageIndex: 1, featured: true },
  { id: 'AN02', name: 'Épure', category: 'Anillos', material: 'Oro 18k', description: 'Líneas puras, superficie pulida y una belleza que no necesita nada más.', ars: 480000, usd: 400, imageIndex: 2 },
  { id: 'AN03', name: 'Éternelle', category: 'Anillos', material: 'Oro 18k · Diamantes', description: 'Un círculo de luz. Pequeños diamantes acompañan cada movimiento.', ars: 1680000, usd: 1400, imageIndex: 3 },
  { id: 'AN04', name: 'Esmeralda', category: 'Anillos', material: 'Oro 18k · Esmeralda', description: 'El verde profundo de una esmeralda, enmarcado por la calidez del oro.', ars: 1260000, usd: 1050, imageIndex: 4 },
  { id: 'AN05', name: 'Dúo', category: 'Anillos', material: 'Oro 18k', description: 'Dos formas suaves se encuentran en un diseño abierto y contemporáneo.', ars: 660000, usd: 550, imageIndex: 5 },
  { id: 'CA01', name: 'Lumière', category: 'Cadenitas', material: 'Oro 18k · Diamante', description: 'Un punto de luz sobre una cadena fina. La elegancia de los pequeños detalles.', ars: 720000, usd: 600, imageIndex: 1, featured: true },
  { id: 'CA02', name: 'Lien', category: 'Cadenitas', material: 'Oro 18k · 45 cm', description: 'Eslabones alargados de espíritu moderno, para llevar solos o en capas.', ars: 840000, usd: 700, imageIndex: 2 },
  { id: 'CA03', name: 'Perla', category: 'Cadenitas', material: 'Oro 18k · Perla cultivada', description: 'Una perla suspendida en oro. Natural, sutil y siempre especial.', ars: 420000, usd: 350, imageIndex: 3 },
  { id: 'CA04', name: 'Luna', category: 'Cadenitas', material: 'Oro 18k · 40 cm', description: 'Una pequeña luna dorada que acompaña tus días y tus noches.', ars: 360000, usd: 300, imageIndex: 4 },
  { id: 'CA05', name: 'Cordé', category: 'Cadenitas', material: 'Oro 18k · 45 cm', description: 'Una trama de oro con textura y movimiento, inspirada en la joyería clásica.', ars: 960000, usd: 800, imageIndex: 5 },
  { id: 'AR01', name: 'Courbe', category: 'Aros', material: 'Oro 18k', description: 'Curvas generosas y un acabado impecable. Un esencial con personalidad.', ars: 540000, usd: 450, imageIndex: 1, featured: true },
  { id: 'AR02', name: 'Éclat', category: 'Aros', material: 'Oro 18k · Diamantes', description: 'Dos destellos de luz en un diseño discreto, pensado para todos los días.', ars: 1080000, usd: 900, imageIndex: 2 },
  { id: 'AR03', name: 'Nacre', category: 'Aros', material: 'Oro 18k · Perlas cultivadas', description: 'Perlas de brillo suave en una caída delicada y elegante.', ars: 600000, usd: 500, imageIndex: 3 },
  { id: 'AR04', name: 'Cercle', category: 'Aros', material: 'Oro 18k', description: 'Argollas finas de líneas limpias. Livianas en su expresión, inolvidables en su forma.', ars: 420000, usd: 350, imageIndex: 4 },
  { id: 'AR05', name: 'Goutte', category: 'Aros', material: 'Oro 18k', description: 'Una gota de oro de proporciones escultóricas y acabado pulido.', ars: 780000, usd: 650, imageIndex: 5 },
];
export function formatPrice(product: Product, currency: 'ARS' | 'USD') {
  return currency === 'ARS' ? `$ ${product.ars.toLocaleString('es-AR')}` : `US$ ${product.usd.toLocaleString('es-AR')}`;
}
export function inquiryText(selection: Product[]) {
  return `Hola, me gustaría consultar por ${selection.map(p => `${p.name} (${p.id}) — ${formatPrice(p, 'ARS')} / ${formatPrice(p, 'USD')}`).join('; ')}.`;
}