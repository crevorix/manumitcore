"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { FaqItem } from "@/data/faq";

interface AccordionProps {
  items: FaqItem[];
  allowMultiple?: boolean;
}

interface AccordionItemProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function AccordionItem({ item, isOpen, onToggle, index }: AccordionItemProps) {
  const headingId = `faq-heading-${index}`;
  const panelId = `faq-panel-${index}`;

  return (
    <div
      className={`border border-ink/10 rounded-xl overflow-hidden transition-all duration-300 bg-white
        ${isOpen ? "border-forest/30" : "hover:border-forest/15"}`}
    >
      <button
        id={headingId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span
          className={`font-display text-base font-semibold transition-colors duration-200
            ${isOpen ? "text-forest-dark" : "text-ink/90"}`}
        >
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={`shrink-0 transition-colors ${isOpen ? "text-forest-dark" : "text-ink/40"}`}
        >
          <ChevronDownIcon className="w-5 h-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            id={panelId}
            role="region"
            aria-labelledby={headingId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <div className="px-6 pb-5 text-ink/70 text-sm leading-relaxed border-t border-ink/8 pt-4">
              {item.answer}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Keyboard-navigable FAQ accordion.
 * Supports single-open or multiple-open modes.
 */
export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggle = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="space-y-3" role="list">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          isOpen={openIndexes.includes(index)}
          onToggle={() => toggle(index)}
          index={index}
        />
      ))}
    </div>
  );
}
