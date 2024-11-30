import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/SignUpUserSteps";
import Header from "@/components/Header";
import { cookies } from "next/headers";

export default async function Index() {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <DeployButton />
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            laudantium vitae, repellat expedita consectetur modi quo aliquid
            sunt, sequi nesciunt est magnam aperiam, placeat in officiis ut!
            Delectus mollitia ducimus veniam molestias asperiores blanditiis
            assumenda at voluptas rem cupiditate quia deleniti dolores, iste
            aspernatur magni! Perferendis voluptatibus perspiciatis ipsam ut
            ullam nostrum nihil vitae iure sint. Iusto quae sit voluptates porro
            nam consequuntur vero qui vitae quos eum at consequatur, culpa
            praesentium dolor natus magnam explicabo voluptatem laborum.
            Nesciunt, est ipsam! Praesentium obcaecati aperiam molestiae
            adipisci tempora ad esse animi fugit asperiores cupiditate, fuga
            eius totam dolorem error vitae! Sequi similique enim quis in modi
            quo harum quod ab aut amet. Quis ipsum soluta fuga ratione, corporis
            dicta mollitia perspiciatis maiores eveniet laborum animi iure saepe
            dolore rerum quas nesciunt non, est aliquam praesentium eius nobis
            necessitatibus nemo sunt accusantium? Laboriosam eius rerum deserunt
            repellendus iure et dolorem ex nisi harum eos numquam nam voluptate
            porro magni ut explicabo deleniti, pariatur provident quis.
            Deleniti, nemo hic. Esse ducimus debitis cum sed unde labore
            accusamus est, incidunt hic eos consequatur corrupti asperiores
            ullam optio soluta sit autem sunt quae totam? Nesciunt voluptates
            labore eligendi beatae quam optio inventore? Dolores, cumque
            voluptatum.
          </p>
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
