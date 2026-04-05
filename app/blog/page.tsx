'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs', { cache: 'no-store' });
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-cyan-400 mb-4">Blog</h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          Lees de laatste updates en verhalen van AquaWorld
        </p>
      </div>

      {loading ? (
        <p className="text-center text-slate-300">Laden...</p>
      ) : blogs.length === 0 ? (
        <div className="bg-slate-800/80 p-8 rounded-lg border border-slate-600 text-center">
          <p className="text-slate-200 text-lg">
            Nog geen blogs geplaatst. Check binnenkort terug!
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-slate-800/80 border border-slate-700 p-8 rounded-xl shadow-lg transition hover:border-cyan-500/50"
            >
              <h2 className="text-3xl font-bold mb-2 text-slate-100 leading-tight">
                {blog.title}
              </h2>
              <div className="flex gap-4 text-sm text-slate-400 mb-4">
                <span>📅 {formatDate(blog.createdAt)}</span>
                <span>✍️ {blog.author}</span>
              </div>
              <p className="text-slate-200 mb-4 text-lg leading-relaxed">
                {blog.excerpt || 'Geen samenvatting beschikbaar.'}
              </p>
              <Link
                href={`/blog/${blog.id}`}
                className="inline-block text-cyan-400 hover:text-cyan-300 font-bold"
              >
                Lees meer →
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
