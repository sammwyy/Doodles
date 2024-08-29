"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useProject from "@/hooks/use-project";
import {
  FolderOpen,
  Github,
  Heart,
  Import,
  SparkleIcon,
  Twitch,
  Twitter,
} from "lucide-react";
import { useState } from "react";

const ProjectDialog = () => {
  const [width, setWidth] = useState(1080);
  const [height, setHeight] = useState(720);
  const [fillWith, setFillWith] = useState<
    "transparent" | "white" | "black" | "green"
  >("transparent");
  const { initProject } = useProject();

  const handleCreate = () => {
    initProject({ width, height, fill: fillWith });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <SparkleIcon className="w-4 h-4 mr-2" /> New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> New Project</DialogTitle>
          <DialogDescription>
            Create a new project with a initial layer.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="width" className="text-right">
              Layer Width
            </Label>

            <Input
              id="width"
              className="col-span-3"
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="height" className="text-right">
              Layer Height
            </Label>
            <Input
              id="height"
              className="col-span-3"
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fillWith" className="text-right">
              Fill with
            </Label>
            <Select
              value={fillWith}
              onValueChange={(v) =>
                setFillWith(v as "transparent" | "white" | "black" | "green")
              }
            >
              <SelectTrigger id="fillWith" className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="transparent">Transparent</SelectItem>
                <SelectItem value="white">White</SelectItem>
                <SelectItem value="black">Black</SelectItem>
                <SelectItem value="green">Green</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full" onClick={handleCreate}>
            Create Project
          </Button>
        </div>

        <DialogFooter>
          <Button variant="outline" type="button">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default function ProjectManager() {
  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = await file.text();
    const project = JSON.parse(data);
    console.log(project);
  };

  const handleOpenImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    console.log(url);
  };

  return (
    <div className="min-h-screen flex flex-col content-center justify-center ">
      <main className="mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-2">Doodles!</h1>
        <p className="text-xl text-center text-muted-foreground mb-8">
          A open source drawing app with a familiar interface.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <ProjectDialog />

          <div className="relative">
            <Input
              type="file"
              id="import-project"
              className="sr-only"
              onChange={handleImport}
              accept=".json"
            />
            <Button variant="outline" asChild>
              <label htmlFor="import-project" className="cursor-pointer">
                <Import className="w-4 h-4 mr-2" />
                Import Project
              </label>
            </Button>
          </div>

          <div className="relative">
            <Input
              type="file"
              id="open-image"
              className="sr-only"
              onChange={handleOpenImage}
              accept="image/*"
            />
            <Button variant="outline" asChild>
              <label htmlFor="open-image" className="cursor-pointer">
                <FolderOpen className="w-4 h-4 mr-2" />
                Open Image
              </label>
            </Button>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-3 w-full text-primary-foreground">
        <div className="container mx-auto px-4 py-4 rounded-xl flex justify-between items-center bg-black max-w-[512px] w-[95%]">
          <p>Created with ❤️ by Sammwy</p>

          <div className="flex gap-4">
            <a
              href="https://x.com/sammwy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary-foreground transition-colors"
            >
              <Twitter className="w-6 h-6" />
              <span className="sr-only">Twitter / X</span>
            </a>

            <a
              href="https://twitch.tv/sammwy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary-foreground transition-colors"
            >
              <Twitch className="w-6 h-6" />
              <span className="sr-only">Twitch</span>
            </a>

            <a
              href="https://github.com/sammwyy/doodles"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary-foreground transition-colors"
            >
              <Github className="w-6 h-6" />
              <span className="sr-only">GitHub</span>
            </a>

            <a
              href="https://ko-fi.com/sammwy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary-foreground transition-colors"
            >
              <Heart className="w-6 h-6" />
              <span className="sr-only">Donate</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
