"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { faqs, brand } from "@/config/brand";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CTAButton } from "@/components/shared/CTAButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { MessageCircle } from "lucide-react";

export function FAQ() {
  return (
    <AnimatedSection
      id="faq"
      className="section-padding"
    >
      <div className="container-wide lg:pl-64">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left column - Header */}
          <motion.div
            className="lg:col-span-1"
            variants={fadeInUp}
          >
            <div className="sticky top-32">
              <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-muted-foreground mb-6">
                FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Questions <span className="text-gradient">fréquentes</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Vous avez d&apos;autres questions ? N&apos;hésitez pas à nous
                contacter directement.
              </p>
              <CTAButton
                variant="secondary"
                icon={<MessageCircle className="h-4 w-4" />}
                href={`mailto:${brand.contactEmail}`}
              >
                Poser une question
              </CTAButton>
            </div>
          </motion.div>

          {/* Right column - Accordion */}
          <motion.div
            className="lg:col-span-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={staggerItem}>
                  <AccordionItem
                    value={`item-${index}`}
                    className={cn(
                      "glass rounded-2xl px-6 border-0",
                      "data-[state=open]:glow-cyan/20"
                    )}
                  >
                    <AccordionTrigger
                      className={cn(
                        "text-left text-foreground hover:no-underline py-6",
                        "[&[data-state=open]>svg]:rotate-180"
                      )}
                    >
                      <span className="text-lg font-medium pr-4">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 pr-8">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
