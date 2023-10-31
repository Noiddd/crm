"use client";

import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAtom } from "jotai";
import { currentSideBarNav } from "@/jotai/dashboard";

export default function UserLoginForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const supabaseClient = createClientComponentClient();

  const [jotaiCurrentSideBarNav, setJotaiCurrentSideBarNav] =
    useAtom(currentSideBarNav);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(true);
        console.log("ERROR");
        return;
      }

      supabaseClient.auth.onAuthStateChange((event, session) => {
        if (event == "SIGNED_IN") {
          router.push("/platform/dashboard");
          setJotaiCurrentSideBarNav("dashboard");
        }
      });
    } catch (error) {
      console.log("Something went wrong!");
    }
  };

  // if user comes into login with a session already running, will redirect to dashboard
  // useEffect(() => {
  //   supabaseClient.auth.onAuthStateChange((event, session) => {
  //     if (event == "SIGNED_IN") {
  //       router.push("/platform/dashboard");
  //       setJotaiCurrentSideBarNav("dashboard");
  //     }
  //   });
  //   console.log("--UserLoginForm--");
  //   console.log("redirect to dashboard");
  // }, []);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
  );

  // return (
  //   <div>
  //     <form onSubmit={onSubmit}>
  //       <label htmlFor="email">Email address</label>
  //       <input
  //         className="rounded"
  //         id="email"
  //         placeholder="Email"
  //         type="email"
  //         autoCapitalize="none"
  //         autoComplete="email"
  //         autoCorrect="off"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //       />
  //       <label htmlFor="password">Password</label>
  //       <input
  //         className="rounded"
  //         id="password"
  //         placeholder="Password"
  //         type="password"
  //         autoCapitalize="none"
  //         autoComplete="password"
  //         autoCorrect="off"
  //         disabled={isLoading}
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //       />
  //       <button>Submit</button>
  //     </form>
  //   </div>
  // );
}
