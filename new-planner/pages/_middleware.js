import { NextResponse } from "next/server";

/** @type {import("next/server").NextMiddleware} */
export function middleware(req, ev) {
  return mobileDetect(req);

  // function
  // function
  // function
}

/**@type {import("next/server").NextMiddleware} */
function mobileDetect(req) {
  // start

  if (!req.page.name) {
    // 경로가 page에 속해있지 않을 때 (ex: 사진 등 public 경로)
    return;
  }

  const page = req.page.name.split("/")[1]; // page의 첫 경로 주소
  if (["api", "certificate"].includes(page)) {
    return;
  }

  const isMobile = (req.headers.get("user-agent") || []).indexOf("Mobi") > -1; // 모바일 여부
  const url = req.nextUrl.clone();

  if (page === "mobile") {
    if (!isMobile) {
      url.pathname = `/${url.pathname.split("/").slice(2).join("/")}`;
      return NextResponse.redirect(url);
    }
  }

  // end
}
