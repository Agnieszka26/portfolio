import {expandHtmlCodeBlocks} from "./expandHtmlCodeBlocks";
import type {PortableTextBlock, PortableTextCodeBlock, PortableTextValue} from "@/types/post";

function paragraph(text: string, key = "b"): PortableTextBlock {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    children: [{_type: "span", _key: `${key}-s`, text, marks: []}],
    markDefs: [],
  };
}

function codeOf(blocks: PortableTextValue): string[] {
  return blocks
    .filter((block): block is PortableTextCodeBlock => block._type === "codeBlock")
    .map((block) => block.code);
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function run() {
  const encoded = expandHtmlCodeBlocks([
    paragraph(
      `<pre><code>const html = "&lt;/pre&gt;";\nkeepGoing();</code></pre>`,
      "encoded",
    ),
  ]);
  const encodedCode = codeOf(encoded);
  assert(encodedCode.length === 1, `encoded </pre> split into ${encodedCode.length} blocks`);
  assert(
    encodedCode[0].includes("&lt;/pre&gt;"),
    `encoded </pre> was not preserved as code: ${encodedCode[0]}`,
  );
  assert(
    encodedCode[0].includes("keepGoing();"),
    "code after encoded </pre> was dropped",
  );
  assert(
    encoded.every((block) => block._type === "codeBlock"),
    "encoded </pre> leaked as prose",
  );

  const quoted = expandHtmlCodeBlocks([
    paragraph(`<pre><code>const html = '</pre>';\nkeepGoing();</code></pre>`, "quoted"),
  ]);
  const quotedCode = codeOf(quoted);
  assert(quotedCode.length === 1, `quoted </pre> split into ${quotedCode.length} blocks`);
  assert(quotedCode[0].includes("'</pre>'"), `quoted </pre> was not preserved: ${quotedCode[0]}`);
  assert(quotedCode[0].includes("keepGoing();"), "code after quoted </pre> was dropped");

  const nested = expandHtmlCodeBlocks([
    paragraph(
      "<pre><code>const html = `<pre><code>inner</code></pre>`;</code></pre>",
      "nested",
    ),
  ]);
  const nestedCode = codeOf(nested);
  assert(nestedCode.length === 1, `nested HTML split into ${nestedCode.length} blocks`);
  assert(
    nestedCode[0].includes("<pre><code>inner</code></pre>"),
    `nested HTML was not preserved: ${nestedCode[0]}`,
  );

  const sequential = expandHtmlCodeBlocks([
    paragraph("<pre><code>first</code></pre> after <pre><code>second</code></pre>", "seq"),
  ]);
  assert(
    codeOf(sequential).join("\n") === "first\nsecond",
    `sequential fences merged: ${JSON.stringify(codeOf(sequential))}`,
  );

  console.log("expandHtmlCodeBlocks regression: ok");
}

run();
