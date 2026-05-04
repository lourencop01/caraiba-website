import React from 'react';

type StructuredDataProps = {
  data: object | object[];
};

export default function StructuredData({ data }: StructuredDataProps) {
  if (Array.isArray(data)) {
    return (
      <>
        {data.map((item, idx) => (
          <script
            key={idx}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
            suppressHydrationWarning
          />
        ))}
      </>
    );
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      suppressHydrationWarning
    />
  );
} 