import { articleHeadings, buildHeadingOutline, slugifyHeading } from "./headingOutline";
import type { PortableTextBlock, PortableTextValue } from "@/types/post";

function block(
  style: string,
  text: string,
  key: string,
): PortableTextBlock {
  return {
    _type: "block",
    _key: key,
    style,
    children: [{ _type: "span", _key: `${key}-s`, text, marks: [] }],
  };
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function run() {
  assert(
    slugifyHeading("Jak działają nagłówki?") === "jak-działają-nagłówki",
    `polish slug was ${slugifyHeading("Jak działają nagłówki?")}`,
  );
  assert(slugifyHeading("!!!") === "section", "empty slug should fall back");

  const title = "Stable anchors";
  const blocks: PortableTextValue = [
    block("h1", "Stable anchors", "title"),
    block("h1", "A second title", "other-h1"),
    block("normal", "Intro paragraph", "p1"),
    block("h2", title, "same-title"),
    block("h2", "How headings become links", "links"),
    block("h3", "Anchor IDs and scroll offset", "anchors"),
    block("h4", "Duplicate slugs in one article", "dup-a"),
    block("h3", "Anchor IDs and scroll offset", "anchors-2"),
    block("h2", "  A   heading long enough to wrap onto a second line  ", "long"),
    block("h6", "", "empty"),
    {
      _type: "codeBlock",
      _key: "code",
      code: "const id = 'h2'",
      language: "ts",
    },
  ];

  const outline = buildHeadingOutline(blocks, title);
  const ids = outline.map((item) => `${item.level}:${item.id}:${item.text}`);

  assert(
    !outline.some((item) => item.key === "title"),
    "page title h1 was included",
  );
  assert(
    outline.some((item) => item.key === "other-h1" && item.level === 1),
    "distinct h1 was dropped",
  );
  assert(
    outline.some((item) => item.key === "same-title" && item.level === 2),
    "h2 with the page title text was dropped",
  );
  assert(
    outline.some(
      (item) =>
        item.key === "long" &&
        item.text === "A heading long enough to wrap onto a second line",
    ),
    "long heading text was trimmed incorrectly",
  );
  assert(
    outline.filter((item) => item.text === "Anchor IDs and scroll offset")
      .map((item) => item.id)
      .join(",") === "anchor-ids-and-scroll-offset,anchor-ids-and-scroll-offset-anchors-2",
    `duplicate ids were ${outline
      .filter((item) => item.text === "Anchor IDs and scroll offset")
      .map((item) => item.id)
      .join(",")}`,
  );
  assert(!outline.some((item) => item.key === "empty"), "empty heading kept");
  assert(!outline.some((item) => item.key === "code"), "code block kept");
  assert(outline.some((item) => item.level === 4), "h4 was dropped");
  assert(outline.some((item) => item.level === 6) === false, "empty h6 kept");

  const fromArticle = articleHeadings(
    [block("h2", "How headings become links", "links")],
    title,
  );
  assert(
    fromArticle.length === 1 && fromArticle[0].id === "how-headings-become-links",
    `article headings were ${JSON.stringify(fromArticle)}`,
  );

  assert(ids.length === outline.length, "outline ids diverged");
  console.log("headingOutline: ok");
}

run();
