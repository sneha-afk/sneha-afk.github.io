import { PageLayout, PostList, Section } from "@components";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <PageLayout title="Welcome" showBackLink={false} showPageTitle={false}>
      <Section title="/welcome" emoji="👋">
        <p>hello, i'm sneha (she/her) and you've found your way here!</p>

        <p>
          I am currently working as a Software Engineer at{" "}
          <a
            href="https://stripe.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stripe
          </a>{" "}
          in San Francisco.
        </p>

        <p>
          I obtained my Masters in Computer Science at{" "}
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
