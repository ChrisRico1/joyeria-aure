import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowUpRight, ArrowRight, Check, Diamond, Heart, Menu, MessageCircle, ShoppingBag, X, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { categories, products, formatPrice, inquiryText, type Product, type Category } from '@/lib/catalog';
import hero from '@/assets/maison-hero.jpg';
import ring1 from '@/assets/rings-1.jpg';
import ring2 from '@/assets/rings-2.jpg';
import ring3 from '@/assets/rings-3.jpg';
import ring4 from '@/assets/rings-4.jpg';
import ring5 from '@/assets/rings-5.jpg';
import chain1 from '@/assets/chains-1.jpg';
import chain2 from '@/assets/chains-2.jpg';
import chain3 from '@/assets/chains-3.jpg';
import chain4 from '@/assets/chains-4.jpg';
import chain5 from '@/assets/chains-5.jpg';
import ear1 from '@/assets/earrings-1.jpg';
import ear2 from '@/assets/earrings-2.jpg';
import ear3 from '@/assets/earrings-3.jpg';
import ear4 from '@/assets/earrings-4.jpg';
import ear5 from '@/assets/earrings-5.jpg';

const images = { Anillos: [ring1, ring2, ring3, ring4, ring5], Cadenitas: [chain1, chain2, chain3, chain4, chain5], Aros: [ear1, ear2, ear3, ear4, ear5] };
const imageFor = (p: Product) => images[p.category][p.imageIndex - 1];
const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Auré — Joyería & Relojería | Colección de joyas' },
    { name: 'description', content: 'Descubrí Auré: anillos, cadenitas y aros de elegancia atemporal. Catálogo de muestra con precios en pesos y dólares.' },
    { property: 'og:title', content: 'Auré — Una expresión de vos' },
    { property: 'og:description', content: 'Explorá una colección de anillos, cadenitas y aros. Joyería ficticia con precios de muestra en pesos y dólares.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

function Index() {
  const [category, setCategory] = useState<Category | 'Todas'>('Todas');
  const [currency, setCurrency] = useState<'ARS' | 'USD'>('ARS');
  const [selected, setSelected] = useState<string[]>([]);
  const [detail, setDetail] = useState<Product | null>(null);
  const [bagOpen, setBagOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('selection');
  const [copied, setCopied] = useState(false);
  const selection = products.filter(p => selected.includes(p.id));
  const filtered = products.filter(p => (category === 'Todas' || p.category === category) && `${p.name} ${p.material}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())).sort((a, b) => sort === 'low' ? a[currency === 'ARS' ? 'ars' : 'usd'] - b[currency === 'ARS' ? 'ars' : 'usd'] : sort === 'high' ? b[currency === 'ARS' ? 'ars' : 'usd'] - a[currency === 'ARS' ? 'ars' : 'usd'] : 0);
  function toggle(p: Product) { setSelected(prev => prev.includes(p.id) ? prev.filter(id => id !== p.id) : [...prev, p.id]); }
  function navigateTo(id: string) { setMenuOpen(false); scrollTo(id); }
  function viewCategory(value: Category) { setCategory(value); setQuery(''); scrollTo('coleccion'); }

  return <div>
    <div className="announcement">UN DETALLE. UNA HISTORIA. PARA SIEMPRE.</div>
    <header className="site-header">
      <Button variant="ghost" size="icon" className="mobile-menu" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      <Button variant="ghost" className="wordmark" onClick={() => navigateTo('inicio')} aria-label="Auré, inicio"><span>AURÉ<span className="brand-dot">.</span></span><small>JOYERÍA & RELOJERÍA</small></Button>
      <nav className="desktop-nav" aria-label="Navegación principal"><Button variant="ghost" onClick={() => navigateTo('coleccion')}>Colección</Button>{categories.map(c => <Button key={c} variant="ghost" onClick={() => viewCategory(c)}>{c}</Button>)}<Button variant="ghost" onClick={() => navigateTo('esencia')}>Nuestra esencia</Button></nav>
      <div className="header-actions"><Button variant="ghost" className="contact-nav" onClick={() => { setBagOpen(true); }}><MessageCircle /> Consultanos</Button><Button variant="ghost" size="icon" aria-label={`Mi selección, ${selected.length} artículos`} onClick={() => setBagOpen(true)} className="bag-button"><ShoppingBag />{selected.length > 0 && <span className="bag-count">{selected.length}</span>}</Button></div>
    </header>
    {menuOpen && <nav className="mobile-nav" aria-label="Menú móvil"><Button variant="ghost" onClick={() => navigateTo('coleccion')}>Toda la colección</Button>{categories.map(c => <Button variant="ghost" key={c} onClick={() => { setMenuOpen(false); viewCategory(c); }}>{c}</Button>)}<Button variant="ghost" onClick={() => navigateTo('esencia')}>Nuestra esencia</Button></nav>}

    <main>
      <section id="inicio" className="hero">
        <img className="hero-image" src={hero} width={1536} height={1024} alt="Anillo de diamante, cadenita y aros de oro sobre piedra oscura" fetchPriority="high" />
        <div className="hero-shade" />
        <div className="hero-content"><span className="eyebrow">LA BELLEZA DE LO ATEMPORAL</span><h1>Auré<span>Una expresión<br />de <i>vos.</i></span></h1><p>Hay joyas que no solo se llevan.<br />Se sienten, se viven, se vuelven parte de tu historia.</p><Button className="hero-cta" size="lg" onClick={() => navigateTo('coleccion')}>Descubrí la colección <ArrowUpRight /></Button><div className="hero-caption"><span className="fine-line" /> PIEZAS PARA MOMENTOS QUE IMPORTAN</div></div>
        <div className="hero-bottom"><span>ORO · DIAMANTES · PERLAS</span><Button variant="ghost" onClick={() => navigateTo('coleccion')} aria-label="Bajar a la colección"><ChevronDown /></Button><span>COLECCIÓN ESENCIAL</span></div>
      </section>

      <section className="category-section content-width" aria-label="Categorías">
        <div className="section-intro"><span className="eyebrow">TRES FORMAS DE BRILLAR</span><h2>Encontrá tu <i>esencial.</i></h2><p>Pequeños detalles. Una presencia inolvidable.</p></div>
        <div className="category-grid">{categories.map((c, index) => <Button key={c} variant="ghost" className="category-tile" onClick={() => viewCategory(c)}><img src={images[c][index === 0 ? 0 : index === 1 ? 2 : 0]} alt={`Colección de ${c.toLowerCase()}`} loading="lazy" width={384} height={640}/><div><span>0{index + 1} / COLECCIÓN</span><h3>{c}</h3><ArrowUpRight /></div></Button>)}</div>
      </section>

      <section id="coleccion" className="catalog-section">
        <div className="content-width">
          <div className="catalog-heading"><div><span className="eyebrow">SELECCIONADAS PARA VOS</span><h2>Nuestra <i>colección.</i></h2></div><p>El lujo está en los detalles.</p></div>
          <div className="catalog-toolbar"><div className="category-tabs" role="group" aria-label="Filtrar categoría">{(['Todas', ...categories] as const).map(c => <Button key={c} variant="ghost" aria-pressed={category === c} className={category === c ? 'filter-active' : ''} onClick={() => setCategory(c)}>{c}</Button>)}</div><div className="currency-control" role="group" aria-label="Moneda"><Button variant="ghost" aria-pressed={currency === 'ARS'} className={currency === 'ARS' ? 'currency-active' : ''} onClick={() => setCurrency('ARS')}>ARS</Button><span>/</span><Button variant="ghost" aria-pressed={currency === 'USD'} className={currency === 'USD' ? 'currency-active' : ''} onClick={() => setCurrency('USD')}>USD</Button></div></div>
          <div className="catalog-meta"><span>{filtered.length} piezas</span><div className="catalog-tools"><label className="search-field"><Search size={15}/><input aria-label="Buscar joya" placeholder="Buscar una joya" value={query} onChange={e => setQuery(e.target.value)}/></label><select aria-label="Ordenar artículos" value={sort} onChange={e => setSort(e.target.value)}><option value="selection">Nuestra selección</option><option value="low">Menor precio</option><option value="high">Mayor precio</option></select></div></div>
          <div className="product-grid">{filtered.map(p => <article className="product-card" key={p.id}><div className="product-photo">{p.featured && <span className="product-label">ESENCIAL</span>}<Button variant="ghost" size="icon" className={`favorite-button ${selected.includes(p.id) ? 'is-selected' : ''}`} onClick={() => toggle(p)} aria-label={`${selected.includes(p.id) ? 'Quitar' : 'Guardar'} ${p.name}`} aria-pressed={selected.includes(p.id)}><Heart fill={selected.includes(p.id) ? 'currentColor' : 'none'} /></Button><Button variant="ghost" className="product-image-button" onClick={() => setDetail(p)} aria-label={`Ver ${p.name}`}><img src={imageFor(p)} alt={`${p.name}, ${p.material}`} loading="lazy" width={384} height={640}/><span className="view-detail">Ver pieza <ArrowUpRight size={16}/></span></Button></div><div className="product-info"><span className="product-material">{p.material}</span><Button variant="ghost" onClick={() => setDetail(p)} className="product-name">{p.name}</Button><div className="product-prices"><strong>{formatPrice(p, currency)}</strong><span>{formatPrice(p, currency === 'ARS' ? 'USD' : 'ARS')}</span></div><Button variant="ghost" className="product-consult" onClick={() => setDetail(p)}>Conocé esta pieza <ArrowUpRight /></Button></div></article>)}</div>
          {filtered.length === 0 && <div className="empty-state"><Diamond/><h3>No encontramos esa joya</h3><Button variant="outline" onClick={() => { setQuery(''); setCategory('Todas'); }}>Ver toda la colección</Button></div>}
          <p className="demo-note">Catálogo de muestra · Artículos, materiales y precios ficticios en ARS y USD. No constituye una oferta de venta.</p>
        </div>
      </section>

      <section id="esencia" className="essence-section content-width"><span className="eyebrow">EL UNIVERSO AURÉ</span><Diamond className="essence-diamond" strokeWidth={1}/><h2>Lo extraordinario<br />está en lo <i>simple.</i></h2><p>Creemos en la belleza que trasciende las tendencias.<br className="desktop-break"/> En las piezas que elegís por lo que te hacen sentir.<br className="desktop-break"/> Y en los detalles que se convierten en recuerdos.</p><span className="essence-signature">Auré.</span></section>
      <section className="consultation-band"><div className="content-width"><div><span className="eyebrow">TU PRÓXIMA JOYA, TU ELECCIÓN</span><h2>¿Una pieza te <i>enamoró?</i></h2><p>Elegí tus favoritas y prepará tu consulta.</p></div><Button size="lg" onClick={() => setBagOpen(true)}><MessageCircle/> Mi selección <ArrowUpRight /></Button></div></section>
    </main>
    <footer className="footer content-width"><div className="footer-brand"><span>AURÉ<span className="brand-dot">.</span></span><small>JOYERÍA & RELOJERÍA</small></div><p>La belleza de lo atemporal.</p><span>Una marca ficticia. Una inspiración real.</span><div className="footer-bottom"><span>© {new Date().getFullYear()} Auré · Sitio de demostración</span><span>Diseñado por Gestores Asociados <ArrowUpRight size={12}/></span></div></footer>

    <Dialog open={detail !== null} onOpenChange={open => { if (!open) setDetail(null); }}><DialogContent className="detail-dialog">{detail && <><div className="detail-image"><img src={imageFor(detail)} alt={detail.name} width={384} height={640}/></div><div className="detail-copy"><span className="eyebrow">{detail.category} / {detail.id}</span><DialogTitle className="detail-title">{detail.name}</DialogTitle><span className="product-material">{detail.material}</span><DialogDescription className="detail-description">{detail.description}</DialogDescription><div className="detail-prices"><strong>{formatPrice(detail, currency)}</strong><span>{formatPrice(detail, currency === 'ARS' ? 'USD' : 'ARS')}</span></div><Button size="lg" className="w-full" onClick={() => toggle(detail)}>{selected.includes(detail.id) ? <Check /> : <Heart />}{selected.includes(detail.id) ? 'En tu selección · Quitar' : 'Agregar a mi selección'}</Button><Button variant="outline" className="w-full" onClick={() => { if (!selected.includes(detail.id)) setSelected(prev => [...prev, detail.id]); setDetail(null); setBagOpen(true); }}><MessageCircle/> Preparar consulta</Button><p className="detail-disclaimer">Pieza y precios de muestra. Sin venta online.</p></div></>}</DialogContent></Dialog>
    <Dialog open={bagOpen} onOpenChange={setBagOpen}><DialogContent className="selection-dialog"><span className="eyebrow">TUS PIEZAS FAVORITAS</span><DialogTitle className="selection-title">Mi selección <span>({selection.length})</span></DialogTitle><DialogDescription>Marca ficticia: no hay un WhatsApp comercial conectado. Podés copiar la consulta o compartirla con un contacto.</DialogDescription><div className="selection-list">{selection.length === 0 ? <div className="empty-selection"><Heart strokeWidth={1}/><p>Todavía no elegiste tu próxima joya.</p><Button variant="outline" onClick={() => { setBagOpen(false); navigateTo('coleccion'); }}>Explorar la colección <ArrowRight /></Button></div> : selection.map(p => <div className="selection-item" key={p.id}><img src={imageFor(p)} alt={p.name} width={60} height={80}/><div><h3>{p.name}</h3><span>{formatPrice(p, 'ARS')} · {formatPrice(p, 'USD')}</span></div><Button variant="ghost" size="icon" aria-label={`Quitar ${p.name} de la selección`} onClick={() => toggle(p)}><X /></Button></div>)}</div>{selection.length > 0 && <><Button onClick={async () => { try { await navigator.clipboard.writeText(inquiryText(selection)); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch { setCopied(false); } }}>{copied ? <Check/> : <MessageCircle/>}{copied ? 'Consulta copiada' : 'Copiar consulta'}</Button><Button variant="outline" asChild><a href={`https://wa.me/?text=${encodeURIComponent(inquiryText(selection))}`} target="_blank" rel="noopener noreferrer"><MessageCircle/> Compartir por WhatsApp <ArrowUpRight/></a></Button></>}</DialogContent></Dialog>
  </div>;
}
