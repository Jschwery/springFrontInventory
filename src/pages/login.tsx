import CardContainer from "../components/cardContainer";

function Home() {
  return (
    <div className="w-screen h-screen bg-tea">
      <div className="w-1/2 flex h-auto bg-slate-600">
        <CardContainer
          numberOfRows={2}
          rowTitles={["Email", "Password"]}
          submitButtonText="Sign in"
          containerTitle="Login"
          additionalText={["Dont have an account?", "Sign up"]}
          setLink="/register"
        />
      </div>
    </div>
  );
}

export default Home;
