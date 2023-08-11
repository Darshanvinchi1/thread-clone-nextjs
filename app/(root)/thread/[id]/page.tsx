import ThreadCard from '@/components/cards/ThreadCard'
import Comment from '@/components/forms/Comment';
import { fetchThreadById } from '@/lib/actions/thread.action';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const Page = async ({ params }: {params: { id: string }}) => {

    if(!params.id) return null;
    const user = await currentUser();

    const userInfo = await fetchUser(user?.id || "");

    if(!userInfo?.onboarded) redirect('/onboarding')

    const thread = await fetchThreadById(params.id)

  return (
    <section className='relative'>
        <div>
            <ThreadCard
                key={thread._id}
                id={thread._id}
                currentUserId={user?.id || ""}
                parendId={thread.parentId}
                content={thread.text}
                auther={thread.auther}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
                reThread={thread.repostedFrom}
            />
        </div>

        <div className='mt-7'>
          <Comment 
            threadId={thread.id}
            currentUserImg={userInfo.image}
            currentUserId={JSON.stringify(userInfo._id)}
          />
        </div>

        <div className='mt-10'>
            {
              thread.children.map((childItem: any) => (
                <ThreadCard
                    key={childItem._id}
                    id={childItem._id}
                    currentUserId={childItem?.id}
                    parendId={childItem.parentId}
                    content={childItem.text}
                    auther={childItem.auther}
                    community={childItem.community}
                    createdAt={childItem.createdAt}
                    comments={childItem.children}
                    reThread={childItem.repostedFrom}
                    isComment
                />
              ))
            }
        </div>
    </section>
  )
}

export default Page