/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection.tsx';
import { MarqueeSection } from './components/MarqueeSection.tsx';
import { ShopSection, ProductItem } from './components/ShopSection.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { TestimonialsSection } from './components/TestimonialsSection.tsx';
import { ProjectsSection } from './components/ProjectsSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ContactModal } from './components/ContactModal.tsx';
import { ProjectModal } from './components/ProjectModal.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { ProjectData } from './components/ProjectCard.tsx';
import { CartProvider } from './context/CartContext.tsx';

function MainStoreContent() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="min-h-screen bg-background text-[#1A1918] font-sans-clean selection:bg-obsidian-soft selection:text-alabaster"
      style={{ overflowX: 'clip' }}
    >
      {/* 1. HERO DROP SECTION */}
      <HeroSection
        onContactClick={() => setIsContactOpen(true)}
        onNavigate={handleNavigate}
        onQuickView={(product) => setSelectedProduct(product)}
      />

      {/* 2. DYNAMIC MARQUEE & RUNWAY TICKER */}
      <MarqueeSection />

      {/* 3. READY-TO-WEAR SHOP / PRODUCT CATALOG */}
      <ShopSection
        onQuickView={(product) => setSelectedProduct(product)}
      />

      {/* 4. CRAFT & ENGINEERING STANDARDS (LE SAVOIR-FAIRE STICKY 01) */}
      <ServicesSection />

      {/* 5. LE CERCLE PRIVÉ (STAGGER CARDS AVEC GLISSEMENT 2 DOIGTS) */}
      <TestimonialsSection />

      {/* 6. CAPSULE COLLECTIONS (STACKING CARDS) */}
      <ProjectsSection
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* 7. FOOTER & THE SYNDICATE */}
      <Footer onContactClick={() => setIsContactOpen(true)} />

      {/* MODALS & DRAWERS */}
      <CartDrawer />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onContactClick={() => setIsContactOpen(true)}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainStoreContent />
    </CartProvider>
  );
}
