/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { useRouter } from 'next/router'
import { BsClipboardData } from 'react-icons/bs'
import { GoPerson } from 'react-icons/go'

const StartPage: React.FC = () => {
  const passwordPrompt = () => {
    const pw = window.prompt('Please Enter Password')
    if (pw != 'stumbleguysggwp') {
      alert('Wrong Password!')
    } else {
      alert('Correct Password! Redirecting You Now!')
      router.push('/calc')
    }
  }
  const router = useRouter()
  return (
    <>
      <head>
        <title>Dawn Hui Small Team | Stumble Guys Competition</title>
      </head>
      <div
        className="flex flex-col w-[100vw] h-[100vh] px-4 py-10 lg:px-10 bg-local bg-center overflow-hidden justify-center"
        style={{
          background:
            "url('https://gmedia.playstation.com/is/image/SIEPDC/fall-guys-ultimate-knockout-hero-01-en-20mar21?$native$')",
        }}
      >
        <p className="font-montserrat font-bold text-2xl text-center text-white">
          | Dawn Hui Small Team |<br />
          Stumble Guys Competition
        </p>
        <div className="grid grid-cols-1 gap-5 mt-5 w-[325px] mx-auto">
          <button
            className=" p-5 w-full h-[200px] bg-red-500 rounded-md bg-gradient-to-tr from-[#ff000b] to-[#ecaeb4] flex flex-col items-center focus-within:outline-none transform ease-in-out duration-300 hover:scale-[1.05]"
            onClick={() => {
              router.push('/view')
            }}
          >
            <BsClipboardData size={100} color="white" />
            <p className="font-montserrat text-2xl font-bold text-white my-auto">View Score</p>
          </button>
          <button
            className=" p-5 w-full h-[200px] bg-red-500 rounded-md bg-gradient-to-tr from-[#04c20b] to-[#ecd9a9] flex flex-col items-center focus-within:outline-none transform ease-in-out duration-300 hover:scale-[1.05]"
            onClick={() => {
              passwordPrompt()
            }}
          >
            <GoPerson size={100} color="white" />
            <p className="font-montserrat text-2xl font-bold text-white my-auto">Record Score</p>
          </button>
        </div>
      </div>
    </>
  )
}

export default StartPage
