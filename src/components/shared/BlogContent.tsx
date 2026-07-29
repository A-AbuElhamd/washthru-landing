interface BlogContentProps {
  html: string;
}

export function BlogContent({ html }: BlogContentProps) {
  return (
    <div
      className="prose prose-slate max-w-none dark:prose-invert prose-headings:text-fg prose-headings:font-bold prose-p:text-fg prose-li:text-fg prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-strong:text-fg"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
