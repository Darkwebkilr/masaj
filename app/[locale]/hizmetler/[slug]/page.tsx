"use client";

import { services } from "@/data/services";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import { Phone, MessageCircle, ArrowLeft, CheckCircle2, Clock, Banknote, Globe, Menu, Camera, Sparkles, X, ChevronDown } from "lucide-react";
import { useState, use } from "react";

export default function ServicePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = use(params);
  const t = useTranslations();
  const service = services.find((s) => s.slug === slug);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  if (!service) {
    notFound();
  }

  const menuItems = [
    { name: t('Common.services'), href: `/${locale}/hizmetler` },
    { name: t('Common.about'), href: `/${locale}#hakkımda` },
    { name: t('Common.contact'), href: `/${locale}#iletişim` },
  ];

  const languages = [
    { code: 'tr', name: 'Türkçe' },
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ru', name: 'Русский' },
    { code: 'ar', name: 'العربية' },
  ];

  return (
    <div className="flex min-h-screen flex-col selection:bg-accent/30 relative">
      <div className="mesh-bg" />
      <div className="noise-overlay" />
      
      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[200] bg-primary/95 backdrop-blur-xl transition-all duration-500 md:hidden ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-white p-2">
          <X size={32} />
        </button>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="serif-font text-4xl text-white font-light hover:text-accent transition-colors">
              {item.name}
            </Link>
          ))}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {languages.map((lang) => (
              <Link key={lang.code} href={`/${lang.code}/hizmetler/${slug}`} className={`px-4 py-2 rounded-full border ${locale === lang.code ? 'bg-accent border-accent text-white' : 'border-white/20 text-white/60'}`}>
                {lang.code.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className={`fixed bottom-8 ${locale === 'ar' ? 'left-8' : 'right-8'} z-[100] flex flex-col gap-4 items-end`}>
        <a href="tel:+905077158727" className="flex h-14 items-center gap-3 rounded-full bg-primary px-6 text-white shadow-2xl transition-all hover:scale-105 border border-white/10">
          <Phone size={20} />
          <span className="font-semibold text-sm">{t('Common.call_now')}</span>
        </a>
        <a href="https://wa.me/905077158727?text=Merhaba%2C%20masaj%20hizmetleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" className="animate-pulse-soft flex h-16 items-center gap-3 rounded-full bg-[#25D366] px-8 text-white shadow-2xl transition-all hover:scale-105 border border-white/10">
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
          
          <div className="hidden space-x-10 md:flex items-center">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.href} className="sans-font text-sm font-medium text-primary/70 hover:text-primary transition-colors tracking-wide">
                {item.name}
              </Link>
            ))}
            
            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 text-sm font-bold text-primary/60 hover:text-primary uppercase"
              >
                <Globe size={16} /> {locale} <ChevronDown size={14} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-4 w-40 glass-light rounded-3xl shadow-2xl border border-white/40 py-4 z-[300] overflow-hidden">
                  {languages.map((lang) => (
                    <Link 
                      key={lang.code} 
                      href={`/${lang.code}/hizmetler/${slug}`} 
                      onClick={() => setIsLangOpen(false)}
                      className={`block px-6 py-2 text-sm hover:bg-accent/10 transition-colors ${locale === lang.code ? 'text-accent font-bold' : 'text-primary/60'}`}
                    >
                      {lang.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-primary p-2">
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
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
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
                        <div className="text-[10px] uppercase tracking-widest text-muted font-bold mb-1">{t('Common.duration')}</div>
                        <div className="serif-font text-xl font-bold text-primary">
                            {service.duration.replace('Dakika', locale === 'tr' ? 'Dakika' : (locale === 'ar' ? 'دقيقة' : 'Min'))}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-6 rounded-3xl bg-white/50 border border-primary/5 shadow-sm">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <Banknote size={24} />
                    </div>
                    <div>
                        <div className="text-[10px] uppercase tracking-widest text-muted font-bold mb-1">{t('Common.price')}</div>
                        <div className="serif-font text-xl font-bold text-primary">
                            {locale === 'tr' ? service.price : service.price.replace('₺', '$')}
                        </div>
                    </div>
                </div>
              </div>

              <div className="space-y-6 mb-12 w-full">
                <h3 className="serif-font text-2xl font-semibold text-primary">{locale === 'tr' ? 'Faydaları' : (locale === 'ar' ? 'الفوائد' : 'Benefits')}</h3>
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
                  href="https://wa.me/905077158727?text=Merhaba%2C%20masaj%20hizmetleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex h-20 items-center justify-center gap-3 rounded-full bg-primary text-white text-lg font-bold transition-all hover:scale-105 shadow-xl"
                >
                  <MessageCircle size={24} />
                  {t('CTA.whatsapp_cta')}
                </a>
                <a 
                  href="tel:+905077158727" 
                  className="flex-1 flex h-20 items-center justify-center gap-3 rounded-full border-2 border-primary/20 bg-white text-primary text-lg font-bold transition-all hover:scale-105"
                >
                  <Phone size={24} />
                  {t('Common.call_now')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-primary/5 px-6 pt-12 pb-48 md:px-12 bg-primary/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
          <Link href={`/${locale}`} className="serif-font text-xl font-semibold tracking-tighter text-primary">
            NİLGÜN <span className="font-light text-accent">MASAJ</span>
          </Link>
          <div className="flex flex-col items-center md:items-end gap-2">
             <div className="flex gap-6 text-muted mb-2">
                <a href="tel:+905077158727" className="hover:text-primary transition-colors"><Phone size={20} /></a>
                <a href="https://wa.me/905077158727?text=Merhaba%2C%20masaj%20hizmetleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><MessageCircle size={20} /></a>
             </div>
             <div className="sans-font text-sm text-muted/60 flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full">
                <Globe size={12} className="text-accent" />
                {t('Common.all_turkiye')}
             </div>
          </div>
          <div className="sans-font text-sm text-muted/60 text-center md:text-left">
            © 2026 Nilgün Masaj Art Therapy. <br />
            <span className="text-[10px] uppercase tracking-widest opacity-50">All Rights Reserved.</span>
            <div className="mt-4 text-[11px] font-medium tracking-wider text-accent/60">
              Bu site <span className="text-accent">Evolution Ajans</span> tarafından yapılmıştır.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
