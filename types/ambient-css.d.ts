declare module "*.css" {
  const content: unknown;
  export default content;
}

// Allow side-effect CSS imports like: import "./globals.css";
declare module "*.css?*" {
  const content: unknown;
  export default content;
}
