import { useEffect, useState } from "react";
import {
  fetchComments,
  deleteComment,
  type Comment,
} from "../../services/comment";
import { Button } from "../../components/ui/button";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";

const ManageComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadComments = async () => {
    try {
      const data = await fetchComments();
      setComments(data);
    } catch (err) {
      toast.error((err as Error).message || "Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      await deleteComment(id);
      setComments((prev) => prev.filter((c) => c.id !== id));
      toast.success("Comment deleted successfully");
    } catch (err) {
      toast.error((err as Error).message || "Failed to delete comment");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-slate-900">
      <h1 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Manage Comments
      </h1>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
          <Loader className="animate-spin w-4 h-4" />
          Loading comments...
        </div>
      ) : comments.length === 0 ? (
        <p className="text-gray-500 italic dark:text-gray-400">
          No comments available.
        </p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li
              key={c.id}
              className="border p-4 rounded bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-gray-100 shadow-sm text-sm"
            >
              <div className="mb-2 text-gray-800 dark:text-gray-200">
                💬 {c.comment}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                🧾 Issue: {c.issue_id} | 👤 User: {c.user_id} | 🕒{" "}
                {new Date(c.created_at ?? "").toLocaleString()}
              </div>
              <Button
                size="sm"
                variant="destructive"
                className="mt-2"
                onClick={() => handleDelete(c.id)}
                disabled={deletingId === c.id}
              >
                {deletingId === c.id ? "Deleting..." : "Delete"}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageComments;
