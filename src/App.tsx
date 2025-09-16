import NavigationBar from "./components/NavigationBar";

function App() {
  const headerNav = [
    { name: "/home", url: "/" },
    { name: "/projects", url: "/projects" },
    { name: "/resume", url: "/resume" },
  ];

  const footerNav = [
    { name: "/github", url: "https://github.com/sneha-afk" },
    { name: "/linkedin", url: "https://www.linkedin.com/in/sneha-de/" },
  ];

  return (
    <>
      <NavigationBar navigation={headerNav} />
      <main>
        <h1>yey</h1>
      </main>
      <NavigationBar title="" navigation={footerNav} />
    </>
  );
}

export default App;
