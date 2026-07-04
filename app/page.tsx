'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import ProjectModal from '../components/ProjectModal';
import type { Project } from '@/types/project';
import dynamic from 'next/dynamic';


import {
  Mail,
  ExternalLink,
  Code,
  Server,
  Wrench,
  MapPin,
  Briefcase,
  GraduationCap,
  Send,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Globe,
  Smartphone,
  Monitor,
  PhoneCall,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateFrontBadge, generateBackBadge } from '@/lib/badgeGenerator';

// Dynamically import Lanyard component (SSR disabled since it uses WebGL / canvas)
const Lanyard = dynamic(() => import('@/components/Lanyard'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center h-[500px] w-full rounded-2xl glass-card border border-white/5">
      <div className="relative flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"></div>
        <div className="absolute h-10 w-10 animate-ping rounded-full border border-violet-400 opacity-75"></div>
      </div>
      <p className="mt-4 text-sm text-zinc-400 font-mono animate-pulse">Memuat Kartu ID 3D...</p>
    </div>
  )
});

export default function Home() {
  const [frontImage, setFrontImage] = useState<string>('');
  const [backImage, setBackImage] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  // Selected project for modal detail view
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Contact Form State
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Generate the front and back badge design on mount using canvas generator
    generateFrontBadge('/pp.jpeg', 'M Farhan Abdillah', 'Web Developer')
      .then(url => setFrontImage(url));
    generateBackBadge()
      .then(url => setBackImage(url));

    // Handle scroll section highlight
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormState({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const projects = [
    {
      title: 'Antarsukha Web Apps',
      description: 'Antarsukha Web-Based System adalah aplikasi manajemen berbasis web yang mengintegrasikan operasional coffee shop dan barbershop dalam satu platform. Dibangun menggunakan Laravel dan MySQL, sistem ini dilengkapi dengan landing page untuk pelanggan serta dashboard admin untuk mengelola konten dan operasional bisnis secara efisien.',
      tech: ['Laravel', 'MySQL', 'Bootstrap'],
      github: 'https://github.com/FarhanABD/kasir-antarsukha',
      demo: 'https://antarsukha.id/ ',
      icon: <Monitor className="w-7 h-7 text-violet-400" />,
      featured: true,
      image: '/projects/angkringan.JPG'
    },
    {
      title: 'Kasir Angkringan Antarsukha',
      description: 'Kasir Angkringan Antarsukha adalah aplikasi kasir dan manajemen berbasis web yang dirancang untuk membantu operasional angkringan menjadi lebih efisien. Dibangun menggunakan Laravel dan MySQL, sistem ini menyediakan fitur pengelolaan menu, transaksi penjualan, stok, serta laporan sehingga memudahkan pemilik dalam mengelola bisnis sehari-hari.',
      tech: ['Laravel', 'MySQL', 'Flutter'],
      github: 'https://github.com/FarhanABD/kasir-antarsukha',
      demo: 'https://antarsukha.id/angkringan',
      icon: <Smartphone className="w-7 h-7 text-indigo-400" />,
      featured: true,
      image: '/projects/kasir.jpg'
    },
    {
      title: 'ERP PT Teknografi Tri Cawanaska',
      description: 'PT TTC ERP System adalah sistem Enterprise Resource Planning (ERP) berbasis web yang dikembangkan untuk mendukung operasional industri percetakan etiket rokok. Dibangun menggunakan Laravel dan MySQL, sistem ini mengintegrasikan berbagai proses bisnis seperti produksi, inventaris, pembelian, penjualan, dan pelaporan untuk meningkatkan efisiensi, akurasi data, serta pengambilan keputusan.',
      tech: ['Laravel', 'MySQL', 'HTML', 'CSS'],
      github: 'https://github.com/alexaaaaaass/management-pt-ttc',
      demo: '#',
      icon: <Monitor className="w-7 h-7 text-violet-400" />,
      featured: false,
      image: '/projects/ttc.JPG'
    },
    {
      title: 'Company Profile SDB 01 Bungur Jakarta',
      description: 'Web Company Profile SDN 01 Bungur Jakarta',
      tech: ['Laravel', 'MySQL', 'HTML', 'TailwindCSS'],
      github: '',
      demo: '#',
      icon: <Monitor className="w-7 h-7 text-violet-400" />,
      featured: false,
      image: '/projects/bungur.jpg'
    }
  ];

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: 'code',
      items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'HTML5 / CSS3', 'Redux / Zustand']
    },
    {
      title: 'Backend & Database',
      icon: 'server',
      items: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'Python', 'Laravel']
    },
    {
      title: 'Tools',
      icon: 'wrench',
      items: ['Git & GitHub', 'Docker', 'Postman', 'Figma', 'Vercel / Netlify', 'Trello']
    }
  ];

  return (

    <div className="min-h-screen text-zinc-100 selection:bg-violet-500/30 selection:text-violet-200">

      {/* 1. STICKY BLUR NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 group cursor-pointer"
            onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-violet-500/20 group-hover:rotate-6 transition-transform">
              F
            </div>
            <span className="font-mono text-xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              farhan<span className="text-violet-400">.dev</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-full border border-white/5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeSection === link.id
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
                    : 'text-zinc-400 hover:text-white'
                    }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 hover:from-violet-500 hover:to-indigo-500 transition-all"
            >
              Hubungi Saya
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 left-0 right-0 z-40 glass-nav border-b border-white/5 md:hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`py-3 text-left text-lg font-medium border-b border-white/5 transition-colors ${activeSection === link.id ? 'text-violet-400 font-semibold' : 'text-zinc-400'
                    }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-4 w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold text-center text-white"
              >
                Hubungi Saya
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. HERO SECTION */}
      <section id="home" className="relative min-h-screen pt-28 flex items-center justify-center overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-violet-600/10 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12">
          {/* Hero Left Content */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card w-fit mx-auto lg:mx-0 border border-violet-500/20 text-violet-300 text-xs font-semibold uppercase tracking-wider"
            >
              <Sparkles className="h-4.5 w-4.5 text-violet-400 animate-pulse" />
              Tersedia untuk Freelance & Kontrak
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
            >
              Halo, Saya <span className="text-gradient font-black">Farhan</span> <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl text-zinc-300 font-semibold">Web Developer</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Saya membangun aplikasi web modern yang cepat, aman, dan berpusat pada kenyamanan pengguna. Berpengalaman dalam ekosistem React, Next.js, Laravel dan  pengembangan backend modern.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-2"
            >
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3.5 rounded-full bg-violet-600 text-white font-semibold shadow-lg shadow-violet-600/30 hover:bg-violet-500 hover:shadow-violet-600/40 transition-all duration-300"
              >
                Hubungi Saya
              </button>
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3.5 rounded-full bg-zinc-900 border border-white/10 hover:border-white/20 text-white font-semibold transition-all duration-300"
              >
                Lihat Proyek
              </button>
            </motion.div>

            {/* Stats Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-8 mt-4 border-t border-white/5 max-w-md mx-auto lg:mx-0"
            >
              <div>
                <h4 className="text-3xl font-extrabold text-white">3+</h4>
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mt-1">Tahun Pengalaman</p>
              </div>
              <div>
                <h4 className="text-3xl font-extrabold text-white">15+</h4>
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mt-1">Proyek Selesai</p>
              </div>
              <div>
                <h4 className="text-3xl font-extrabold text-white">99%</h4>
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mt-1">Klien Puas</p>
              </div>
            </motion.div>
          </div>

          {/* Hero Right Content - Interactive Lanyard Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[450px] lg:min-h-[550px] w-full"
          >
            {/* Lanyard Background Circle Glow */}
            <div className="absolute w-[320px] sm:w-[400px] h-[320px] sm:h-[400px] rounded-full bg-violet-600/5 glow-purple border border-violet-500/10 flex items-center justify-center pointer-events-none">
              <div className="absolute w-[240px] sm:w-[300px] h-[240px] sm:h-[300px] rounded-full bg-indigo-600/5 border border-indigo-500">
              </div>
            </div>

            {/* Floating Instructions */}
            <div className="absolute top-2 text-center select-none pointer-events-none bg-zinc-950/80 px-4 py-1.5 rounded-full border border-white/5 text-xs text-zinc-400 backdrop-blur-sm z-10 font-mono flex items-center gap-1.5 animate-bounce">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              Tarik atau geser kartu ID untuk berinteraksi!
            </div>

            {/* The 3D Lanyard Card */}
            {frontImage && backImage ? (
              <div className="h-[480px] lg:h-[580px] w-full relative">
                <Lanyard
                  frontImage={frontImage}
                  backImage={backImage}
                  position={[0, 0, 20]}
                  gravity={[0, -25, 0]}
                  fov={22}
                  lanyardWidth={1.3}
                />
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center text-zinc-500">Generating badge textures...</div>
            )}
          </motion.div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="py-24 relative overflow-hidden bg-zinc-950/20">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest font-mono text-violet-400 font-semibold mb-2">Tentang Saya</h2>
            <h3 className="text-3xl sm:text-4xl font-bold">Mengenal Lebih Dekat</h3>
            <div className="w-12 h-1 bg-violet-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* About Avatar */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 opacity-30 blur-lg group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative h-[320px] w-[320px] sm:h-[380px] sm:w-[380px] rounded-2xl overflow-hidden glass-card p-3 border-white/10">
                  <img
                    src="/foto.jpg"
                    alt="M Farhan Abdillah"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* About Text Content */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-zinc-300">
              <h4 className="text-2xl font-bold text-white">Saya M Farhan Abdillah, seorang Web Developer</h4>
              <p className="leading-relaxed text-zinc-400">
                Memulai perjalanan coding sejak tahun 2021, saya berfokus pada pembuatan website modern menggunakan teknologi Javascript, TypeScript dan PHP. Saya memiliki antusiasme yang tinggi dalam memecahkan masalah logika yang rumit serta merancang antarmuka pengguna yang estetik dan intuitif.
              </p>
              <p className="leading-relaxed text-zinc-400">
                Bagi saya, menulis kode bukan sekadar memberikan instruksi kepada komputer, melainkan tentang membangun alat yang dapat memberikan solusi nyata atas kebutuhan bisnis dan mempermudah kehidupan manusia.
              </p>

              {/* Info Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 font-medium text-sm">
                <div className="flex items-center gap-3 py-2 px-4 rounded-xl bg-zinc-900/40 border border-white/5">
                  <MapPin className="h-5 w-5 text-violet-400 flex-shrink-0" />
                  <span>Sidoarjo, Indonesia</span>
                </div>
                <div className="flex items-center gap-3 py-2 px-4 rounded-xl bg-zinc-900/40 border border-white/5">
                  <Mail className="h-5 w-5 text-indigo-400 flex-shrink-0" />
                  <span>farhanabdilah204@gmail.com</span>
                </div>
              </div>

              {/* Education & Experience Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                <div>
                  <div className="flex items-center gap-2 text-white font-bold mb-4">
                    <Briefcase className="h-5 w-5 text-violet-400" />
                    <span>Pengalaman</span>
                  </div>
                  <div className="border-l-2 border-violet-500/20 pl-4 flex flex-col gap-4">
                    <div className="relative">
                      <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-violet-500 ring-4 ring-violet-500/20"></div>
                      <h5 className="font-semibold text-white text-sm">Staff IT & Programmer Creative Media Surabaya</h5>
                      <p className="text-xs text-zinc-500">2025 - Sekarang</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-violet-500 ring-4 ring-violet-500/20"></div>
                      <h5 className="font-semibold text-white text-sm">Freelance Developer</h5>
                      <p className="text-xs text-zinc-500">2023 - Selarang</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-white font-bold mb-4">
                    <GraduationCap className="h-5 w-5 text-indigo-400" />
                    <span>Pendidikan</span>
                  </div>
                  <div className="border-l-2 border-indigo-500/20 pl-4 flex flex-col gap-4">
                    <div className="relative">
                      <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20"></div>
                      <h5 className="font-semibold text-white text-sm">D4 Teknik Informatika</h5>
                      <p className="text-xs text-zinc-500">Politeknik Negeri Jember</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SKILLS SECTION */}
      <section id="skills" className="py-24 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest font-mono text-violet-400 font-semibold mb-2">Keahlian</h2>
            <h3 className="text-3xl sm:text-4xl font-bold">Tech Stack Utama</h3>
            <div className="w-12 h-1 bg-violet-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillCategories.map((cat, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl glass-card border border-white/5 flex flex-col gap-6"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <h4 className="font-bold text-lg text-white">{cat.title}</h4>
                  <div className="p-2 rounded-lg bg-zinc-900/80 border border-white/5">
                    {cat.icon}
                  </div>
                </div>
                <ul className="flex flex-col gap-3">
                  {cat.items.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-3.5 text-zinc-400 hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:bg-white/5">
                      <ChevronRight className="h-4 w-4 text-violet-400 flex-shrink-0" />
                      <span className="font-mono text-sm">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Bahasa Pemrograman Section */}
      <section id="languages" className="py-24 relative overflow-hidden bg-zinc-950/10">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest font-mono text-violet-400 font-semibold mb-2">Bahasa Pemrograman</h2>
            <h3 className="text-3xl sm:text-4xl font-bold">Saya Kuasai</h3>
            <div className="w-12 h-1 bg-violet-500 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="flex justify-center gap-8">
            <Image src="/PHP-logo.svg.webp" alt="PHP" width={64} height={64} className="object-contain" />
            <Image src="/python.png" alt="Python" width={64} height={64} className="object-contain" />
            <Image src="/js.png" alt="JavaScript" width={64} height={64} className="object-contain" />
            <Image src="/ts.png" alt="TypeScript" width={64} height={64} className="object-contain" />
            {/* Add more language logos here */}
          </div>
        </div>
      </section>

      {/* 5. PROJECTS SECTION */}
      <section id="projects" className="py-24 relative overflow-hidden bg-zinc-950/20">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest font-mono text-violet-400 font-semibold mb-2">Portfolio</h2>
            <h3 className="text-3xl sm:text-4xl font-bold">Proyek Unggulan</h3>
            <div className="w-12 h-1 bg-violet-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl glass-card border border-white/5 flex flex-col justify-between glass-card-hover cursor-pointer hover:shadow-lg transition-shadow ${proj.featured ? 'md:col-span-2 lg:col-span-1 shadow-lg shadow-violet-500/5 border-violet-500/20' : ''
                  }`}
                onClick={() => setSelectedProject(proj)}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/5">
                      {proj.icon}
                    </div>
                    {proj.featured && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 border border-violet-500/20 text-violet-300 font-mono">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h4 className="text-xl font-bold text-white mb-3 hover:text-violet-400 transition-colors cursor-pointer">
                    {proj.title}
                  </h4>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {proj.description}
                  </p>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {proj.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-900 text-zinc-400 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <a
                      href={proj.github}
                      className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                      Code Repository
                    </a>
                    <a
                      href={proj.demo}
                      className="flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      Live Demo
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Project Detail Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* 6. CONTACT SECTION */}
      <section id="contact" className="py-24 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-violet-600/5 blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest font-mono text-violet-400 font-semibold mb-2">Kontak</h2>
            <h3 className="text-3xl sm:text-4xl font-bold">Hubungi Saya</h3>
            <div className="w-12 h-1 bg-violet-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Contact Details */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="glass-card p-8 rounded-2xl border-white/5 flex flex-col gap-6">
                <h4 className="text-xl font-bold text-white">Mari Berkolaborasi!</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Apakah Anda memiliki ide proyek luar biasa, mencari developer freelance, atau hanya ingin menyapa? Hubungi saya kapan saja dan mari diskusikan ide Anda!
                </p>

                <div className="flex flex-col gap-4 mt-2">
                  <div className="flex items-center gap-4 py-2">
                    <div className="h-10 w-10 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 flex-shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider font-mono">Kirim Email</p>
                      <a href="mailto:admin@farhan.dev" className="text-sm font-semibold text-white hover:text-violet-400 transition-colors">
                        farhanabdilah204@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 py-2">
                    <div className="h-10 w-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider font-mono">Lokasi</p>
                      <p className="text-sm font-semibold text-white">Sidoarjo, Indonesia</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Connect */}
              <div className="glass-card p-6 rounded-2xl border-white/5 flex items-center justify-around">
                <a
                  href="#"
                  className="h-12 w-12 rounded-xl bg-zinc-900 border border-white/5 hover:border-violet-500/30 flex items-center justify-center text-zinc-400 hover:text-violet-400 hover:scale-105 transition-all duration-300 shadow-md shadow-zinc-950/40"
                  title="GitHub"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="h-12 w-12 rounded-xl bg-zinc-900 border border-white/5 hover:border-indigo-500/30 flex items-center justify-center text-zinc-400 hover:text-indigo-400 hover:scale-105 transition-all duration-300 shadow-md shadow-zinc-950/40"
                  title="LinkedIn"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="h-12 w-12 rounded-xl bg-zinc-900 border border-white/5 hover:border-violet-400/30 flex items-center justify-center text-zinc-400 hover:text-violet-300 hover:scale-105 transition-all duration-300 shadow-md shadow-zinc-950/40"
                  title="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="glass-card rounded-2xl border border-white/5 p-8 h-full flex flex-col justify-center">

                <h4 className="text-3xl font-bold text-white mb-3">
                  Mari Terhubung 👋
                </h4>

                <p className="text-zinc-400 leading-relaxed mb-8">
                  Saya terbuka untuk freelance, full-time, kolaborasi proyek,
                  maupun sekadar berdiskusi mengenai pengembangan website.
                  Jangan ragu menghubungi saya melalui WhatsApp atau Email.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">

                  <a
                    href="https://wa.me/6281353401336"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <button
                      type="button"
                      className="w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 font-semibold text-white shadow-lg shadow-green-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-green-500/40"
                    >
                      <PhoneCall size={20} />
                      Chat WhatsApp
                    </button>
                  </a>

                  {/* <a
                    href="mailto:farhanabdilah204@gmail.com?subject=Halo%20Farhan&body=Halo%20Farhan,%0A%0ASaya%20tertarik%20untuk%20berdiskusi%20mengenai%20proyek%20website.%0A"
                    className="flex-1"
                  >
                    <button
                      type="button"
                      className="w-full flex items-center justify-center gap-3 rounded-xl border border-violet-500/30 bg-zinc-900 px-6 py-4 font-semibold text-white transition-all duration-300 hover:border-violet-400 hover:bg-violet-500/10"
                    >
                      <Mail size={20} />
                      Kirim Email
                    </button>
                  </a> */}

                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">

                  <div className="rounded-xl border border-white/5 bg-zinc-900/60 p-4">
                    <p className="text-xs uppercase tracking-widest text-zinc-500">
                      WhatsApp
                    </p>
                    <p className="mt-1 font-semibold text-white">
                      +62 813-5340-1336
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-zinc-900/60 p-4">
                    <p className="text-xs uppercase tracking-widest text-zinc-500">
                      Email
                    </p>
                    <p className="mt-1 font-semibold text-white break-all">
                      farhanabdilah204@gmail.com
                    </p>
                  </div>

                </div>

              </div>
            </div>
            {/* Contact section finalised, form removed */}
          </div>
        </div>


      </section>
      <footer className="border-t border-white/5 bg-zinc-950 py-10" >
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} Farhan Abdillah. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
