"use client";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Textarea } from "../ui/textarea";
import { usePathname, useRouter } from "next/navigation";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.action";
import { useOrganization } from "@clerk/nextjs";
import { Loader2 } from "lucide-react"
import { useState } from "react";
// import { updatedUser } from "@/lib/actions/user.actions";

interface Props {
    user: {
        id: string,
        objectId: string,
        username: string,
        name: string,
        bio: string,
        image: string,
    };
    btnTitle: string;
}


const PostThread = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues:{
       thread: '',
       accountId: userId,
    }
  });
  
  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    setLoading(true);
    await createThread({
        text: values.thread,
        auther: userId,
        communityId: organization ? organization.id : null,
        path: pathname
    });

    router.push('/')
    setLoading(false);
  }
  
    return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 flex flex-col justify-start gap-10">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea 
                  rows={15}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}  className="bg-primary-500">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Post Thread
        </Button>
        </form>
    </Form>
    )
}

export default PostThread