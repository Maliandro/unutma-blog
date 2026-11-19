import type { APIRoute } from 'astro';
import { buildRss } from '../rss.xml';

export const GET: APIRoute = ({ site }) => buildRss(site, 'tr');
