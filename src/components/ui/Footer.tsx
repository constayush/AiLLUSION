import React from 'react'

function Footer() {
  return (<footer className="w-full  min-h-[25vh]  flex flex-col justify-center  relative mt-12">
    <div className="absolute -z-1 w-[90%] h-[50%] section-gradient blur-[200px] "></div>
    <hr className="border-[#ffffff33] w-full" />
    <div className="w-full flex justify-between items-center gap-4 grid-bg py-8 px-16">
      <h1 className="text-3xl">Incognito Art</h1>
      <a target="_blank" href="https://constayush.vercel.app">
      &copy; 2025 Ayush. All rights reserved.
      </a>
    </div>
  </footer>)
}

export default Footer