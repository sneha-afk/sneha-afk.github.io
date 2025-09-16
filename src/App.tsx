import PageLayout from "./components/PageLayout";

function App() {
  return (
    <>
      <PageLayout title="welcome" enableMathJax={true} showBackLink={false}>
        <p>content</p>
      </PageLayout>
    </>
  );
}

export default App;
