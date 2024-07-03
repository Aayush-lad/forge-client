"use client";
import WhiteBoard from "@/components/Whiteboard/WhiteBoard"

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
  useMyPresence,
  useRoom,
  useOthers,
  useOthersConnectionIds,
  useUpdateMyPresence
  
} from "@liveblocks/react/suspense";

export default function Room({ children }) {
  return (
    <LiveblocksProvider publicApiKey={"pk_prod_Ezt7j6ZYvVxDZM9RbKYHtkyrsqwpqagxh7-42p65v-Q-AMZQtO_7FZrXC-tRXy9h"}>
          <WhiteBoard/>
    </LiveblocksProvider>
  );
}