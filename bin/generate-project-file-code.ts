import { parseArgs } from "node:util";
import { readFile } from "node:fs/promises";
import type { ImportedLightPage } from "scrapbox-types/response";

const main = async () => {
  const { values: arg } = parseArgs({
    args: process.argv.slice(2),
    options: {
      title: {
        type: "string",
        multiple: true,
        default: [],
      },
      filename: {
        type: "string",
        multiple: true,
        default: [],
      },
      file: {
        type: "string",
        multiple: true,
        default: [],
      },
    },
  }) as {
    values: { title: string[]; filename: string[]; file: string[] };
  };

  if (arg.title.length === 0) {
    throw new Error("must to set `--title`");
  }
  if (arg.filename.length === 0) {
    throw new Error("must to set `--filename`");
  }
  if (arg.file.length === 0) {
    throw new Error("must to set `--file`");
  }
  if (
    arg.title.length !== arg.file.length &&
    arg.title.length !== arg.filename.length
  ) {
    throw new Error("must to equal flags `--title`, `--filename` and `--file`");
  }

  const files = await Promise.all(
    arg.file.map((file) => readFile(file, "utf-8"))
  ).then((contents) =>
    contents.map((content, i) => ({
      title: arg.title[i],
      filename: arg.filename[i],
      content,
    }))
  );
  const pages: ImportedLightPage[] = files.map((page) => ({
    title: page.title,
    lines: [
      page.title,
      `code:${page.filename}`,
      ...page.content.split("\n").map((line) => " " + line),
    ],
  }));

  console.log(JSON.stringify({ pages }));
};

main();
