"use client";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Credential from "@/components/credential";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clipboard, ClipboardCopy } from "lucide-react";
import Navbar from "@/components/Navbar";

type Props = {
  searchParams: {
    callbackUrl: string | undefined;
    error: string | undefined;
  };
};

function SignIn({ searchParams: { callbackUrl, error } }: Props) {
  useEffect(() => {
    if (error) {
      toast("Invalid Credentials!", { autoClose: 5000, type: "error" });
    }
  }, [error]);

  const [activeDemo, setActiveDemo] = useState(false); // Default to false
  const [inputUser, setInputUser] = useState({ username: "", password: "" });

  async function submit() {
    await signIn("credentials", {
      ...inputUser,
      callbackUrl: callbackUrl || "/",
    });
  }

  return (
    <>
      <Navbar />
      <div className="bg-slate-200 h-[calc(100vh-40px)] flex justify-center items-center">
        <div className="md:w-1/4 relative bg-white rounded-lg p-5 shadow-md">
          <div className="flex mb-4 justify-between items-center">
            <h2 className="text-lg font-semibold">Please Login</h2>
            <Button
              variant="secondary"
              onClick={() => setActiveDemo(true)}
              className="py-1 px-2"
            >
              <ClipboardCopy size={20} />
            </Button>
          </div>

          {/* Demo Credentials Modal */}
          <Dialog open={activeDemo} onOpenChange={setActiveDemo}>
            <DialogContent className="w-full md:max-w-lg">
              <DialogHeader>
                <DialogTitle>Demo Credentials</DialogTitle>
              </DialogHeader>
              <Credential
                setActiveDemo={setActiveDemo}
                activeDemo={activeDemo}
              />
            </DialogContent>
          </Dialog>

          {/* Login Form */}
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Username"
              value={inputUser.username}
              onChange={(e) =>
                setInputUser((prev) => ({ ...prev, username: e.target.value }))
              }
              onKeyUp={(e) => {
                if (e.key === "Enter") submit();
              }}
            />
            <Input
              type="password"
              placeholder="Password"
              value={inputUser.password}
              onChange={(e) =>
                setInputUser((prev) => ({ ...prev, password: e.target.value }))
              }
              onKeyUp={(e) => {
                if (e.key === "Enter") submit();
              }}
            />
            <Button
              onClick={submit}
              className="w-full bg-teal-500 hover:bg-teal-600"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;

