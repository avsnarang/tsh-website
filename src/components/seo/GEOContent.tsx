'use client';

import { useEffect } from 'react';

// GEO-optimized content components for AI search engines
// These create structured, quotable content that AI systems love to cite

interface KeyFactProps {
  label: string;
  value: string;
  description?: string;
}

// Key fact component - displays important statistics in AI-friendly format
export function KeyFact({ label, value, description }: KeyFactProps) {
  return (
    <div className="key-fact" itemScope itemType="https://schema.org/PropertyValue">
      <dt className="text-sm text-gray-600" itemProp="name">{label}</dt>
      <dd className="text-2xl font-bold text-blue-900" itemProp="value">{value}</dd>
      {description && <p className="text-xs text-gray-500">{description}</p>}
    </div>
  );
}

// Key facts grid - structured data for AI extraction
export function KeyFactsGrid({ facts }: { facts: KeyFactProps[] }) {
  return (
    <dl className="key-facts grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50 rounded-lg">
      {facts.map((fact, index) => (
        <KeyFact key={index} {...fact} />
      ))}
    </dl>
  );
}

// Quotable statement - structured for AI citation
interface QuotableStatementProps {
  statement: string;
  source?: string;
  sourceTitle?: string;
  className?: string;
}

export function QuotableStatement({ statement, source, sourceTitle, className = '' }: QuotableStatementProps) {
  return (
    <blockquote
      className={`quotable-statement border-l-4 border-blue-600 pl-4 py-2 ${className}`}
      itemScope
      itemType="https://schema.org/Quotation"
    >
      <p className="text-lg text-gray-800 italic" itemProp="text">
        "{statement}"
      </p>
      {source && (
        <footer className="mt-2">
          <cite className="text-sm text-gray-600" itemProp="creator">
            — {source}{sourceTitle && `, ${sourceTitle}`}
          </cite>
        </footer>
      )}
    </blockquote>
  );
}

// FAQ Item - structured for AI extraction
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
}

export function FAQItem({ question, answer, isOpen = false }: FAQItemProps) {
  return (
    <details
      className="faq-item border-b border-gray-200 py-4"
      itemScope
      itemType="https://schema.org/Question"
      open={isOpen}
    >
      <summary className="cursor-pointer font-semibold text-gray-900 hover:text-blue-600" itemProp="name">
        {question}
      </summary>
      <div
        className="mt-3 text-gray-700"
        itemScope
        itemType="https://schema.org/Answer"
        itemProp="acceptedAnswer"
      >
        <p itemProp="text">{answer}</p>
      </div>
    </details>
  );
}

// FAQ Section with schema
interface FAQSectionProps {
  title?: string;
  faqs: { question: string; answer: string }[];
  className?: string;
}

export function FAQSection({ title = "Frequently Asked Questions", faqs, className = '' }: FAQSectionProps) {
  return (
    <section
      className={`faq-section ${className}`}
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <FAQItem key={index} {...faq} isOpen={index === 0} />
        ))}
      </div>
    </section>
  );
}

// Definition list for clear, structured information
interface DefinitionListProps {
  title?: string;
  items: { term: string; definition: string }[];
  className?: string;
}

export function DefinitionList({ title, items, className = '' }: DefinitionListProps) {
  return (
    <div className={`definition-list ${className}`}>
      {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}
      <dl className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border-b border-gray-100 pb-3">
            <dt className="font-medium text-gray-900">{item.term}</dt>
            <dd className="mt-1 text-gray-600">{item.definition}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

// Introduction paragraph optimized for AI extraction
interface IntroductionProps {
  title: string;
  description: string;
  highlights?: string[];
  className?: string;
}

export function Introduction({ title, description, highlights, className = '' }: IntroductionProps) {
  return (
    <div className={`school-intro ${className}`} itemScope itemType="https://schema.org/Organization">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" itemProp="name">
        {title}
      </h1>
      <p className="text-lg text-gray-700 mb-6" itemProp="description">
        {description}
      </p>
      {highlights && highlights.length > 0 && (
        <ul className="admission-info list-disc list-inside space-y-2 text-gray-600">
          {highlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Step-by-step guide component (HowTo schema friendly)
interface StepGuideProps {
  title: string;
  description?: string;
  steps: { title: string; description: string }[];
  className?: string;
}

export function StepGuide({ title, description, steps, className = '' }: StepGuideProps) {
  return (
    <div
      className={`step-guide ${className}`}
      itemScope
      itemType="https://schema.org/HowTo"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-2" itemProp="name">{title}</h2>
      {description && (
        <p className="text-gray-600 mb-6" itemProp="description">{description}</p>
      )}
      <ol className="space-y-6">
        {steps.map((step, index) => (
          <li
            key={index}
            className="flex gap-4"
            itemScope
            itemType="https://schema.org/HowToStep"
            itemProp="step"
          >
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              {index + 1}
            </span>
            <div>
              <h3 className="font-semibold text-gray-900" itemProp="name">{step.title}</h3>
              <p className="text-gray-600 mt-1" itemProp="text">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

// JSON-LD injector for page-specific schemas
interface SchemaObject {
  '@type'?: string;
  '@context'?: string;
  [key: string]: unknown;
}

interface SchemaInjectorProps {
  schema: SchemaObject;
}

export function SchemaInjector({ schema }: SchemaInjectorProps) {
  useEffect(() => {
    const schemaType = schema['@type'] || 'unknown';
    // Check if schema already exists to avoid duplicates
    const existingScript = document.querySelector(`script[data-schema="${schemaType}"]`);
    if (existingScript) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    script.setAttribute('data-schema', schemaType);
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [schema]);

  return null;
}
