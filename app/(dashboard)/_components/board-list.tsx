"use client";

import { Button } from "@/components/ui/button";
import NotFound from "./empty-search";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { BoardCard } from "./board-card.tsx";
import NewBoardButton from "./new-board-button";
import { useRouter } from "next/navigation";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}
const BoardList = ({ orgId, query }: BoardListProps) => {
  const router = useRouter();
  const data = useQuery(api.boards.get, { orgId, ...query});

  const { mutate, pending } = useApiMutation(api.board.create);

  const onCreateHandler = () => {
    if (!orgId) {
      return;
    }
    mutate({
      orgId: orgId,
      title: "Untitled",
    }).then((id) => {
      toast.success("Board created successfully");
      router.push(`/board/${id}`);
    });
  };

  if (data === undefined) {
    return (
      <div>
      <h2 className=" text-3xl">
        {query.favorites ? "Favorite Boards" : "Team Boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton orgId={orgId} disabled/>
        <BoardCard.Skeleton />
        <BoardCard.Skeleton />
        <BoardCard.Skeleton />
        <BoardCard.Skeleton />
      </div>
      </div>
    );
  }

  if (!data.length && query.search) {
    return (
      <NotFound
        imgUrl="/empty-search.svg"
        imageAlt="No Search Results Found"
        title="No Search Results Found"
        subtitle="Try searching for something else."
      />
    );
  }
  if (!data.length && query.favorites) {
    return (
      <NotFound
        imgUrl="/empty-favorites.svg"
        imageAlt="No Favorite Boards"
        title="No Favorite Boards"
        subtitle="Try favoriting a board to see it here."
      />
    );
  }

  if (!data.length) {
    return (
      <>
        <NotFound
          imgUrl="/note.svg"
          imageAlt=""
          title="Create your first board"
          subtitle="Start by creating a board to keep track of your tasks."
          buttonElement={
            <Button disabled={pending} onClick={onCreateHandler} size={"lg"}>
              Create Board
            </Button>
          }
        />
      </>
    );
  }

  return (
    <div>
      <h2 className=" text-3xl">
        {query.favorites ? "Favorite Boards" : "Team Boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton orgId={orgId} />
        {data?.map((board: any) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorName={board.authorName}
            authorId={board.authorId}
            orgId={board.orgId}
            createdAt={board._creationTime}
            isFavorite={board.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardList;
