// Formerly gatsby-config.ts's `siteMetadata`, read there via useStaticQuery.
export const siteMetadata = {
  title: "itsrakesh - Rakesh Potnuru",
  description:
    "I'm Rakesh - a software engineer, tech enthusiast and product creator with expertise in building innovative tools and products.",
  siteUrl: "https://itsrakesh.com",
  feedUrl: "https://itsrakesh.com/rss.xml",
  twitterUsername: "@rakesh_at_tweet",
  image: "/og.png",
  author: "Rakesh Potnuru",
};

export const siteConfig = {
  author: "Rakesh Potnuru",
  url: "https://itsrakesh.com",
  links: {
    github: "https://rksh.link/github",
    linkedin: "https://rksh.link/linkedin",
    medium: "https://rksh.link/medium",
    psn: "https://rksh.link/psn",
    twitter: "https://rksh.link/x",
    email: "mailto:rakesh@itsrakesh.com",
    peerlist: "https://rksh.link/peerlist",
    blog: "https://rksh.link/blog",
    disposableEmailChecker: "https://disposable.debounce.io/?email=",
    youtube: "https://rksh.link/youtube",
    ytPlaylists: "https://www.youtube.com/@rakeshpotnuru/playlists",
    donate: "https://rksh.link/donate",
    adLink: "https://myonepost.com",
    upi: "rakeshpotnuru@axisb",
  },
  pages: {
    home: {
      title: "Home",
      link: "/",
    },
    about: {
      title: "About",
      link: "/about",
      description: "Learn more about me",
    },
    contact: {
      title: "Contact",
      link: "/contact",
      description: "Get in touch with me",
    },
    projects: {
      title: "Projects",
      link: "/projects",
      description: "Check out my projects",
    },
    blog: {
      title: "Blog",
      link: "/blog",
      description: "Read my blog",
    },
    series: {
      title: "Series",
      link: "/blog/series",
      description: "Check out my series",
    },
    snippets: {
      title: "Snippets",
      link: "/snippets",
      description: "Check out these helpful and reusable code snippets",
    },
  },
  hideBanner: true,
};
