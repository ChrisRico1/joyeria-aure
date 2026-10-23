import { describe, expect, it } from 'vitest';
import { categories, products, formatPrice, inquiryText } from './catalog';

describe('Catálogo fijo', () => {
  it('contiene solo las tres categorías solicitadas, con cinco artículos cada una', () => {
    expect(categories).toEqual(['Anillos', 'Cadenitas', 'Aros']);
    expect(products).toHaveLength(15);
    for (const category of categories) expect(products.filter(p => p.category === category)).toHaveLength(5);
  });
  it('mantiene precios definidos e independientes en pesos y dólares para cada artículo', () => {
    for (const product of products) {
      expect(product.ars).toBeGreaterThan(0);
      expect(product.usd).toBeGreaterThan(0);
    }
    const solitaire = products.find(p => p.id === 'AN01');
    if (!solitaire) throw new Error('Falta Solitaire');
    expect(formatPrice(solitaire, 'ARS')).toBe('$ 1.450.000');
    expect(formatPrice(solitaire, 'USD')).toBe('US$ 1.200');
  });
  it('incluye los artículos seleccionados y ambos precios en la consulta', () => {
    const solitaire = products.find(p => p.id === 'AN01');
    const lumiere = products.find(p => p.id === 'CA01');
    if (!solitaire || !lumiere) throw new Error('Faltan las piezas de consulta');
    const text = inquiryText([solitaire, lumiere]);
    expect(text).toContain('Solitaire (AN01)');
    expect(text).toContain('Lumière (CA01)');
    expect(text).toContain('$ 1.450.000 / US$ 1.200');
    expect(text).not.toContain('Courbe');
  });
});