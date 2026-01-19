import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Icons } from "@/assets/icons";
import Col from "@/components/ui/col";
import { Button } from "@/components/ui/reusables/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/reusables/form";
import { Input } from "@/components/ui/reusables/input";
import { Textarea } from "@/components/ui/reusables/textarea";
import Row from "@/components/ui/row";
import { siteConfig } from "@/config/site";

const formSchema = z.object({
  name: z.string().min(2, "Name is too short").max(120, "Name is too long"),
  email: z.string().email(),
  message: z
    .string()
    .min(5, "Message is too short")
    .max(5000, "Message is too long"),
});

export const isDisposableEmail = async (email: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `${siteConfig.links.disposableEmailChecker}${email}`,
      { method: "GET" },
    );

    const data = await response.json();

    return data.disposable === "true";
  } catch {
    return false;
  }
};

export default function Contact() {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
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
      const response = await fetch(`${process.env.GATSBY_BACKEND_URL}/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `New Contact Form Submission:\n\n👤 Name: ${data.name}\n📧 Email: ${data.email}\n💬 Message: ${data.message}`,
        }),
      });

      if (response.ok) {
        toast.success("Message received! I will get back to you soon.", {
          duration: 10000,
        });
        form.reset();
      } else {
        toast.error("Something went wrong, please try again later.");
      }
    } catch {
      toast.error("Something went wrong, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = form.formState.isSubmitting || isLoading;

  return (
    <Row className="gap-10 flex-col lg:flex-row">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full lg:basis-1/2"
        >
          <FormField
            control={form.control}
            name="name"
            disabled={isDisabled}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            disabled={isDisabled}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            disabled={isDisabled}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="I would like to discuss about..."
                    rows={10}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isDisabled}>
            {isLoading ? (
              <>
                <Icons.Loading className="animate-spin" /> Sending...
              </>
            ) : (
              "Send"
            )}
          </Button>
        </form>
      </Form>
      <Col className="basis-1/2 space-y-4">
        <span className="text-5xl">Or</span>
        <Row className="gap-2 flex-col md:flex-row">
          Message me on{" "}
          <a href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
            <Button
              variant={"secondary"}
              size={"sm"}
              className="px-1 h-6 text-base rounded-sm font-normal"
            >
              <Icons.Twitter /> Twitter
            </Button>
          </a>{" "}
          or{" "}
          <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
            <Button
              variant={"secondary"}
              size={"sm"}
              className="px-1 h-6 text-base rounded-sm font-normal"
            >
              <Icons.LinkedIn /> LinkedIn
            </Button>
          </a>
          or{" "}
          <a href={siteConfig.links.email} target="_blank" rel="noreferrer">
            <Button
              variant={"secondary"}
              size={"sm"}
              className="px-1 h-6 text-base rounded-sm font-normal"
            >
              <Icons.Email /> Email
            </Button>
          </a>
        </Row>
      </Col>
    </Row>
  );
}
