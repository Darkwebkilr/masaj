"use client";

import { useState } from "react";
import { Sparkles, Flower2, Wind, Heart, Phone, MapPin, Camera, Menu, Globe, MessageCircle, ArrowRight, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import { services } from "@/data/services";

export default function Home() {
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
              <Link key={lang.code} href={`/${lang.code}`} className={`px-4 py-2 rounded-full border ${locale === lang.code ? 'bg-accent border-accent text-white' : 'border-white/20 text-white/60'}`}>
                {lang.code.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Floating Action Buttons */}
      <div className={`fixed bottom-8 ${locale === 'ar' ? 'left-8' : 'right-8'} z-[100] flex flex-col gap-4 items-end animate-fade-in-right delay-1000`}>
        <a href="tel:+905077158727" className="flex h-14 items-center gap-3 rounded-full bg-primary px-6 text-white shadow-2xl transition-all hover:scale-105 group border border-white/10">
          <Phone size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="font-semibold text-sm whitespace-nowrap">{t('Common.call_now')}</span>
        </a>
        <a href="https://wa.me/905077158727?text=Merhaba%2C%20masaj%20hizmetleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" className="animate-pulse-soft flex h-16 items-center gap-3 rounded-full bg-[#25D366] px-8 text-white shadow-2xl transition-all hover:scale-105 group border border-white/10">
          <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
          <span className="font-bold text-base whitespace-nowrap tracking-wide uppercase">WHATSAPP</span>
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
              <Link key={item.name} href={item.href} className="sans-font text-sm font-medium tracking-wide text-primary/70 transition-colors hover:text-primary relative group">
                {item.name}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all group-hover:w-full" />
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
                      href={`/${lang.code}`} 
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

      <main>
        {/* Hero Section */}
        <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-32 pb-20 md:pt-40 overflow-hidden">
          <div className="mx-auto max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center">
            <div className={`flex flex-col items-start ${locale === 'ar' ? 'text-right' : 'text-left'} z-10`}>
              <div className="animate-fade-in-up mb-8 flex items-center gap-2 rounded-full border border-primary/20 bg-white/40 px-5 py-2 backdrop-blur-sm shadow-sm">
                <Globe size={16} className="text-accent animate-spin-slow" />
                <span className="sans-font text-[11px] font-bold uppercase tracking-[0.25em] text-primary/60">
                  {t('Hero.badge')}
                </span>
              </div>
              <h1 className="animate-fade-in-up delay-200 serif-font text-6xl font-medium leading-[1.05] text-primary md:text-9xl">
                {t('Hero.title_part1')} <br />
                <span className="italic font-light text-accent">{t('Hero.title_part2')}</span>
              </h1>
              <p className="animate-fade-in-up delay-300 sans-font mt-10 max-w-lg text-lg leading-relaxed text-muted md:text-2xl font-light">
                {t('Hero.desc')}
              </p>
              <div className="animate-fade-in-up delay-400 mt-14 flex flex-col gap-5 sm:flex-row w-full sm:w-auto">
                <a href="https://wa.me/905077158727?text=Merhaba%2C%20masaj%20hizmetleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." className="group relative flex h-16 items-center justify-center gap-3 rounded-full bg-primary px-10 text-white transition-all hover:bg-primary-light hover:scale-105 shadow-2xl">
                  <Phone size={20} />
                  <span className="font-semibold text-xl italic serif-font">{t('Hero.cta_primary')}</span>
                </a>
                <Link href={`/${locale}/hizmetler`} className="flex h-16 items-center justify-center gap-2 rounded-full border border-primary/10 bg-white/20 px-10 text-primary backdrop-blur-md transition-all hover:bg-white/40 hover:scale-105">
                  {t('Hero.cta_secondary')}
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/5] md:aspect-square w-full animate-scale-in delay-500">
              <div className="absolute inset-0 bg-accent/30 rounded-[80px] md:rounded-[120px] rotate-6 -z-10 blur-3xl opacity-40 animate-pulse" />
              <div className="relative h-full w-full overflow-hidden rounded-[80px] md:rounded-[120px] border-[12px] border-white/60 shadow-[0_50px_100px_-20px_rgba(45,62,51,0.4)] animate-float">
                <Image src="/hero.jpg" alt="Nilgün Masaj" fill className="object-cover transition-transform duration-[8s] hover:scale-110" priority />
              </div>
              <div className={`animate-fade-in-right delay-700 absolute -top-6 ${locale === 'ar' ? '-left-6 md:-left-10' : '-right-6 md:-right-10'} glass-light p-6 md:p-8 rounded-[40px] shadow-2xl border border-white/40 flex items-center gap-5 z-20`}>
                <div className="h-12 w-12 md:h-16 md:w-16 rounded-3xl bg-primary text-white flex items-center justify-center shadow-lg">
                    <Sparkles size={28} />
                </div>
                <div className={locale === 'ar' ? 'text-right' : 'text-left'}>
                    <div className="serif-font text-xl md:text-2xl font-bold text-primary italic leading-none mb-1">{t('Hero.floating_title')}</div>
                    <div className="sans-font text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-accent font-bold">{t('Hero.floating_desc')}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in delay-1000 flex flex-col items-center gap-4 text-primary/30">
            <span className="sans-font text-[10px] uppercase tracking-[0.5em]">{t('Hero.scroll_hint')}</span>
            <div className="h-10 w-6 rounded-full border-2 border-primary/30 flex justify-center p-1">
                <div className="w-1 h-2 bg-primary/30 rounded-full animate-scroll" />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="hizmetler" className="px-6 py-24 bg-primary/5 backdrop-blur-xl md:px-12 md:py-40">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mb-24 text-center">
              <span className="animate-fade-in sans-font text-xs font-bold uppercase tracking-[0.4em] text-accent mb-6 block mx-auto">{t('Services.subtitle')}</span>
              <h2 className="animate-fade-in-up serif-font text-5xl font-medium text-primary md:text-8xl text-center">{t('Services.title')}</h2>
              <div className="mx-auto mt-8 h-[2px] w-32 bg-accent/20 rounded-full" />
            </div>
            
            <div className="grid gap-16 md:grid-cols-3">
              {services.map((service, i) => (
                <Link key={i} href={`/${locale}/hizmetler/${service.slug}`} className={`group relative overflow-hidden rounded-[3rem] bg-white/80 backdrop-blur-sm transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_-15px_rgba(45,62,51,0.2)] animate-fade-in-up border border-white/20 ${service.delay}`}>
                  <div className="relative h-[30rem] w-full overflow-hidden hover-zoom">
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover" 
                      quality={75}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute bottom-10 left-10 right-10 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                        <div className="w-full flex h-14 items-center justify-center rounded-full bg-white text-primary font-bold shadow-2xl">{t('Common.explore')}</div>
                    </div>
                  </div>
                  <div className={`p-10 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="serif-font text-3xl font-semibold text-primary">{t(`Services.${service.slug.split('-')[0]}.title`)}</h3>
                        <span className="serif-font text-2xl text-accent italic">{service.price}</span>
                    </div>
                    <p className="sans-font mb-10 text-lg leading-relaxed text-muted font-light line-clamp-2">{t(`Services.${service.slug.split('-')[0]}.short_desc`)}</p>
                    <div className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-primary group-hover:text-accent transition-colors">
                        {t('Common.details')} <ArrowRight size={18} className={`${locale === 'ar' ? 'rotate-180 group-hover:-translate-x-2' : 'group-hover:translate-x-2'} transition-transform`} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-20 animate-fade-in-up">
                <Link href={`/${locale}/hizmetler`} className="inline-flex h-16 items-center justify-center gap-3 rounded-full border border-primary text-primary px-12 font-bold hover:bg-primary hover:text-white transition-all shadow-lg">
                    {t('Common.see_all_services')}
                </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="hakkımda" className="px-6 py-24 md:px-12 md:py-40 overflow-hidden bg-white/20">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-24 md:grid-cols-2">
              <div className="relative animate-fade-in-left">
                <div className="absolute -inset-10 bg-accent/20 rounded-full blur-3xl -z-10 animate-pulse" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[60px] shadow-2xl border-[15px] border-white/40 hover-zoom">
                    <Image 
                      src="/hakkımızda.jpg" 
                      alt="Nilgün Masaj" 
                      fill 
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover" 
                      quality={80}
                    />
                </div>
                <div className={`absolute top-10 ${locale === 'ar' ? '-left-10' : '-right-10'} bg-primary text-white p-8 rounded-[40px] shadow-2xl animate-float`}>
                    <div className="serif-font text-5xl font-bold mb-1">{t('About.experience').split(' ')[0]}</div>
                    <div className="sans-font text-[10px] uppercase tracking-widest font-bold opacity-70">{t('About.experience').split(' ').slice(1).join(' ')}</div>
                </div>
              </div>
              <div className={locale === 'ar' ? 'text-right' : 'text-left'}>
                <span className="sans-font text-xs font-bold uppercase tracking-[0.5em] text-accent mb-8 block animate-fade-in">{t('About.subtitle')}</span>
                <h2 className="serif-font text-5xl font-medium leading-[1.1] text-primary md:text-8xl animate-fade-in-up delay-100">
                  {t('About.title_part1')} <br /> <span className="italic font-light text-accent">{t('About.title_part2')}</span>
                </h2>
                <div className="animate-fade-in-up delay-200 mt-12 space-y-8">
                    <p className="sans-font text-xl leading-relaxed text-muted font-light">{t('About.p1')}</p>
                    <p className="sans-font text-xl leading-relaxed text-muted font-light">{t('About.p2')}</p>
                </div>
                <div className="animate-fade-in-up delay-300 mt-16 grid grid-cols-2 gap-12 border-t border-primary/10 pt-12">
                  <div>
                    <div className="serif-font text-5xl font-medium text-primary">{t('About.stat1_value')}</div>
                    <div className="sans-font mt-3 text-xs text-muted uppercase tracking-[0.2em] font-bold">{t('About.stat1_label')}</div>
                  </div>
                  <div>
                    <div className="serif-font text-5xl font-medium text-primary">{t('About.stat2_value')}</div>
                    <div className="sans-font mt-3 text-xs text-muted uppercase tracking-[0.2em] font-bold">{t('About.stat2_label')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="iletişim" className="px-6 pb-32 pt-12 md:px-12">
          <div className="group mx-auto max-w-7xl overflow-hidden rounded-[80px] bg-primary px-8 py-24 text-center text-white relative shadow-2xl animate-fade-in-up">
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center animate-float"><Flower2 size={1000} strokeWidth={0.1} /></div>
            </div>
            <h2 className="serif-font relative z-10 text-5xl font-light italic md:text-8xl mb-12 animate-fade-in-up">{t('CTA.title')}</h2>
            <div className="relative z-10 flex flex-wrap justify-center gap-10 mb-16 animate-fade-in-up delay-200">
              <a href="tel:+905077158727" className="flex items-center gap-4 text-2xl font-light serif-font hover:text-accent transition-all hover:scale-105">
                <Phone size={24} className="text-accent" />
                <span>0507 715 87 27</span>
              </a>
              <div className="h-10 w-px bg-white/10 hidden md:block" />
              <div className="flex items-center gap-4 text-2xl font-light serif-font">
                <Globe size={24} className="text-accent" />
                <span>{t('Common.all_turkiye')}</span>
              </div>
            </div>
            <a href="https://wa.me/905077158727?text=Merhaba%2C%20masaj%20hizmetleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." className="relative z-10 inline-flex h-20 items-center justify-center rounded-full bg-white px-16 text-xl font-bold text-primary transition-all hover:scale-110 active:scale-95 shadow-xl hover:bg-accent hover:text-white group animate-fade-in-up delay-400">
              <MessageCircle size={28} className="mr-3 group-hover:rotate-12 transition-transform" />
              {t('CTA.whatsapp_cta')}
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-primary/5 px-6 pt-20 pb-48 md:px-12 bg-primary/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 md:flex-row">
          <Link href={`/${locale}`} className="serif-font text-3xl font-semibold tracking-tighter text-primary">
            NİLGÜN <span className="font-light text-accent">MASAJ</span>
          </Link>
          <div className="flex flex-col items-center md:items-end gap-4">
             <div className="flex gap-8 text-muted">
                <a href="tel:+905077158727" className="hover:text-primary transition-all hover:scale-125"><Phone size={24} /></a>
                <a href="https://wa.me/905077158727?text=Merhaba%2C%20masaj%20hizmetleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all hover:scale-125"><MessageCircle size={24} /></a>
             </div>
             <div className="sans-font text-sm text-muted/60 flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full">
                <Globe size={14} className="text-accent" />
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
