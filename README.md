# Home for iamjeevan.com

This is the repository for the [iamjeevan](https://iamjeevan.com)

Based on [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog/)

# Cursor Rules

**Avoid Nested Code Blocks in Blog Posts**
- Do NOT use triple backticks (```) inside another triple backtick code block in any markdown/MDX blog post (e.g., in `data/blog/`).
- MDX does not support nested code fences and this will cause build errors.
- If you need to show code-within-code, use 4-space indentation for the inner code, or use a single code block and clearly comment or separate the sections.
