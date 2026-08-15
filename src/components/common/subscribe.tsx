import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Icons } from "@/assets/icons";

import { isDisposableEmail } from "../modules/contact";
import Col from "../ui/col";
import { Heading } from "../ui/heading";
import { Button } from "../ui/reusables/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/reusables/form";
import { Input } from "../ui/reusables/input";

const formSchema = z.object({
  email: z.email(),
});

export default function Subscribe({
  utm_source,
  utm_medium,
  referring_site,
}: {
  utm_source: string;
  utm_medium: string;
  referring_site: string;
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const isDisposable = await isDisposableEmail(data.email);
    if (isDisposable) {
      form.setError("email", {
        message: "Disposable email is not allowed",
      });

      setIsLoading(false);

      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.PUBLIC_BACKEND_URL}/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            utm_source,
            utm_medium,
            referring_site,
          }),
        }
      );

      if (response.ok) {
        toast.success("Subscribed to newsletter", {
          duration: 10000,
        });
        form.reset();
      } else {
        toast.error("Something went wrong, please try again later.");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Col className="space-y-2 border rounded-lg p-4">
      <Heading level={6}>Stay in touch 👇</Heading>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="rounded-l-none"
            variant={"secondary"}
          >
            {isLoading ? (
              <>
                <Icons.Loading className="animate-spin" /> Subscribing...
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
      </Form>
    </Col>
  );
}
