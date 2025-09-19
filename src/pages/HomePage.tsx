import { PageLayout, PostList, Section } from "@components";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <PageLayout title="Welcome" showBackLink={false} showPageTitle={false}>
      <Section title="/welcome" emoji="👋">
        <p>hello, i'm sneha (she/her) and you've found your way here!</p>

        <p>
          I am currently a Master's student in Computer Science at{" "}
          <a
            href="https://cse.ucsd.edu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            UC San Diego
          </a>{" "}
          and obtained my Bachelor's in the same at{" "}
          <a
            href="https://engineering.ucsc.edu/departments/computer-science-and-engineering/"
            target="_blank"
            rel="noopener noreferrer"
          >
            UC Santa Cruz
          </a>{" "}
          🍌🐌 ❤️ 🧜‍♀️🔱.
        </p>

        <p>
          In my quest to know a bit of everything, my interests in tech lie
          primarily in OS and systems development, networked services, and
          AI/ML.
        </p>

        <p>
          Outside of CS, I love to travel and try new food from any cuisine. And
          for a fun fact, I practiced Shotokan karate for eight years and
          reached Sandan (3rd degree black belt)!
        </p>

        <p>
          See my resume at{" "}
          <Link key={"/resume"} to={"/resume"}>
            {"/resume"}
          </Link>{" "}
          for more details on my experience.
        </p>

        <p>Thank you for visiting, have a good one :)</p>
      </Section>

      <Section title="/recent-posts" emoji="📝">
        <PostList limit={5} />
      </Section>
    </PageLayout>
  );
};

export default HomePage;
