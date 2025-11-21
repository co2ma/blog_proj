interface Post {
    id: number;
    title: string;
    content: string;
    category: string;
    createDate: string;
    updateDate: string;
    image: string | null;
}

export default function PostDetail({ post }: { post: Post }) {
    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            {/* Title */}
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

            {/* Meta */}
            <div className="flex items-center justify-between text-gray-500 text-sm mb-6">
                <span>카테고리: {post.category}</span>
                <span>{new Date(post.createDate).toLocaleDateString()}</span>
            </div>

            {/* Image */}
            {post.image && (
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-48 max-h-[400px] object-cover rounded-2xl mb-8 border border-amber-950"
                />
            )}

            {/* Content */}
            <div className="text-lg leading-8 whitespace-pre-line">
                {post.content}
            </div>
        </div>
    );
}
