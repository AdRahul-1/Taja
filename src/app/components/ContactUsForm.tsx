import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
const FormSchema = z.object({
	name: z.string().min(1, { message: "Name is required." }),
	address: z.string().min(1, { message: "Address is required." }),
	contactNo: z
		.string()
		.regex(/^\d{10}$/, { message: "Contact number must be 10 digits." }),
	message: z.string().min(1, { message: "Message is required." }),
	gstNumber: z
		.string()
		.regex(/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/, {
			message: "Invalid GSTIN format.",
		})
		.optional(),

	businessName: z.string().optional(),
	email: z.string().email({ message: "Invalid email address." }).optional(),
});
function ContactUsForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: "",
			address: "",
			contactNo: "",
			message: "",
			gstNumber: "",
			businessName: "",
			email: "",
		},
	});
	return (
		<Form {...form}>
			<form
				action="https://formsubmit.co/c8be25bfb9d04f34d244c1d7a571ecf3"
				method="POST"
				className=""
			>
				<div className="grid gap-4 lg:grid-cols-2">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Name <span className="text-red-500">*</span>
								</FormLabel>
								<FormControl>
									<Input placeholder="Your name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="Your name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="address"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Address <span className="text-red-500">*</span>
								</FormLabel>
								<FormControl>
									<Input placeholder="Your address" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="contactNo"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Contact Number <span className="text-red-500">*</span>
								</FormLabel>
								<FormControl>
									<Input placeholder="Your contact number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="gstNumber"
						render={({ field }) => (
							<FormItem>
								<FormLabel>GST Number (Optional)</FormLabel>
								<FormControl>
									<Input placeholder="Your GSTIN" {...field} />
								</FormControl>
								<FormDescription>
									Enter GSTIN if applicable for your business.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="businessName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Business Name (Optional)</FormLabel>
								<FormControl>
									<Input placeholder="Your business name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Message <span className="text-red-500">*</span>
							</FormLabel>
							<FormControl>
								<Textarea placeholder="Your message" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="w-full mt-4"
					disabled={!form.formState.isValid}
				>
					Submit
				</Button>
			</form>
		</Form>
	);
}

export default ContactUsForm;
