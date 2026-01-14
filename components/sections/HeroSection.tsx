import {defineQuery} from "groq";
import {sanityFetch} from "@/sanity/lib/live";

const HERO_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  firstName,
  lastName,
  headline,
  headlineStaticText,
  headlineAnimatedWords,
  headlineAnimationDuration,
  shortBio,
  email,
  phone,
  location,
  availability,
  socialLinks,
  yearsOfExperience,
  profileImage
}`);

const HeroSection = async () => {
  const { data: profile } = await sanityFetch({ query: HERO_QUERY });
  return <div>Hero Section</div>;
};

export default HeroSection;
