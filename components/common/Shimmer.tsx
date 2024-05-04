/**
 * Shimmer effect
 * @param param0
 * @returns
 */
export default function Shimmer({ w = 100, h = 10 }) {
  const shimmer = (w: any, h: any) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#dddddd" offset="20%" />
          <stop stop-color="#b1b1b1" offset="50%" />
          <stop stop-color="#dddddd" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#dddddd" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;
  return shimmer(w, h);
}
