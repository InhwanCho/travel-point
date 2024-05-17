export const siteConfig = {
  url: "http://localhost:3000",
  title: "Travel-point",
  description: "여행지 추천",
  copyright: "Travel-Point © All rights reserved.",
  applicationName: "Travel-Point",
  generator: "Next.js, Spring Boot",
  // referrer: "origin-when-cross-origin",
  keywords: [""],
  authors: [{ name: "InhwanCho", url: "https://example.com" }],
  creator: "InhwanCho",
  publisher: "InhwanCho",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  since: 2024,
  googleAnalyticsId: "",
  locale: "ko-KR",
  twitterHandle: "@wh_dlsghks",
  author: {
    name: "InhwanCho",
    photo:
      "https://github.com/InhwanCho/portfolio/assets/111936229/53aecb04-94b4-4e05-8711-81b14c3eccc7",
    bio: "Frontend Developer",
    contacts: {
      email: "wh_dlsghks@naver.com",
      github: "https://github.com/InhwanCho",
      portFolio: "https://portfolio-nu-nine-86.vercel.app/",
    },
  },
};

export const headerMenus = [
  {
    name: "지역",
    path: "/regions",
    subMenus: [
      "서울",
      "경기",
      "인천",
      "강원",
      "경북",
      "경남",
      "대구",
      "부산",
      "울산",
      "전남",
      "전북",
      "제주",
      "대전",
      "충남",
      "충북",
      "광주",
    ],
  },
  {
    name: "테마",
    path: "/themes",
    subMenus: ["자연", "역사", "체험", "레저", "웰니스"],
  },
  {
    name: "축제",
    path: "/festivals",
    subMenus: ["진행 중", "진행 예정"],
  },
  {
    name: "추천",
    path: "/recommended",
    subMenus: ["진행 중", "진행 예정"],
  }
];



