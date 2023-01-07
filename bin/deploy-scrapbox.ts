import { parseArgs } from "node:util";
import { client } from "../utils/scrapbox";

const main = async () => {
  const SID = process.env.SID;
  if (!SID) {
    throw new Error("process.env.SID is not defined");
  }

  const scrapbox = client(SID);

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

  let uploadFilePath: string;
  if (process.stdin.isTTY) {
    if (!arg["upload-file"]) {
      throw new Error("must to set `--upload-file -f`");
    }
    uploadFilePath = arg["upload-file"];
  } else {
    uploadFilePath = "/dev/stdin";
  }

  const res = await scrapbox.importProject(arg["project-name"], uploadFilePath);

  if (res.status === 200) {
    console.log(res.data);
  } else {
    console.log(res);
  }
};

main();
