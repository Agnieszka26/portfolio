import type {
  PortableTextBlock,
  PortableTextCodeBlock,
  PortableTextValue,
} from "@/types/post";

/**
 * Studio pastes of <pre><code> land as literal text, often split across
 * adjacent blocks. Recover those spans as `codeBlock` objects for rendering.
 */
const FENCE_RE =
  /<pre\b[^>]*>\s*(?:<\/?code\b[^>]*>\s*)*|<\/code>\s*<\/pre>|<\/pre>\s*<\/?code\b[^>]*>|<\/pre>/gi;

const TRAILING_PROSE_RE =
  /^([\s\S]*?(?:\/>|\}|;))\n(?=[A-ZĄĆĘŁŃÓŚŹŻ„"'])([\s\S]*\s[\s\S]*)$/;

type FenceToken =
  | {type: "text"; value: string}
  | {type: "open"}
  | {type: "close"};

function isOpenFence(token: string): boolean {
  return /^<pre\b/i.test(token);
}

function tokenize(text: string): FenceToken[] {
  const tokens: FenceToken[] = [];
  let lastIndex = 0;
  const fenceRe = new RegExp(FENCE_RE.source, FENCE_RE.flags);
  let match: RegExpExecArray | null;

  while ((match = fenceRe.exec(text)) !== null) {
    const index = match.index;
    if (index > lastIndex) {
      tokens.push({type: "text", value: text.slice(lastIndex, index)});
    }
    tokens.push(isOpenFence(match[0]) ? {type: "open"} : {type: "close"});
    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    tokens.push({type: "text", value: text.slice(lastIndex)});
  }

  return tokens;
}

function hasFence(text: string): boolean {
  FENCE_RE.lastIndex = 0;
  return FENCE_RE.test(text);
}

function blockText(block: PortableTextBlock): string {
  return (block.children ?? []).map((child) => child.text ?? "").join("");
}

function cleanProse(text: string): string {
  return text.replace(/<\/?code\b[^>]*>/gi, "").replace(/^\s+|\s+$/g, "");
}

function isStructuralBlock(block: PortableTextBlock): boolean {
  return (
    block.listItem === "bullet" ||
    block.listItem === "number" ||
    block.style === "h2" ||
    block.style === "h3" ||
    block.style === "blockquote"
  );
}

export function expandHtmlCodeBlocks(
  blocks: PortableTextValue,
): PortableTextValue {
  const keys = createKeyFactory();
  const output: PortableTextValue = [];
  let inCode = false;
  const codeParts: string[] = [];

  const flushCode = () => {
    const code = codeParts.join("\n").replace(/^\n+|\n+$/g, "");
    codeParts.length = 0;
    inCode = false;
    if (!code) return;
    const codeBlock: PortableTextCodeBlock = {
      _type: "codeBlock",
      _key: keys("code"),
      code,
    };
    output.push(codeBlock);
  };

  const emitProse = (raw: string, style?: PortableTextBlock["style"]) => {
    const text = cleanProse(raw);
    if (!text) return;
    const paragraph: PortableTextBlock = {
      _type: "block",
      _key: keys("p"),
      style: style ?? "normal",
      children: [
        {
          _type: "span",
          _key: keys("span"),
          text,
          marks: [],
        },
      ],
      markDefs: [],
    };
    output.push(paragraph);
  };

  const appendCode = (chunk: string) => {
    if (!chunk) return;
    codeParts.push(chunk);
  };

  for (const block of blocks) {
    if (block._type !== "block") {
      if (inCode) flushCode();
      output.push(block);
      continue;
    }

    const text = blockText(block);
    const fenced = hasFence(text);

    if (inCode && !fenced && isStructuralBlock(block)) {
      flushCode();
      output.push(block);
      continue;
    }

    if (!inCode && !fenced) {
      output.push(block);
      continue;
    }

    if (inCode && !fenced) {
      const split = text.match(TRAILING_PROSE_RE);
      if (split) {
        appendCode(split[1]);
        flushCode();
        emitProse(split[2], block.style);
        continue;
      }
      appendCode(text);
      continue;
    }

    for (const token of tokenize(text)) {
      if (token.type === "open") {
        if (!inCode) inCode = true;
        continue;
      }
      if (token.type === "close") {
        if (inCode) flushCode();
        continue;
      }
      if (inCode) {
        appendCode(token.value);
      } else {
        emitProse(token.value, block.style);
      }
    }
  }

  if (inCode) flushCode();
  return output;
}

function createKeyFactory() {
  let index = 0;
  return (prefix: string) => `${prefix}-${++index}`;
}
