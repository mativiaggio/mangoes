import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";
import { CompleteWebsiteInfo } from "@/database/website/types";

type Props = {
  website: CompleteWebsiteInfo;
};

export default function HomeDefault({ website }: Props) {
  return (
    <div className="flex flex-col">
      <Navbar website={website} />
      <main className={"w-full flex flex-col items-center py-12"}></main>
      <Footer website={website} />
    </div>
  );
}
