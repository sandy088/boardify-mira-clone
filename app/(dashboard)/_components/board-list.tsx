"use client";

import { Button } from "@/components/ui/button";
import NotFound from "./empty-search";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: boolean;
  };
}
const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = []; // Call API to get data

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
          buttonElement={<Button size={"lg"}>Create Board</Button>}
        />
      </>
    );
  }

  return <div>BoardList</div>;
};

export default BoardList;
