import { getComments } from "../queries/get-comments";

type CommentsListProps = {
  ticketId: string;
};

const CommentsList = async ({ ticketId }: CommentsListProps) => {
  const { list: comments } = await getComments(ticketId);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-145 flex flex-col gap-y-4 animate-fade-from-top">
        {comments.map((comment) => (
          <div key={comment.id} className="flex flex-col gap-y-1">
            <div className="flex items-center gap-x-2 text-sm">
              <span className="font-semibold">{comment.user.username}</span>
              <span className="text-xs text-muted-foreground">
                {comment.createdAt.toLocaleString()}
              </span>
            </div>
            <p className="text-sm whitespace-break-spaces">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { CommentsList };
