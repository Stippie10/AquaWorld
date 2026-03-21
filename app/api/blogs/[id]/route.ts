import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { getBlogs, saveBlogs } from '@/lib/data';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    const auth = verifyAuth(token);

    if (!auth.valid) {
      return NextResponse.json(
        { error: 'Niet geautoriseerd' },
        { status: 401 }
      );
    }

    const { title, content, excerpt } = await req.json();

    const blogsData = getBlogs();
    const blogIndex = blogsData.blogs?.findIndex((b: any) => b.id === id);

    if (blogIndex === -1 || blogIndex === undefined) {
      return NextResponse.json(
        { error: 'Blog niet gevonden' },
        { status: 404 }
      );
    }

    blogsData.blogs[blogIndex] = {
      ...blogsData.blogs[blogIndex],
      title: title || blogsData.blogs[blogIndex].title,
      content: content || blogsData.blogs[blogIndex].content,
      excerpt: excerpt || blogsData.blogs[blogIndex].excerpt,
      updatedAt: new Date().toISOString()
    };

    saveBlogs(blogsData);

    return NextResponse.json(blogsData.blogs[blogIndex], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Blog updaten mislukt' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    const auth = verifyAuth(token);

    if (!auth.valid) {
      return NextResponse.json(
        { error: 'Niet geautoriseerd' },
        { status: 401 }
      );
    }

    const blogsData = getBlogs();

    blogsData.blogs = blogsData.blogs?.filter((b: any) => b.id !== id) || [];
    saveBlogs(blogsData);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Blog verwijderen mislukt' },
      { status: 500 }
    );
  }
}
