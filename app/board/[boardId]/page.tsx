import { Room } from "@/components/room";
import Canvas from "./_components/canvas";
import CanvasLoading from "./_components/canvas-loading";

interface BoardProps {
  params:{
    boardId:string
  }
}
const Board = ({params}: BoardProps) => {
  return (
    <Room roomId={params.boardId} fallback={<CanvasLoading/>}>
      <Canvas boardId={params.boardId}/>
    </Room>
  
)};

export default Board;
