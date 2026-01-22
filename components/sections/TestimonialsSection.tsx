import { defineQuery } from "groq";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";

const TESTIMONIALS_QUERY = defineQuery(
  `*[_type == "testimonial" && featured == true] | order(order asc){
  name,
  position,
  company,
  testimonial,
  avatar,
  companyLogo,
  linkedinUrl
}`,
);

const TestimonialsSection = async () => {
  const { data: testimonials } = await sanityFetch({
    query: TESTIMONIALS_QUERY,
  });

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  // Map Sanity testimonials to the AnimatedTestimonials format
  const mappedTestimonials = testimonials
    .filter(
      (testimonial) =>
        testimonial.testimonial &&
        testimonial.name &&
        testimonial.position &&
        testimonial.company,
    )
    .map((testimonial) => ({
      quote: testimonial.testimonial as string,
      name: testimonial.name as string,
      designation: `${testimonial.position} at ${testimonial.company}`,
      src: testimonial.avatar
        ? urlFor(testimonial.avatar).width(500).height(500).url()
        : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500&auto=format&fit=crop",
    }));

  if (mappedTestimonials.length === 0) {
    return null;
  }

  return (
    <AnimatedTestimonials testimonials={mappedTestimonials} autoplay={true} />
  );
};

export default TestimonialsSection;
