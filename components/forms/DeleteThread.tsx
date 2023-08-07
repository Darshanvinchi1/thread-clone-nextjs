"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { deleteThread } from "@/lib/actions/thread.action";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";


interface Props {
  threadId: string;
  currentUserId: string;
  autherId: string;
  parendId: string | null;
  isComment?: boolean;
}

function DeleteThread({
  threadId,
  currentUserId,
  autherId,
  parendId,
  isComment,
}: Props) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  if (currentUserId !== autherId || pathname === "/") return null;

  return (
    <Button size={'icon'} disabled={loading}>
      {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
      <Image
        src='/assets/delete.svg'
        alt='delte'
        width={18}
        height={18}
        className='cursor-pointer object-contain'
        onClick={async () => {
          setLoading(true);
          await deleteThread(JSON.parse(threadId), pathname);
          if (!parendId || !isComment) {
            router.push("/");
          }
          setLoading(false);
        }}  
      />
    </Button>
  );
}

export default DeleteThread;