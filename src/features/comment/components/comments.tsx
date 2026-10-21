import { getComments } from "../queries/get-comments";
import { CommentCreateForm } from "./comment-create-form";
import { CommentItem } from "./comment-item";

type CommentsProps = {
  ticketId: string;
};

const Comments = async ({ ticketId }: CommentsProps) => {
  const { list: comments } = await getComments(ticketId);

  return (
    <div className="flex flex-col gap-y-2 ml-8">
      <CommentCreateForm id={ticketId} />
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export { Comments };
