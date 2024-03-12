"use client";
import { Loader } from "lucide-react";
import { Info, InfoSkeleton } from "./info";
import { Participants, ParticipantsSkeleton } from "./participants";
import { Toolbar, ToolbarSkeleton } from "./toolbar";

const CanvasLoading = () => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
      <Loader className=" h-6 w-6 text-muted-foreground animate-spin" />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton/>
    </main>
  );
};

export default CanvasLoading;
