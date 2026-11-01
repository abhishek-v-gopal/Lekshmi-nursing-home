// Turns a YouTube watch / youtu.be / live link into an embeddable player URL; returns null for other links.
export const youtubeEmbed = (url: string, autoplay = false) => {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|live\/|embed\/))([\w-]{11})/);
  return m ? `https://www.youtube-nocookie.com/embed/${m[1]}${autoplay ? "?autoplay=1" : ""}` : null;
};
