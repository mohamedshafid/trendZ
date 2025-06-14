import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";

// 📩 Validation Schema
const NewsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

const NewsLettter = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: zodResolver(NewsletterSchema),
  });

  const onSubmit = (data) => {
    console.log("📧 Newsletter email:", data.email);
    reset();
  };

  return (
    <section className="mt-20px-6 md:px-16 py-16 bg-gradient-to-br from-[#f3f4f6] to-[#eaeefc]">
      <div className="max-w-3xl mx-auto text-center bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-3xl px-8 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Stay in the Loop!
        </h2>
        <p className="text-gray-600 text-sm font-thin mb-8">
          Get front-row access to the latest fashion drops, limited-time offers,
          styling tips, and exclusive deals. Whether you're shopping for casual
          classics or runway-inspired pieces, our weekly updates keep you
          effortlessly ahead of the trend. Subscribe now and be part of the
          TrendZ insider circle!
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            className="flex-1 w-full px-4 py-3 rounded-full bg-white/20 border border-white/30 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
          <button
            type="submit"
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full shadow-md hover:brightness-110 transition duration-300"
          >
            <Send className="w-4 h-4" />
            Subscribe
          </button>
        </form>

        {errors.email && (
          <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
        )}
        {isSubmitSuccessful && (
          <p className="text-green-600 text-sm mt-4">
            Subscribed successfully! 🎉
          </p>
        )}
      </div>
    </section>
  );
};

export default NewsLettter;
