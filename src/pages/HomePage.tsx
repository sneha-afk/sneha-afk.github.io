import { PostList } from "@components";
import { type PageConfig } from "@pages/page_types";
import { PageRenderer } from "./PageRenderer";

export const homePage: PageConfig = {
  title: "/home",
  layout: {
    showPageTitle: false,
    showBackLink: false,
  },
  sections: [
    {
      type: "markdown",
      title: "/welcome",
      content: `
Hello! I'm Sneha (she/her) and you've found your way here!

I am currently working as a Software Engineer at [Stripe](https://stripe.com/) in San Francisco.

I got my Masters in Computer Science at [UC San Diego](https://cse.ucsd.edu/) and my Bachelor's in the same at [UC Santa Cruz](https://engineering.ucsc.edu/departments/computer-science-and-engineering/) 🍌🐌 ❤️ 🧜‍♀️🔱.

In my free time, I am probably tinkering with my config files, trying to learn how to play [Project Zomboid](https://projectzomboid.com/) properly, or trying out food in the beautiful Bay Area.

Check out my [/resume](/resume) to see my experience, or read my ramblings at my [/blog](/blog), or explore some of my [projects](/projects).

Thank you for visiting, have a good one :)`,
      emoji: "👋",
    },
    {
      type: "markdown",
      title: "/recent-posts",
      emoji: "📝",
      Component: <PostList limit={5} />,
    },
  ],
};

export default function HomePage() {
  return <PageRenderer page={homePage} />;
}
