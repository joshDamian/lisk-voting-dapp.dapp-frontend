import { Home } from "@/components/home";
import { NextPageWithLayout } from "./_app";
import { Layout } from "@/components/layout";

const HomePage: NextPageWithLayout = () => {
  return <Home />;
};

HomePage.getLayout = (page) => <Layout>{page}</Layout>;

export default HomePage;
