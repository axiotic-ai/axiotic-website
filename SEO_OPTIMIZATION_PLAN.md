# SEO Optimization Plan for Axiotic.ai

## Implementation Status: Complete

### Files Modified

#### 1. `docs/index.html`

**Title tag (60 chars):**
```
Axiotic AI | Beyond-Scaling AI Research & Consulting
```

**Meta description (155-160 chars):**
```
Axiotic AI is a research-driven AI lab and consultancy building efficient, next-generation learning systems beyond brute-force scaling. Expert AI strategy & systems.
```

**Added to `<head>`:**
- Static title (not JS-loaded)
- Meta description
- Open Graph tags (og:title, og:description, og:image, og:url, og:type, og:site_name)
- Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image)
- Canonical URL: `https://axiotic.ai/`
- JSON-LD structured data (Organization + WebSite schema)

### Files Created

#### 2. `docs/robots.txt`
```
User-agent: *
Allow: /

Sitemap: https://axiotic.ai/sitemap.xml
```

#### 3. `docs/sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://axiotic.ai/</loc>
    <lastmod>2026-01-21</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### Files Removed

#### 4. `docs/consulting.html`
Removed as redundant - the homepage `index.html#consulting` section covers consulting content. Avoids duplicate content issues.

---

## JSON-LD Structured Data

### Organization + WebSite Schema (index.html)
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://axiotic.ai/#organization",
      "name": "Axiotic AI",
      "url": "https://axiotic.ai",
      "logo": {
        "@type": "ImageObject",
        "url": "https://axiotic.ai/images/logo-name-crop-corrected.png"
      },
      "description": "Research-driven AI lab and consultancy building efficient, next-generation learning systems beyond brute-force scaling.",
      "email": "contact@axiotic.ai",
      "foundingDate": "2025",
      "knowsAbout": [
            "Artificial Intelligence", "Machine Learning", "AI Research", "AI Consulting",
            "World Models", "Efficient AI Systems", "Beyond Scaling AI", "Small Language Models",
            "SLMs", "Large Language Models", "LLMs", "Retrieval Augmented Generation",
            "RAG Systems", "RAG Pipelines", "AI Strategy", "AI Governance", "AI Safety",
            "AI Ethics", "Meta Learning", "Multimodal Learning", "Self-Supervised Learning",
            "Hierarchical Attention", "Fractal Attention", "Evolutionary AI Methods",
            "Local Learning Rules", "Embodied AI", "Causal Learning", "AI Flywheels",
            "Evaluation Loops", "On-Device AI", "Edge AI", "Agent-Based Systems", "AI Agents",
            "Infinite Context Learning", "Neural Architecture Design", "Sample Efficient Learning",
            "Data Generation", "Synthetic Data", "Training Objectives", "Memory Systems",
            "Belief States", "Planning Systems", "Long Horizon Learning", "Dense Routing",
            "GPU Optimization", "Privacy-First AI", "Natural Language Processing", "NLP",
            "AI Upskilling", "AI Team Building", "Compact Models", "Model Compression", "AI Compliance"
          ]
    },
    {
      "@type": "WebSite",
      "@id": "https://axiotic.ai/#website",
      "url": "https://axiotic.ai",
      "name": "Axiotic AI",
      "publisher": {"@id": "https://axiotic.ai/#organization"}
    }
  ]
}
```

---

## Verification Checklist

After deployment, verify with:

1. **View page source** - Confirm meta tags render statically (not JS-dependent)
2. **Google Rich Results Test**: https://search.google.com/test/rich-results
3. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
4. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
5. **Submit sitemap** to Google Search Console

---

## Implementation Date
2026-01-21
