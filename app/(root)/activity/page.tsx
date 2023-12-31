import NoData from '@/components/shared/NoData';
import { fetchUser, getActivity } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const Page = async () => {

    const user = await currentUser();

    const userInfo = await fetchUser(user?.id || "");

    if(!userInfo?.onboarded) redirect('/onboarding')

    // const activity = await getActivity(userInfo._id);
    let  activity: any[] = [];
  return (
    <section>
        <h1 className="head-text mb-10">Activity</h1>

        <section className='mt-10 flex flex-col gap-5'>
            {activity.length > 0 ? (
              <>
                {activity.map((activity) => (
                  <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                      <article className='activity-card'>
                          <Image 
                            src={activity.auther.image}
                            alt="Profile Picture"
                            width={20}
                            height={20}
                            className='rounded-full object-cover'
                          />
                          <p className='!text-small-regular text-light-1'>
                            <span className='mr-1 text-primary-500'>
                              {activity.auther.name}
                            </span> {" "}
                            replied to your thred
                          </p>
                      </article>
                  </Link>
                ))}
              </>
            ) : (
              <NoData title='No activity yet' />
            // <p className='!text-base-regular text-light-3'>No activity yet</p>
            )}
        </section>
    </section>
  )
}

export default Page