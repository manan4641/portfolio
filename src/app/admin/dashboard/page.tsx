'use client';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Plus, Trash, LogOut } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import 'react-quill/dist/quill.snow.css';

// Dynamic import for React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Post {
    id: number;
    title: string;
    content: string; // HTML content
    date: string;
    image?: string; // Base64 or URL
}

export default function Dashboard() {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', content: '' });

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) {
            router.push('/admin');
        }
        const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
        setPosts(savedPosts);
    }, [router]);

    const handleDelete = (id: number) => {
        const updated = posts.filter(p => p.id !== id);
        setPosts(updated);
        localStorage.setItem('posts', JSON.stringify(updated));
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        router.push('/admin');
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        const post: Post = {
            id: Date.now(),
            title: newPost.title,
            content: newPost.content,
            date: new Date().toLocaleDateString()
        };
        const updated = [post, ...posts];
        setPosts(updated);
        localStorage.setItem('posts', JSON.stringify(updated));
        setIsCreating(false);
        setNewPost({ title: '', content: '' });
    };

    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    }), []);

    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-6 pt-32 max-w-5xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
                    <div className="flex gap-4">
                        <Button onClick={() => setIsCreating(!isCreating)} className="gap-2">
                            <Plus size={18} /> {isCreating ? 'Cancel' : 'New Post'}
                        </Button>
                        <Button variant="destructive" size="icon" onClick={handleLogout}>
                            <LogOut size={18} />
                        </Button>
                    </div>
                </div>

                {isCreating && (
                    <Card className="mb-12 shadow-md">
                        <CardHeader>
                            <CardTitle>Create New Post</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleCreate} className="space-y-6">
                                <Input
                                    placeholder="Post Title"
                                    value={newPost.title}
                                    onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                                    required
                                    className="text-lg font-medium"
                                />
                                <div className="h-[400px] mb-12">
                                    <ReactQuill
                                        theme="snow"
                                        value={newPost.content}
                                        onChange={content => setNewPost({ ...newPost, content })}
                                        modules={modules}
                                        className="h-[350px] bg-background text-foreground rounded-md"
                                    />
                                </div>
                                <Button type="submit" size="lg" className="w-full mt-12">Publish Post</Button>
                            </form>
                        </CardContent>
                    </Card>
                )}

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-muted-foreground mb-4">Recent Posts</h2>
                    {posts.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg">
                            No posts yet. Create your first one above.
                        </div>
                    ) : (
                        posts.map(post => (
                            <Card key={post.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="flex justify-between items-center p-6">
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">{post.title}</h3>
                                        <p className="text-sm text-muted-foreground">{post.date}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)} className="text-muted-foreground hover:text-destructive">
                                        <Trash size={20} />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
}
