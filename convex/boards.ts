import { v } from "convex/values";
import {getAllOrThrow} from "convex-helpers/server/relationships"
import { query } from "./_generated/server";

export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    //for favorites boards page
    if (args.favorites) {
      const favoriteBoards = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", identity.subject).eq("orgId", args.orgId)
        )
        .order("desc")
        .collect();

        const ids = favoriteBoards.map((board) => board.boardId);
        const boards = await getAllOrThrow(ctx.db, ids)

        return boards.map((board) => {
          return {
            ...board,
            isFavorite: true,
          };
        });
    }

    //for team page search

    const title = args.search;
    let boards = [];

    if (title) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", title).eq("orgId", args.orgId)
        )
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect();
    }

    const boardsWithFavorites = boards?.map((board) => {
      return ctx.db
        .query("userFavorites")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", identity.subject).eq("boardId", board._id)
        )
        .unique()
        .then((favorite) => {
          return {
            ...board,
            isFavorite: !!favorite,
          };
        });
    });

    //doing this => because "boardsWithFavorites" is an array of promises and we have to wait for all of them to resolve, if not we will get an array of promises
    const boardsWithFavoritesBoolean = await Promise.all(boardsWithFavorites);
    return boardsWithFavoritesBoolean;
  },
});
