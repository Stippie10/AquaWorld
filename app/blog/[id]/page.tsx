'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogPost() {
  const params = useParams();
  const id = params.id as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      const foundBlog = data.find((b: Blog) => b.id === id);
      setBlog(foundBlog || null);
    } catch (error) {
      console.error('Error fetching blog:', error);
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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 pt-28 pb-12 text-center">
        <p className="text-slate-300">Laden...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 pt-28 pb-12 text-center">
        <p className="text-slate-200 text-lg">Blog niet gevonden</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 pt-28 pb-12">
      <article className="bg-slate-800/90 border border-slate-700 p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-slate-100 leading-tight">
          {blog.title}
        </h1>
        <div className="flex flex-wrap gap-6 text-sm text-slate-400 mb-8 pb-8 border-b border-slate-600">
          <span>📅 {formatDate(blog.createdAt)}</span>
          <span>✍️ {blog.author}</span>
          {blog.updatedAt !== blog.createdAt && (
            <span>📝 Bijgewerkt: {formatDate(blog.updatedAt)}</span>
          )}
        </div>
        <div className="max-w-none text-slate-100 whitespace-pre-wrap text-lg leading-relaxed">
          {blog.content}
        </div>
      </article>
    </div>
  );
}
