import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { about, values, coreSkills } from '@/content/data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const AboutSection: React.FC = () => {
  const [reduced, setReduced] = useState(false);

  React.useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <section id="about" className="border-t border-[rgba(255,255,255,0.08)] bg-[#070A14]/60">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-20 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:px-8 md:py-28">
        {/* Portrait */}
        <Reveal>
          <motion.div
            whileHover={reduced ? {} : { rotateY: 4, rotateX: 2 }}
            style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
            className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0A0E1A] p-6"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] border border-[rgba(255,255,255,0.08)]">
              <motion.img
                src={about.portrait}
                alt="Jerry Adewole — Software Engineer"
                className="h-full w-full object-cover object-top"
                initial={reduced ? false : { scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(2,4,10,0.75))]" />
              <div className="absolute bottom-0 p-4">
                <div className="text-[13px] italic leading-[1.5] text-white/90">
                  “{about.pullQuote}”
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal>
            <div className="text-[11px] tracking-[0.2em] text-[#94A3B8]">ABOUT — ENGINEERING CRAFT</div>
            <h2 className="font-display mt-3 text-[30px] font-semibold leading-[0.95] tracking-tight md:text-[40px]">
              Design systems that ship. <br />
              Backends that scale. Code that holds.
            </h2>
            <p className="mt-5 max-w-[58ch] text-[15px] leading-[1.8] text-[#94A3B8]">
              {about.paragraphs[0]}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={reduced ? false : { y: 20, opacity: 0 }}
                  whileInView={reduced ? {} : { y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-[14px] border border-[rgba(255,255,255,0.08)] bg-white/[0.02] p-4"
                >
                  <div className="font-display text-[14px] font-semibold">{value.title}</div>
                  <div className="mt-1.5 text-[13px] leading-[1.5] text-[#94A3B8]">
                    {value.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10">
              <div className="text-[11px] tracking-[0.2em] text-[#94A3B8]">CORE SKILLS</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {coreSkills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={reduced ? {} : { y: -2, scale: 1.03 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="cursor-default rounded-full bg-[#F8FAFC] px-3 py-1.5 text-[12px] font-medium text-[#02040A]"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
