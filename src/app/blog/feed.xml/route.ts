import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').substring(0, 500);
}

export async function GET() {
  try {
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(name, slug)
      `)
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(50);

    if (error) throw error;

    const siteUrl = 'https://tsh.edu.in';
    const feedUrl = `${siteUrl}/blog/feed.xml`;
    const now = new Date().toUTCString();

    const rssItems = (posts || [])
      .map((post) => {
        const pubDate = post.published_at
          ? new Date(post.published_at).toUTCString()
          : new Date(post.created_at).toUTCString();
        const description = post.excerpt || stripHtml(post.content);

        return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <description>${escapeXml(description)}</description>
      <pubDate>${pubDate}</pubDate>
      <author>blog@tsh.edu.in (${escapeXml(post.author || "The Scholars' Home")})</author>
      ${post.category ? `<category>${escapeXml(post.category.name)}</category>` : ''}
      ${post.featured_image ? `<enclosure url="${escapeXml(post.featured_image)}" type="image/jpeg" />` : ''}
    </item>`;
      })
      .join('');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>The Scholars' Home Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Expert insights on education, parenting tips, CBSE exam preparation, career guidance, and school news from The Scholars' Home.</description>
    <language>en-in</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteUrl}/logo.png</url>
      <title>The Scholars' Home Blog</title>
      <link>${siteUrl}/blog</link>
    </image>
    <copyright>Copyright ${new Date().getFullYear()} The Scholars' Home. All rights reserved.</copyright>
    <managingEditor>blog@tsh.edu.in (The Scholars' Home)</managingEditor>
    <webMaster>webmaster@tsh.edu.in (The Scholars' Home)</webMaster>
    <category>Education</category>
    <category>Parenting</category>
    <category>CBSE</category>
    ${rssItems}
  </channel>
</rss>`;

    return new Response(rss, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('RSS Feed Error:', error);
    return new Response('Error generating RSS feed', { status: 500 });
  }
}
