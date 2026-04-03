"use client";

import { services } from "@/data/services";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import { Sparkles, Phone, MessageCircle, ArrowRight, Globe, Menu, Camera, Flower2, Clock, Banknote, X, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function ServicesPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

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
              <Link key={lang.code} href={`/${lang.code}/hizmetler`} className={`px-4 py-2 rounded-full border ${locale === lang.code ? 'bg-accent border-accent text-white' : 'border-white/20 text-white/60'}`}>
                {lang.code.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className={`fixed bottom-8 ${locale === 'ar' ? 'left-8' : 'right-8'} z-[100] flex flex-col gap-4 items-end animate-fade-in-right delay-1000`}>
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
      <nav className="fixed top-0 z-50 w-full px-6 py-8 md:px-12 animate-reveal-down">
        <div className="mx-auto flex max-w-7xl items-center justify-between glass-light px-8 py-4 rounded-full shadow-lg border border-white/40">
          <Link href={`/${locale}`} className="serif-font text-2xl font-semibold tracking-tighter text-primary">
            NİLGÜN <span className="font-light text-accent">MASAJ</span>
          </Link>
          
          <div className="hidden space-x-10 md:flex items-center">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.href} className={`sans-font text-sm font-medium tracking-wide transition-colors hover:text-primary relative group ${item.href.includes('hizmetler') ? 'text-primary' : 'text-primary/70'}`}>
                {item.name}
                {item.href.includes('hizmetler') && <span className="absolute -bottom-1 left-0 h-px w-full bg-accent" />}
                {!item.href.includes('hizmetler') && <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all group-hover:w-full" />}
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
                      href={`/${lang.code}/hizmetler`} 
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

      <main className="pt-40 pb-32 md:pt-56">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-24 animate-fade-in-up">
            <div className="mb-6 flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-white/40 px-5 py-2 w-fit mx-auto backdrop-blur-sm shadow-sm">
                <Sparkles size={16} className="text-accent" />
                <span className="sans-font text-[11px] font-bold uppercase tracking-[0.25em] text-primary/60">
                    {t('Services.subtitle')}
                </span>
            </div>
            <h1 className="serif-font text-6xl md:text-9xl font-medium text-primary leading-tight">
                {t('Services.title')}
            </h1>
          </div>

          <div className="space-y-32">
            {services.map((service, i) => (
              <div 
                key={i} 
                className={`flex flex-col gap-12 items-center animate-fade-in-up ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-[60px] overflow-hidden shadow-2xl border-[12px] border-white/40 group">
                    <Image 
                        src={service.image} 
                        alt={service.title} 
                        fill 
                        className="object-cover transition-transform duration-[5s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                </div>

                <div className={`w-full md:w-1/2 space-y-8 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                    <h2 className="serif-font text-4xl md:text-6xl font-medium text-primary">{t(`Services.${service.slug.split('-')[0]}.title`)}</h2>
                    <p className="sans-font text-xl text-muted leading-relaxed font-light">
                        {t(`Services.${service.slug.split('-')[0]}.short_desc`)}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6 pt-4">
                        <div className="flex items-center gap-4 p-5 rounded-3xl bg-white/40 border border-white/20 backdrop-blur-sm">
                            <Clock size={20} className="text-accent" />
                            <div>
                                <div className="text-[10px] uppercase tracking-widest text-muted font-bold">Süre</div>
                                <div className="serif-font text-lg font-bold text-primary">{service.duration}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-5 rounded-3xl bg-white/40 border border-white/20 backdrop-blur-sm">
                            <Banknote size={20} className="text-primary" />
                            <div>
                                <div className="text-[10px] uppercase tracking-widest text-muted font-bold">Ücret</div>
                                <div className="serif-font text-lg font-bold text-primary">{service.price}</div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 flex flex-wrap gap-4">
                        <Link 
                            href={`/${locale}/hizmetler/${service.slug}`}
                            className="flex h-16 items-center justify-center gap-3 rounded-full bg-primary px-10 text-white font-bold transition-all hover:scale-105 shadow-xl"
                        >
                            {t('Common.details')} <ArrowRight size={20} className={locale === 'ar' ? 'rotate-180' : ''} />
                        </Link>
                        <a 
                            href="https://wa.me/905000000000"
                            className="flex h-16 items-center justify-center gap-3 rounded-full border border-primary/20 bg-white/40 px-10 text-primary font-bold backdrop-blur-sm transition-all hover:bg-white/60 hover:scale-105"
                        >
                            <MessageCircle size={20} /> {t('Common.book_now')}
                        </a>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-primary/5 px-6 py-20 md:px-12 bg-primary/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 md:flex-row">
          <Link href={`/${locale}`} className="serif-font text-3xl font-semibold tracking-tighter text-primary">
            NİLGÜN <span className="font-light text-accent">MASAJ</span>
          </Link>
          <div className="flex flex-col items-center md:items-end gap-4">
             <div className="flex gap-8 text-muted">
                <a href="#" className="hover:text-primary transition-all hover:scale-125"><Camera size={24} /></a>
                <a href="tel:+905000000000" className="hover:text-primary transition-all hover:scale-125"><Phone size={24} /></a>
                <a href="#" className="hover:text-primary transition-all hover:scale-125"><MessageCircle size={24} /></a>
             </div>
             <div className="sans-font text-sm text-muted/60 flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full">
                <Globe size={14} className="text-accent" />
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
