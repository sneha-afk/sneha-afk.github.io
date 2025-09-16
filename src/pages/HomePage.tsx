import PageLayout from "../components/PageLayout";

const HomePage = () => {
  // TODO: figure this out...
  const recentPosts = [
    {
      date: "2025-01-15",
      title: "lol",
      url: "/posts/lol",
    },
  ];

  return (
    <PageLayout title="Welcome" showBackLink={false} showPageTitle={false}>
      <div>
        <section>
          <h2>/welcome</h2>
          <p>hello, i'm sneha (she/her) and you've found your way here!</p>
          <hr />

          <div>
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
              Outside of CS, I love to travel and try new food from any cuisine.
              And for a fun fact, I practiced Shotokan karate for eight years
              and reached Sandan (3rd degree black belt)!
            </p>

            <p>
              See my resume at <a href="/resume">/resume</a> for more details on
              my experience.
            </p>

            <p>Thank you for visiting, have a good one :)</p>
          </div>
        </section>

        <section>
          <h2>/recent-posts</h2>
          <div>
            {recentPosts.map((post, index) => (
              <div key={index}>
                <code>{post.date}</code>{" "}
                <strong>
                  <a href={post.url}>{post.title}</a>
                </strong>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default HomePage;
