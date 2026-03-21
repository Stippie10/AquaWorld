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
      const res = await fetch('/api/blogs');
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
    <div className="max-w-4xl mx-auto px-4 pt-20 pb-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-cyan-600 mb-4">Blog</h1>
        <p className="text-gray-600 text-lg">
          Lees de laatste updates en verhalen van AquaWorld
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Laden...</p>
      ) : blogs.length === 0 ? (
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-200 text-center">
          <p className="text-gray-600 text-lg">
            Nog geen blogs geplaatst. Check binnenkort terug!
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-3xl font-bold mb-2 text-gray-800">
                {blog.title}
              </h2>
              <div className="flex gap-4 text-sm text-gray-500 mb-4">
                <span>📅 {formatDate(blog.createdAt)}</span>
                <span>✍️ {blog.author}</span>
              </div>
              <p className="text-gray-600 mb-4 text-lg">
                {blog.excerpt}
              </p>
              <Link
                href={`/blog/${blog.id}`}
                className="inline-block text-cyan-600 hover:text-cyan-700 font-bold"
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
