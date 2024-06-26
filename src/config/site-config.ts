import { LiaMapMarkedAltSolid, LiaTheaterMasksSolid, LiaHollyBerrySolid, LiaGripfire } from "react-icons/lia";

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
  title: "Travel-point",
  description:
    "국내 여행 추천 사이트입니다. 지역별 추천, 테마여행 추천, 축제 추천, 사용자 맞춤 추천기능이 있습니다.",
  copyright: "Travel-Point © All rights reserved.",
  applicationName: "Travel-Point",
  generator: "Next.js, Spring Boot",
  // referrer: "origin-when-cross-origin",
  keywords: [
    "여행지",
    "여행지추천",
    "추천",
    "국내여행",
    "국내여행 추천",
    "travel",
    "recomended",
    "지역별",
    "축제",
    "테마",
  ],
  authors: [{ name: "InhwanCho", url: "https://digital-blog-eosin.vercel.app/" }],
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
      portFolio: "https://political-rotate-326.notion.site/729d9735ee0a4c48b0c7275ceb75dcc0",
    },
  },
};

export const headerMenus = [
  {
    name: "지역",
    path: "/regions",
    icon: LiaMapMarkedAltSolid,
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
    icon: LiaTheaterMasksSolid,
    subMenus: ["자연", "역사", "체험", "레저", "웰니스"],
  },
  {
    name: "축제",
    path: "/festivals",
    icon: LiaGripfire,
    subMenus: ["진행 중", "진행 예정"],
  },
  {
    name: "추천",
    path: "/recommended",
    icon: LiaHollyBerrySolid,
    subMenus: ["진행 중", "진행 예정"],
  },
];