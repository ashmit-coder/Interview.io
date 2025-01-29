"use client";
import copy from "copy-to-clipboard";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { users } from "./dummy";
import { CopyIcon } from "lucide-react";

interface Props {
  activeDemo: boolean;
  setActiveDemo: Dispatch<SetStateAction<boolean>>;
}

function Credential({ activeDemo, setActiveDemo }: Props) {
  const { toast } = useToast();

  return (
    <Dialog open={activeDemo} onOpenChange={setActiveDemo}>
      <DialogContent className="w-full md:max-w-lg">
        <DialogHeader>
          <DialogTitle>User Credentials</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-4">
          {users.map((item, i) => (
            <div className="my-2" key={i}>
              <h3 className="text-base font-medium">{item.name}</h3>
              <div className="bg-gray-100 p-3 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Username: <strong>{item.username}</strong>
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      copy(item.username);
                      toast({
                        title: `Copied Username`,
                        description: `${item.username} copied to clipboard.`,
                      });
                      setActiveDemo(false);
                    }}
                  >
                    <CopyIcon size={16}/>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Password: <strong>{item.password}</strong>
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      copy(item.password);
                      toast({
                        title: `Copied Password`,
                        description: `${item.password} copied to clipboard.`,
                      });
                      setActiveDemo(false);
                    }}
                  >
                    <CopyIcon size={16}/>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Credential;

function IconClose() {
  return (
    <svg fill="none" viewBox="0 0 24 24" height="1.5em" width="1.5em">
      <path
        fill="currentColor"
        d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"
      />
    </svg>
  );
}
