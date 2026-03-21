import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { getBlogs, saveBlogs } from '@/lib/data';

export async function GET() {
  try {
    const blogs = getBlogs();
    return NextResponse.json(blogs.blogs || [], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Blogs ophalen mislukt' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    const auth = verifyAuth(token);

    if (!auth.valid) {
      return NextResponse.json(
        { error: 'Niet geautoriseerd' },
        { status: 401 }
      );
    }

    const { title, content, excerpt } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Titel en inhoud zijn verplicht' },
        { status: 400 }
      );
    }

    const blogsData = getBlogs();
    const newBlog = {
      id: Date.now().toString(),
      title,
      content,
      excerpt: excerpt || content.substring(0, 150),
      author: auth.userId || 'Admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    blogsData.blogs = blogsData.blogs || [];
    blogsData.blogs.unshift(newBlog);
    saveBlogs(blogsData);

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Blog aanmaken mislukt' },
      { status: 500 }
    );
  }
}
