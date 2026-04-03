import { services } from "@/data/services";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from 'next-intl/server';
import { Phone, MessageCircle, ArrowLeft, CheckCircle2, Clock, Banknote, Globe, Menu, Camera, Sparkles } from "lucide-react";

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const t = await getTranslations();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const menuItems = [
    { name: t('Common.services'), href: `/${locale}/hizmetler` },
    { name: t('Common.about'), href: `/${locale}#hakkımda` },
    { name: t('Common.contact'), href: `/${locale}#iletişim` },
  ];

  return (
    <div className="flex min-h-screen flex-col selection:bg-accent/30 relative">
      <div className="mesh-bg" />
      <div className="noise-overlay" />
      
      {/* Floating Action Buttons */}
      <div className={`fixed bottom-8 ${locale === 'ar' ? 'left-8' : 'right-8'} z-[100] flex flex-col gap-4 items-end`}>
        <a href="tel:+905000000000" className="flex h-14 items-center gap-3 rounded-full bg-primary px-6 text-white shadow-2xl transition-all hover:scale-105 border border-white/10">
          <Phone size={20} />
          <span className="font-semibold text-sm">{t('Common.call_now')}</span>
        </a>
        <a href="https://wa.me/905000000000" className="animate-pulse-soft flex h-16 items-center gap-3 rounded-full bg-[#25D366] px-8 text-white shadow-2xl transition-all hover:scale-105 border border-white/10">
          <MessageCircle size={24} />
          <span className="font-bold text-base uppercase tracking-wide">WhatsApp</span>
        </a>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full px-6 py-6 md:px-12 animate-reveal-down">
        <div className="mx-auto flex max-w-7xl items-center justify-between glass-light px-8 py-4 rounded-full shadow-lg border border-white/40">
          <Link href={`/${locale}`} className="serif-font text-2xl font-semibold tracking-tighter text-primary">
            NİLGÜN <span className="font-light text-accent">MASAJ</span>
          </Link>
          <div className="hidden space-x-10 md:flex">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="sans-font text-sm font-medium text-primary/70 hover:text-primary transition-colors tracking-wide"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <button className="md:hidden text-primary p-2">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-24 md:pt-48 md:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <Link 
            href={`/${locale}/hizmetler`} 
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors mb-12 animate-fade-in"
          >
            <ArrowLeft size={16} className={locale === 'ar' ? 'rotate-180' : ''} /> {t('Common.back_to_services')}
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Image Section */}
            <div className="relative aspect-square md:aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl animate-fade-in-up border-8 border-white">
              <Image 
                src={service.image} 
                alt={service.title} 
                fill 
                className="object-cover"
              />
            </div>

            {/* Content Section */}
            <div className={`flex flex-col animate-fade-in-up delay-200 ${locale === 'ar' ? 'text-right items-end' : 'text-left items-start'}`}>
              <div className="mb-6 flex items-center gap-2 rounded-full border border-primary/10 bg-white/30 px-4 py-1.5 w-fit shadow-sm backdrop-blur-sm">
                <Sparkles size={14} className="text-accent" />
                <span className="sans-font text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">
                  {t('Hero.floating_desc')}
                </span>
              </div>
              
              <h1 className="serif-font text-5xl md:text-7xl font-medium text-primary mb-8 leading-tight">
                {locale === 'tr' ? service.title : t(`Services.${service.slug.split('-')[0]}.title`)}
              </h1>
              
              <p className="sans-font text-lg md:text-xl text-muted leading-relaxed font-light mb-12">
                {locale === 'tr' ? service.desc : t(`Services.${service.slug.split('-')[0]}.short_desc`)}
              </p>

              <div className="grid sm:grid-cols-2 gap-8 mb-12 w-full">
                <div className="flex items-center gap-4 p-6 rounded-3xl bg-white/50 border border-primary/5 shadow-sm">
                    <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                        <Clock size={24} />
                    </div>
                    <div>
                        <div className="text-[10px] uppercase tracking-widest text-muted font-bold mb-1">Süre</div>
                        <div className="serif-font text-xl font-bold text-primary">{service.duration}</div>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-6 rounded-3xl bg-white/50 border border-primary/5 shadow-sm">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <Banknote size={24} />
                    </div>
                    <div>
                        <div className="text-[10px] uppercase tracking-widest text-muted font-bold mb-1">Ücret</div>
                        <div className="serif-font text-xl font-bold text-primary">{service.price}</div>
                    </div>
                </div>
              </div>

              <div className="space-y-6 mb-12 w-full">
                <h3 className="serif-font text-2xl font-semibold text-primary">Faydaları</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, i) => (
                    <div key={i} className={`flex items-center gap-3 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <CheckCircle2 size={18} className="text-accent" />
                        <span className="sans-font text-muted font-light">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full">
                <a 
                  href="https://wa.me/905000000000" 
                  className="flex-1 flex h-16 items-center justify-center gap-3 rounded-full bg-primary text-white font-bold transition-all hover:scale-105 shadow-xl"
                >
                  <MessageCircle size={20} />
                  {t('CTA.whatsapp_cta')}
                </a>
                <a 
                  href="tel:+905000000000" 
                  className="flex-1 flex h-16 items-center justify-center gap-3 rounded-full border border-primary/20 bg-white text-primary font-bold transition-all hover:scale-105"
                >
                  <Phone size={20} />
                  {t('Common.call_now')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-primary/5 px-6 py-12 md:px-12 bg-primary/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
          <Link href={`/${locale}`} className="serif-font text-xl font-semibold tracking-tighter text-primary">
            NİLGÜN <span className="font-light text-accent">MASAJ</span>
          </Link>
          <div className="flex flex-col items-center md:items-end gap-2">
             <div className="flex gap-6 text-muted mb-2">
                <a href="#" className="hover:text-primary transition-colors"><Camera size={20} /></a>
                <a href="tel:+905000000000" className="hover:text-primary transition-colors"><Phone size={20} /></a>
                <a href="#" className="hover:text-primary transition-colors"><MessageCircle size={20} /></a>
             </div>
             <div className="sans-font text-sm text-muted/60 flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full">
                <Globe size={12} className="text-accent" />
                {t('Common.all_turkiye')}
             </div>
          </div>
          <div className="sans-font text-sm text-muted/60 text-center md:text-left">
            © 2026 Nilgün Masaj Art Therapy. <br />
            <span className="text-[10px] uppercase tracking-widest opacity-50">All Rights Reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
