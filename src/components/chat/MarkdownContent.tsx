import React from 'react';

interface MarkdownContentProps {
  content: string;
  isUser?: boolean;
}

interface InlineToken {
  type: 'text' | 'bold' | 'italic' | 'code' | 'link';
  content: string;
  href?: string;
}

interface ListItem {
  text: string;
  subItems?: ListItem[];
  isOrdered?: boolean;
}

type Block =
  | { type: 'heading'; level: number; text: string }
  | { type: 'code_block'; lang: string; code: string }
  | { type: 'blockquote'; text: string }
  | { type: 'hr' }
  | { type: 'unordered_list'; items: ListItem[] }
  | { type: 'ordered_list'; items: ListItem[]; start?: number }
  | { type: 'paragraph'; lines: string[] };

/**
 * Safely parse inline Markdown: bold (**), italic (* or _), inline code (`), links [text](url).
 * Never uses dangerouslySetInnerHTML; builds pure React nodes.
 */
function parseInline(text: string): React.ReactNode[] {
  if (!text) return [];

  // Match:
  // 1. Links: [label](url)
  // 2. Bold: **text** or __text__
  // 3. Inline code: `text`
  // 4. Italic: *text* or _text_
  const regex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+?\*\*|__[^_]+?__|`[^`]+?`|\*[^*]+?\*|_[^_]+?_)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Link: [label](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      // Basic safety: only allow http, https, mailto, or relative links
      const safeHref = /^(https?:\/\/|mailto:|\/|#)/i.test(href) ? href : '#';
      return (
        <a
          key={`l-${index}`}
          href={safeHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#023273] underline hover:text-[#012250] font-medium transition-colors"
        >
          {label}
        </a>
      );
    }

    // Bold: **text** or __text__
    if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('__') && part.endsWith('__'))) {
      const inner = part.slice(2, -2);
      return (
        <strong key={`b-${index}`} className="font-semibold text-slate-900">
          {parseInline(inner)}
        </strong>
      );
    }

    // Inline code: `code`
    if (part.startsWith('`') && part.endsWith('`')) {
      const inner = part.slice(1, -1);
      return (
        <code
          key={`c-${index}`}
          className="px-1.5 py-0.5 mx-0.5 rounded-md bg-slate-100 text-[#023273] text-[11px] font-mono border border-slate-200"
        >
          {inner}
        </code>
      );
    }

    // Italic: *text* or _text_
    if ((part.startsWith('*') && part.endsWith('*')) || (part.startsWith('_') && part.endsWith('_'))) {
      const inner = part.slice(1, -1);
      return (
        <em key={`i-${index}`} className="italic text-slate-700">
          {parseInline(inner)}
        </em>
      );
    }

    // Plain text
    return <React.Fragment key={`t-${index}`}>{part}</React.Fragment>;
  });
}

/**
 * Safely parse full markdown text into structured blocks without HTML injection.
 */
function parseBlocks(markdown: string): Block[] {
  const lines = markdown.split('\n');
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // 1. Skip completely empty lines
    if (!trimmed) {
      i++;
      continue;
    }

    // 2. Code block (```)
    if (trimmed.startsWith('```')) {
      const lang = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++; // skip closing ```
      blocks.push({
        type: 'code_block',
        lang,
        code: codeLines.join('\n'),
      });
      continue;
    }

    // 3. Horizontal Rule (---, ***, ___)
    if (/^(?:---|\*\*\*|___)\s*$/.test(trimmed)) {
      blocks.push({ type: 'hr' });
      i++;
      continue;
    }

    // 4. Headings (#, ##, ###, ####, #####, ######)
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      blocks.push({ type: 'heading', level, text });
      i++;
      continue;
    }

    // 5. Blockquote (> ...)
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      blocks.push({
        type: 'blockquote',
        text: quoteLines.join(' '),
      });
      continue;
    }

    // 6. Ordered List or Unordered List
    const isOrdered = /^\s*(\d+)\.\s+(.*)$/.test(rawLine);
    const isUnordered = /^\s*[-*+]\s+(.*)$/.test(rawLine);

    if (isOrdered || isUnordered) {
      const listType = isOrdered ? 'ordered_list' : 'unordered_list';
      const items: ListItem[] = [];

      while (i < lines.length) {
        const curLine = lines[i];
        if (!curLine.trim()) {
          // Check if list continues after a single blank line
          if (i + 1 < lines.length) {
            const nextLine = lines[i + 1];
            if (/^\s*(\d+\.|[-*+])\s+/.test(nextLine)) {
              i++;
              continue;
            }
          }
          break;
        }

        const oMatch = curLine.match(/^(\s*)(\d+)\.\s+(.*)$/);
        const uMatch = curLine.match(/^(\s*)([-*+])\s+(.*)$/);

        if (oMatch) {
          const indent = oMatch[1].length;
          const text = oMatch[3].trim();
          if (indent >= 2 && items.length > 0) {
            // Nested under last item
            const last = items[items.length - 1];
            last.subItems = last.subItems || [];
            last.subItems.push({ text, isOrdered: true });
          } else {
            items.push({ text, isOrdered: true });
          }
          i++;
        } else if (uMatch) {
          const indent = uMatch[1].length;
          const text = uMatch[3].trim();
          if (indent >= 2 && items.length > 0) {
            // Nested under last item
            const last = items[items.length - 1];
            last.subItems = last.subItems || [];
            last.subItems.push({ text, isOrdered: false });
          } else {
            items.push({ text, isOrdered: false });
          }
          i++;
        } else {
          // If indented continuation line
          if (/^\s{2,}/.test(curLine) && items.length > 0) {
            const last = items[items.length - 1];
            last.text += ' ' + curLine.trim();
            i++;
          } else {
            break;
          }
        }
      }

      if (listType === 'ordered_list') {
        blocks.push({ type: 'ordered_list', items });
      } else {
        blocks.push({ type: 'unordered_list', items });
      }
      continue;
    }

    // 7. Regular Paragraph
    const paragraphLines: string[] = [];
    while (i < lines.length) {
      const line = lines[i];
      const trimLine = line.trim();
      if (!trimLine) break;

      // Stop if new block starts
      if (
        trimLine.startsWith('```') ||
        /^(?:---|\*\*\*|___)\s*$/.test(trimLine) ||
        /^#{1,6}\s+/.test(trimLine) ||
        trimLine.startsWith('>') ||
        /^\s*(\d+\.|[-*+])\s+/.test(line)
      ) {
        break;
      }

      paragraphLines.push(trimLine);
      i++;
    }

    if (paragraphLines.length > 0) {
      blocks.push({ type: 'paragraph', lines: paragraphLines });
    }
  }

  return blocks;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ content, isUser = false }) => {
  if (isUser) {
    // For user messages, simple clean display with linebreaks preserved and bold supported
    return (
      <div className="font-sans leading-relaxed text-sm whitespace-pre-wrap break-words">
        {content}
      </div>
    );
  }

  const blocks = parseBlocks(content);

  return (
    <div className="font-sans text-xs sm:text-sm text-slate-800 space-y-3 leading-relaxed break-words">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'heading': {
            const headingContent = parseInline(block.text);
            if (block.level === 1) {
              return (
                <h1
                  key={idx}
                  className="text-base sm:text-lg font-bold text-slate-900 pb-1.5 border-b border-slate-200 mt-3 mb-1.5"
                >
                  {headingContent}
                </h1>
              );
            }
            if (block.level === 2) {
              return (
                <h2
                  key={idx}
                  className="text-sm sm:text-base font-bold text-slate-900 mt-2.5 mb-1"
                >
                  {headingContent}
                </h2>
              );
            }
            if (block.level === 3) {
              return (
                <h3
                  key={idx}
                  className="text-xs sm:text-sm font-bold text-[#023273] flex items-center gap-2 mt-2 mb-1"
                >
                  <span className="w-1.5 h-3.5 bg-[#023273] rounded-full shrink-0" />
                  <span>{headingContent}</span>
                </h3>
              );
            }
            return (
              <h4
                key={idx}
                className="text-xs sm:text-sm font-semibold text-slate-800 mt-1.5 mb-0.5"
              >
                {headingContent}
              </h4>
            );
          }

          case 'paragraph': {
            return (
              <p key={idx} className="text-slate-700 leading-relaxed my-1.5">
                {block.lines.map((line, lineIdx) => (
                  <React.Fragment key={lineIdx}>
                    {parseInline(line)}
                    {lineIdx < block.lines.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            );
          }

          case 'unordered_list': {
            return (
              <ul key={idx} className="space-y-1.5 my-2 pl-4 list-disc marker:text-[#023273] text-slate-700">
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="leading-relaxed pl-0.5">
                    {parseInline(item.text)}
                    {item.subItems && item.subItems.length > 0 && (
                      <ul className="mt-1 space-y-1 pl-4 list-circle marker:text-slate-400 text-slate-600 text-xs">
                        {item.subItems.map((sub, subIdx) => (
                          <li key={subIdx} className="leading-relaxed">
                            {parseInline(sub.text)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            );
          }

          case 'ordered_list': {
            return (
              <ol key={idx} className="space-y-1.5 my-2 pl-4 list-decimal marker:text-[#023273] marker:font-semibold text-slate-700">
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="leading-relaxed pl-0.5">
                    {parseInline(item.text)}
                    {item.subItems && item.subItems.length > 0 && (
                      <ul className="mt-1 space-y-1 pl-4 list-disc marker:text-slate-400 text-slate-600 text-xs">
                        {item.subItems.map((sub, subIdx) => (
                          <li key={subIdx} className="leading-relaxed">
                            {parseInline(sub.text)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            );
          }

          case 'blockquote': {
            return (
              <blockquote
                key={idx}
                className="border-l-3 border-[#023273] pl-3 py-1 my-2 bg-slate-50/80 rounded-r-lg text-slate-700 italic text-xs sm:text-sm"
              >
                {parseInline(block.text)}
              </blockquote>
            );
          }

          case 'code_block': {
            return (
              <div key={idx} className="my-2 rounded-xl overflow-hidden border border-slate-700/60 bg-slate-900">
                {block.lang && (
                  <div className="px-3 py-1 bg-slate-800 text-[10px] uppercase font-mono tracking-wider text-slate-400 border-b border-slate-700/50">
                    {block.lang}
                  </div>
                )}
                <pre className="p-3 text-slate-100 text-xs font-mono overflow-x-auto leading-relaxed">
                  <code>{block.code}</code>
                </pre>
              </div>
            );
          }

          case 'hr': {
            return <hr key={idx} className="my-3 border-slate-200" />;
          }

          default:
            return null;
        }
      })}
    </div>
  );
};
