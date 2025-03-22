import { cn } from "@/lib/utils";

interface Props {
  html: string;
  className?: string;
}

const RenderHtml = ({ html, className }: Props) => {
  return (
    <div
      className={cn("ProseMirror tiptap rounded-lg max-w-full", className)}
      dangerouslySetInnerHTML={{
        __html: wrapTablesAndImages(html),
      }}
    />
  );
};

export default RenderHtml;

// Function to wrap tables and group consecutive images
function wrapTablesAndImages(html: string): string {
  let updatedHtml = html;

  // Wrap <table> elements
  updatedHtml = updatedHtml.replace(
    /<table([\s\S]*?)<\/table>/gi,
    (match) => `<div class="tableWrapper">${match}</div>`
  );

  // Group only two or more consecutive <img> elements
  updatedHtml = updatedHtml.replace(/(<img[\s\S]*?>\s*){2,}/gi, (match) => {
    // Extract all <img> tags and apply custom styling
    const images =
      match
        .match(/<img[\s\S]*?>/g) // Extract individual <img> tags
        ?.map((img) =>
          img.replace(
            /<img([\s\S]*?)>/,
            `<img $1 class="customImage rounded-lg shadow-md max-w-full w-full h-full" loading="lazy" />`
          )
        )
        .join("") || "";

    return `<div class="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 my-4">${images}</div>`;
  });

  return updatedHtml;
}
