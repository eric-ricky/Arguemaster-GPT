import MainLayout from "@/components/layout";
import {
  ArrowUpRightIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { NextPageWithLayout } from "./page";

const Home: NextPageWithLayout = () => {
  return (
    <section className="h-screen overflow-hidden">
      <div className="py-20 md:py-44 px-5 xl:px-64 lg:px-12 h-full overflow-y-scroll">
        <div className="flex flex-col md:flex-row md:space-x-10">
          <div className="md:w-1/2">
            <div className="flex items-ceter space-x-2">
              <Link
                href="/"
                className="flex items-center space-x-2 font-semibold xl:text-3xl text-2xl"
              >
                <span>😎</span>
                <span className="text-slate-100">ArgueMaster GPT</span>
              </Link>

              <p className="px-1 bg-slate-800 text-white border border-slate-700 rounded-lg text-sm grid place-items-center">
                v1.0
              </p>
            </div>

            <p className="mt-10 text-slate-200 xl:w-2/3 lg:w-[90%]">
              Put an End to 'Mr. Know-It-All' and Dominate Family Gatherings and
              Parties with Unbeatable Arguments 😅
            </p>
          </div>

          <div className="flex-grow mt-10 md:mt-0">
            <div className="w-full rounded-xl border border-slate-700 mb-10">
              <div className="p-5">
                <p className="text-slate-400">About the authors</p>
                <p className="text-white">Eric Ricky | OpenAI/GPT-3.5</p>
              </div>

              <div className="rounded-xl bg-slate-800 flex items-center space-x-5 p-2 -mb-2 text-white">
                <div className="flex items-center space-x-2">
                  <ArrowUpRightIcon className="w-4" />
                  <Link href="/" className="underline">
                    Twitter
                  </Link>
                </div>
                <div className="flex items-center space-x-2">
                  <ArrowUpRightIcon className="w-4" />
                  <Link href="/" className="underline">
                    LinkedIn
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border border-slate-500 bg-slate-700 rounded-full text-white px-2 py-1">
              <div className="flex items-center space-x-2">
                <div className="rounded-full px-2 bg-orange-200 text-orange-500 text-sm">
                  New
                </div>

                <div className="text-sm">
                  This project is open source on{" "}
                  <Link href="/" className="underline underline-offset-2">
                    GitHub
                  </Link>
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-2 pr-4">
                <ArrowUpRightIcon className="w-4" />
                <Link href="/" className="underline">
                  GitHub Repo
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-20">
          <Link
            href="/new"
            className="py-2 px-4 w-fit rounded-lg text-slate-900 font-medium bg-yellow-500 cursor-pointer hover:opacity-80 active:scale-95 duration-150 flex items-center space-x-2"
          >
            <span>Create Unbeatable Arguments</span>
            <ChevronRightIcon className="w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>;
