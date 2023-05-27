import {
  ASTNodeTypes,
  type TxtParentNode,
  type TxtNode,
  type TxtTextNode,
  type AnyTxtNode,
} from "@textlint/ast-node-types";
import {
  parse as scrapboxParser,
  type Block,
  type Node,
} from "@progfay/scrapbox-parser";
import { Syntax } from "./syntax";

const unknownNode = {
  range: [0, 1],
  loc: {
    start: { line: 1, column: 0 },
    end: { line: 1, column: 0 },
  },
} as const;

export function parse(text: string): TxtParentNode {
  const page = scrapboxParser(text, { hasTitle: false });
  console.log(JSON.stringify(page, null, 2));

  const children = page.map((block) => blockConverter(block));

  const document: TxtParentNode = {
    type: ASTNodeTypes.Document,
    children,
    raw: text,
    range: [0, text.length],
    loc: {
      start: { line: 1, column: 0 },
      end: { line: 1, column: text.length },
    },
  };
  return document;
}

const blockConverter = (block: Block): AnyTxtNode => {
  if (block.type === "codeBlock") {
    return {
      ...unknownNode,
      type: ASTNodeTypes.CodeBlock,
      meta: block.fileName,
      value: block.content,
      raw: `code:${block.fileName}` + "\n" + block.content,
    } as TxtNode;
  } else if (block.type === "table") {
  } else if (block.type === "line") {
    if (block.indent > 0) {
    } else {
      return {
        ...unknownNode,
        type: ASTNodeTypes.Str,
        raw: block.nodes.map((node) => node.raw).join(""),
        children: block.nodes.map((node) => nodeConverter(node)),
      } as TxtNode;
    }
  }

  return {} as TxtNode;
};

const nodeConverter = (node: Node): AnyTxtNode => {
  if (node.type === "plain") {
    return {
      type: ASTNodeTypes.Str,
      raw: node.raw,
      value: node.text,
      ...unknownNode,
    } as TxtTextNode;
  }

  // if (node.type === "code") {
  //   return {
  //     type: ASTNodeTypes.CodeBlock,
  //     meta: "",
  //     raw: node.raw,
  //     value: node.text,
  //     ...unknownNode,
  //   } as TxtTextNode;
  // }

  return {} as TxtNode;
};
