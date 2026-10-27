import React from 'react';
import { FadeIn } from './FadeIn.tsx';
import { Sparkles } from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: '01',
    name: 'Laine Froide 140s & Cachemire Peigné',
    description:
      'Tissages prestigieux issus des plus grandes filatures piémontaises et japonaises. Étoffes soyeuses au tombé infroissable qui respirent et accompagnent chaque mouvement avec fluidité.',
  },
  {
    id: '02',
    name: 'Architecture d\'Épaule Sartoriale',
    description:
      'Construction semi-entoilée traditionnelle avec plastron de crin de cheval, têtes de manches montées main et revers façonné à la vapeur pour un maintien sculptural impeccable.',
  },
  {
    id: '03',
    name: 'Bijouterie Métallique & Chrome Miroir',
    description:
      'Boutons de manchette, agrafes de gilet et fermoirs étriers façonnés dans un alliage poli miroir qui apporte au costume le même éclat qu\'une montre d\'exception.',
  },
  {
    id: '04',
    name: 'Finitions Cousues Main à l\'Atelier',
    description:
      'Boutonnières milanaises gansées de fil de soie, doublures respirantes en cupro bemberg lustré et finitions intérieures aux surpiqûres sellier invisibles.',
  },
  {
    id: '05',
    name: 'Capsules Numérotées & Pièces Uniques',
    description:
      'Chaque vêtement possède son certificat d\'authenticité gravé au laser et son numéro de confection exclusif. Des éditions strictement limitées de 25 à 80 pièces.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="relative w-full bg-[#FFFFFF] text-[#141413] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-6 sm:px-10 lg:px-14 py-24 sm:py-32 z-0 border-t border-[#EAE5D9]"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Heading */}
        <FadeIn delay={0} y={30}>
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <div className="chrome-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.22em] text-[#5A554E] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#8C867C]" />
              <span>Savoir-Faire & Standards d'Excellence</span>
            </div>
            <h2
              className="font-serif-luxury font-light uppercase leading-none tracking-tight text-center text-[#141413]"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
            >
              Le Savoir-Faire
            </h2>
          </div>
        </FadeIn>

        {/* Services List */}
        <div className="w-full border-t border-[#EAE5D9]">
          {SERVICES.map((service, index) => (
            <FadeIn
              key={service.id}
              delay={index * 0.08}
              y={20}
              className="border-b border-[#EAE5D9] py-8 sm:py-10 md:py-12 group transition-colors duration-300 hover:bg-[#FAF9F5]/80 px-4 rounded-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-8 md:gap-12">
                {/* Number on left */}
                <div
                  className="font-serif-luxury font-light italic text-[#C5BDAA] leading-none shrink-0 w-20 sm:w-28 md:w-36 select-none group-hover:text-[#141413] transition-colors"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 90px)' }}
                >
                  {service.id}
                </div>

                {/* Name + Description on right */}
                <div className="flex-1 flex flex-col justify-center sm:pt-2">
                  <h3
                    className="font-serif-luxury font-normal text-[#141413] tracking-wide group-hover:translate-x-1 transition-transform duration-300"
                    style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.85rem)' }}
                  >
                    {service.name}
                  </h3>
                  <p
                    className="font-sans-clean font-light leading-relaxed max-w-2xl text-[#6B655C] mt-2 sm:mt-3 text-xs sm:text-[14px]"
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
