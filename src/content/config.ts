import { defineCollection, z } from 'astro:content';

const postFields = {
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().default(false),
    /**
     * Zamanlanmis yayin. Bu andan once yazi derlenmez; sitemap, listeler ve
     * llms.txt'ye girmez, ona verilen ic linkler duz metne doner. Yoksa pubDate
     * kullanilir (ileri tarihli pubDate de ayni sekilde bekletilir).
     * Ornek: publishAt: 2026-10-24  (UTC gece yarisi; gunluk 06:00 UTC derlemesiyle cikar)
     */
    publishAt: z.coerce.date().optional(),
    /** Hedef anahtar kelime (bir kelime = bir sayfa). seo-check ilk 100 kelimede arar. */
    keyword: z.string().optional(),
    /** Arama sonucu basligi farkli olacaksa (ek " | Unutma Blog" otomatik eklenir). */
    seoTitle: z.string().optional(),
  };

const blog = defineCollection({ type: 'content', schema: z.object(postFields) });

/** Turkce surum: ayni yazilar, dosya adi = Ingilizce slug; adres trSlug ile /tr/blog/<trSlug>/. */
const blogTr = defineCollection({
  type: 'content',
  schema: z.object({ ...postFields, trSlug: z.string() }),
});

export const collections = { blog, blogTr };
