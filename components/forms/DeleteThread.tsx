"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { deleteThread } from "@/lib/actions/thread.action";

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
  const pathname = usePathname();
  const router = useRouter();

  if (currentUserId !== autherId || pathname === "/") return null;

  return (
    <Image
      src='/assets/delete.svg'
      alt='delte'
      width={18}
      height={18}
      className='cursor-pointer object-contain'
      onClick={async () => {
        await deleteThread(JSON.parse(threadId), pathname);
        if (!parendId || !isComment) {
          router.push("/");
        }
      }}
    />
  );
}

export default DeleteThread;