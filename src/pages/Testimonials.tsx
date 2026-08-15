import React from 'react';
import { motion } from 'framer-motion';
import { about } from '@/content/data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const AVATAR_GRADIENTS = ['linear-gradient(135deg,#0077FF,#00F0FF)', 'linear-gradient(135deg,#00F0FF,#0077FF)'];

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      id="testimonials"
      className="border-y border-[rgba(255,255,255,0.08)] bg-[#070A14]/50"
    >
      <div className="mx-auto grid max-w-[1200px] gap-6 px-6 py-16 md:grid-cols-2 md:px-8 md:py-20">
        {about.testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.author}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, ease: EASE }}
            className="rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[#0A0E1A] p-6 md:p-8"
          >
            <div className="text-[18px] leading-[1.6] tracking-tight italic">
              “{testimonial.quote}”
            </div>
            <div className="mt-6 flex items-center gap-3">
              <div
                className="h-8 w-8 rounded-full"
                style={{ background: AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length] }}
              />
              <div>
                <div className="text-[13px] font-medium">{testimonial.author}</div>
                <div className="text-[11px] tracking-wide text-[#94A3B8]">
                  {testimonial.role}
                  {testimonial.project ? ` — ${testimonial.project}` : ''}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
