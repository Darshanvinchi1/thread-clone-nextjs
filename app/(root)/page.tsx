import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.action";
import { currentUser } from "@clerk/nextjs";
import Pagination from "@/components/shared/Pagination";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";


export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
    const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    30
  );



  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {
          result?.posts.length === 0 ? (
            <p className="no-result">No threads found</p>
          ): (
            <>
              {result?.posts.map((post) => (
                <ThreadCard
                  key={post._id}
                  id={post._id}
                  currentUserId={user?.id}
                  parendId={post.parentId}
                  content={post.text}
                  auther={post.auther}
                  community={post.community}
                  createdAt={post.createdAt}
                  comments={post.children}
                />
              ))}
            </>
          )
        }
         <Pagination
            path='/'
            pageNumber={searchParams?.page ? +searchParams.page : 1}
            isNext={result.isNext}
          />
      </section>
    </>
  )
}