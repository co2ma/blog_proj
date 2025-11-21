import PostDetail from "@/components/postDetail";
import api from "@/lib/api";

interface Post {
    id: number;
    title: string;
    content: string;
    category: string;
    createDate: string;
    updateDate: string;
    image: string | null;
}

export default async function PostPage(props: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await props.params;
    console.log(id);
    const res = await api.get(`/api/posts/${id}`);
    const post: Post = res.data;

    return <PostDetail post={post} />;
}
