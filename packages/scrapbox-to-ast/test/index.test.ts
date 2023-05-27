import { describe, test, expect, assert } from "vitest";
import { parse, Syntax } from "../src";

describe("suite", () => {
  describe("Document", () => {
    test("should return AST", () => {
      const text = "";
      const ast = parse(text);
      expect(ast).toMatchInlineSnapshot(`
        {
          "children": [
            {
              "children": [],
              "loc": {
                "end": {
                  "column": 0,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                },
              },
              "range": [
                0,
                1,
              ],
              "raw": "",
              "type": "Str",
            },
          ],
          "loc": {
            "end": {
              "column": 0,
              "line": 1,
            },
            "start": {
              "column": 0,
              "line": 1,
            },
          },
          "range": [
            0,
            0,
          ],
          "raw": "",
          "type": "Document",
        }
      `);
    });
  });

  describe("Str", () => {
    test("should return AST", () => {
      const text = "text";
      const ast = parse(text);
      expect(ast).toMatchInlineSnapshot(`
        {
          "children": [
            {
              "children": [
                {
                  "loc": {
                    "end": {
                      "column": 0,
                      "line": 1,
                    },
                    "start": {
                      "column": 0,
                      "line": 1,
                    },
                  },
                  "range": [
                    0,
                    1,
                  ],
                  "raw": "text",
                  "type": "Str",
                  "value": "text",
                },
              ],
              "loc": {
                "end": {
                  "column": 0,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                },
              },
              "range": [
                0,
                1,
              ],
              "raw": "text",
              "type": "Str",
            },
          ],
          "loc": {
            "end": {
              "column": 4,
              "line": 1,
            },
            "start": {
              "column": 0,
              "line": 1,
            },
          },
          "range": [
            0,
            4,
          ],
          "raw": "text",
          "type": "Document",
        }
      `);
    });
  });

  describe("CodeBlock", () => {
    test("should return AST", () => {
      const text = `code:index.js
 function greet(name) {
   console.log(name);
 }`;
      const ast = parse(text);
      expect(ast).toMatchInlineSnapshot(`
        {
          "children": [
            {
              "loc": {
                "end": {
                  "column": 0,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                },
              },
              "meta": "index.js",
              "range": [
                0,
                1,
              ],
              "raw": "code:index.js
        function greet(name) {
          console.log(name);
        }",
              "type": "CodeBlock",
              "value": "function greet(name) {
          console.log(name);
        }",
            },
          ],
          "loc": {
            "end": {
              "column": 62,
              "line": 1,
            },
            "start": {
              "column": 0,
              "line": 1,
            },
          },
          "range": [
            0,
            62,
          ],
          "raw": "code:index.js
         function greet(name) {
           console.log(name);
         }",
          "type": "Document",
        }
      `);
    });
  });

  describe("List", () => {
    test("should return AST", () => {
      const text = ` list 1
 list 2-1
 list 2-2
  list 2-2-1
 list 3`;
      const ast = parse(text);
      expect(ast).toMatchInlineSnapshot(`
        {
          "children": [
            {},
            {},
            {},
            {},
            {},
          ],
          "loc": {
            "end": {
              "column": 48,
              "line": 1,
            },
            "start": {
              "column": 0,
              "line": 1,
            },
          },
          "range": [
            0,
            48,
          ],
          "raw": " list 1
         list 2-1
         list 2-2
          list 2-2-1
         list 3",
          "type": "Document",
        }
      `);
    });
  });
});
