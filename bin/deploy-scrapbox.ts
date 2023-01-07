import { parseArgs } from "node:util";
import { readFile } from "node:fs/promises";
import { importProject } from "../utils/scrapbox";

const main = async () => {
  const SID = process.env.SID;
  if (!SID) {
    throw new Error("process.env.SID is not defined");
  }

  const { values: arg } = parseArgs({
    args: process.argv.slice(2),
    options: {
      "project-name": {
        type: "string",
        multiple: false,
        short: "p",
      },
      "upload-file": {
        type: "string",
        multiple: false,
        short: "f",
      },
    },
  });

  if (!arg["project-name"]) {
    throw new Error("must to set `--project-name, -p`");
  }
  if (!arg["upload-file"]) {
    throw new Error("must to set `--upload-file -u`");
  }

  const uploadFile = JSON.parse(await readFile(arg["upload-file"], "utf-8"));

  const res = await importProject(arg["project-name"], SID, uploadFile);
  if (res.status === 200) {
    console.log(await res.json());
  } else {
    console.log(res);
  }
};

main();
