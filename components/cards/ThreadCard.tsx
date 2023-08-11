import Image from "next/image";
import Link from "next/link";

import { formatDateString } from "@/lib/utils";
import DeleteThread from "../forms/DeleteThread";
import { repostThread } from "@/lib/actions/thread.action";
import RepostThread from "../forms/RepostThread";

interface Props {
	id: string;
	currentUserId: string;
	parendId: string | null;
	content: string;
	auther: {
		name: string;
		image: string;
		id: string;
	};
	community: {
		id: string;
		name: string;
		image: string;
	} | null;
	createdAt: string;
	comments: {
		auther: {
			image: string;
		};
	}[];
  reThread: {
    thread: string;
    repostedBy: {
      _id: string;
      username: string;
      id: string;
    }
  }[],
	isComment?: boolean;
}

function ThreadCard({
	id,
	currentUserId,
	parendId,
	content,
	auther,
	community,
	createdAt,
	comments,
  reThread,
	isComment,
}: Props) {
  return (
		<article
			className={`flex w-full flex-col rounded-xl ${
				isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
			} ${
          reThread[0]?.thread ? 'pt-4' : ''
      }`}>
        
			{reThread[0]?.thread &&	
        <div className="flex gap-2 mb-3">
					<Image
						src='/assets/repost.svg'
						alt='repostby'
						width={24}
						height={24}
						className='cursor-pointer object-contain'
					/>  
          <p className="text-gray-600">{reThread[0].repostedBy.id === currentUserId ? 'You reposted' : `Reposted by @${reThread[0].repostedBy.username}`}</p>
				</div>
        }
			<div className='flex items-start justify-between'>
				<div className='flex w-full flex-1 flex-row gap-4'>
					<div className='flex flex-col items-center'>
						<Link href={`/profile/${auther.id}`} className='relative h-11 w-11'>
							<Image
								src={auther.image}
								alt='user_community_image'
								fill
								className='cursor-pointer rounded-full'
							/>
						</Link>

						<div className='thread-card_bar' />
					</div>

					<div className='flex w-full flex-col'>
						<Link href={`/profile/${auther.id}`} className='w-fit'>
							<h4 className='cursor-pointer text-base-semibold text-light-1'>
								{auther.name}
							</h4>
						</Link>

						<p className='mt-2 text-small-regular text-light-2'>{content}</p>

						<div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
							<div className='flex gap-3.5'>
								<Image
									src='/assets/heart-gray.svg'
									alt='heart'
									width={24}
									height={24}
									className='cursor-pointer object-contain'
								/>
								<Link href={`/thread/${id}`}>
									<Image
										src='/assets/reply.svg'
										alt='heart'
										width={24}
										height={24}
										className='cursor-pointer object-contain'
									/>
								</Link>
								{!isComment &&  <RepostThread userId={currentUserId} ThreadId={id} isRepoat={reThread[0]?.thread ? true: false} />}
								<Image
									src='/assets/share.svg'
									alt='heart'
									width={24}
									height={24}
									className='cursor-pointer object-contain'
								/>
							</div>

							{isComment && comments.length > 0 && (
								<Link href={`/thread/${id}`}>
									<p className='mt-1 text-subtle-medium text-gray-1'>
										{comments.length} repl{comments.length > 1 ? "ies" : "y"}
									</p>
								</Link>
							)}
						</div>
					</div>
				</div>

				<DeleteThread
					threadId={JSON.stringify(id)}
					currentUserId={currentUserId}
					autherId={auther.id}
					parendId={parendId}
					isComment={isComment}
				/>
			</div>

			{!isComment && comments.length > 0 && (
				<div className='ml-1 mt-3 flex items-center gap-2'>
					{comments.slice(0, 2).map((comment, index) => (
						<Image
							key={index}
							src={comment.auther.image}
							alt={`user_${index}`}
							width={24}
							height={24}
							className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
						/>
					))}

					<Link href={`/thread/${id}`}>
						<p className='mt-1 text-subtle-medium text-gray-1'>
							{comments.length} repl{comments.length > 1 ? "ies" : "y"}
						</p>
					</Link>
				</div>
			)}

			{!isComment && community && (
				<Link
					href={`/communities/${community.id}`}
					className='mt-5 flex items-center'>
					<p className='text-subtle-medium text-gray-1'>
						{formatDateString(createdAt)}
						{community && ` - ${community.name} Community`}
					</p>

					<Image
						src={community.image}
						alt={community.name}
						width={14}
						height={14}
						className='ml-1 rounded-full object-cover'
					/>
				</Link>
			)}
		</article>
	);
}

export default ThreadCard;
