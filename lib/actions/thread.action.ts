"use server"

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoos";

interface Params {
    text: string;
    auther: string;
    communityId: string | null;
    path: string;
}

export async function createThread({
text,
auther,
communityId,
path,
}: Params) {


    try {
        connectToDB();

        const createThread =  await Thread.create({
            text,
            auther,
            community: null,
        });

        // updated user model
        await User.findByIdAndUpdate(auther, {
            $push: { threads: createThread._id }
        })

        revalidatePath(path)   
    } catch (error: any) {
        throw new Error(`Error creating thread: ${error.message}`)
    }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    try {
        connectToDB();

        const skipAmount = (pageNumber - 1) * pageSize;

        const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
                .sort({ createdAt: 'desc' })
                .skip(skipAmount)
                .limit(pageSize)
                .populate({ path: 'auther', model: User })
                .populate({ path: 'children', populate: {
                        path: 'auther',
                        model: User,
                        select: "_id name parentId image"
                    } 
                })

                const totalPostsCount = await Thread.countDocuments({ parentId: { $in: [null, undefined] } })

                const posts =  await postsQuery.exec();

                const isNext = totalPostsCount > skipAmount + posts.length;

                return { posts, isNext }

    } catch (error) {
        
    }
}

export async function fetchThreadById(id: string){
    try {
        
        connectToDB();

        // TODO populate commutnity
        const thread = await Thread.findById(id)
                .populate({
                    path: 'auther',
                    model: User,
                    select: '_id id name image'
                })
                .populate({
                    path: 'children',
                    populate: [
                        {
                            path:'auther',
                            model: User,
                            select: '_id id name parentId image'
                        },
                        {
                            path:'children',
                            model: Thread,
                            populate:{
                                path: 'auther',
                                model: User,
                                select: '_id id name parentId image'
                            }
                        }
                    ]
                }).exec();


                return thread;

    } catch (error: any) {
        throw new Error(`Error fetching thread: ${error.message}`)
    }
}

export async function addCommentToThread(
    threadId: string,
    commentText: string,
    userId: string,
    path: string,
){
    connectToDB();

    try {

        /* The line `const originalThread = await Thread.findById(threadId);` is fetching the thread with the
        specified `threadId` from the database using the `findById` method of the `Thread` model. The
        fetched thread is then stored in the `originalThread` variable for further processing. */
        const originalThread = await Thread.findById(threadId); 

        if(!originalThread) {
            throw new Error('Thread not found')
        }

        const commentThread = new Thread({
            text: commentText,
            auther: userId,
            parentId: threadId,
        })

        const savedCommentThread = await commentThread.save();
        
        originalThread.children.push(savedCommentThread._id);

        await originalThread.save();

        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`ERROR ADDING COMMENT TO THREAD ${error.message}`)
    }
}