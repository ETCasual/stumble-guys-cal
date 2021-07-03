import React, { useState } from 'react'
import { CgMathMinus, CgMathPlus } from 'react-icons/cg'
import { TiTick } from 'react-icons/ti'
import firebase from 'firebase'
import { config } from '../pages/calc'

interface TeamCardProps {
  teamName: string
  teamTag: string
  teamScore: number
  className?: string
  disabled?: boolean
}

export const TeamCard: React.FC<TeamCardProps> = ({
  teamName,
  teamTag,
  teamScore,
  className,
  disabled,
}) => {
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [number, setNumber] = useState<number>(teamScore)

  const handleSubmit = async (): Promise<void> => {
    const fb = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()

    const collectionRef = fb.firestore().collection('scores').doc(teamName)
    try {
      await collectionRef
        .update({
          teamScore: number,
        })
        .then((res) => {
          alert('Updated!')
          console.log(res)
        })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div
      className={`flex flex-row  items-center bg-gradient-to-tr ${className} h-[130px] shadow-xl rounded-xl p-5 w-[350px] mx-auto`}
    >
      <div className="flex flex-row w-full">
        <p className="text-white text-3xl text-center w-full font-questrial">
          {teamName} <span className="text-lg">{teamTag}</span>
        </p>
        <div className={`flex flex-row items-center justify-between w-[500px]`}>
          {!disabled ? (
            <button
              className={`p-3 bg-[#00aeef] rounded-md shadow-2xl ${
                number === 0 ? 'invisible' : 'visible'
              }`}
              onClick={() => {
                setNumber(number - 10)
                setIsClicked(true)
              }}
            >
              <CgMathMinus color="white" className="scale-[1.5]" />
            </button>
          ) : null}
          <div
            className={`font-questrial text-white text-4xl  ${
              disabled ? 'text-center w-full' : null
            }`}
          >
            {number}
          </div>
          {!disabled ? (
            <button
              className="p-3 bg-[#00aeef] rounded-md shadow-2xl"
              onClick={() => {
                setNumber(number + 10)
                setIsClicked(true)
              }}
            >
              <CgMathPlus color="white" className="scale-[1.5]" />
            </button>
          ) : null}

          {!disabled ? (
            <button
              className={`p-3 bg-[#39b54a] rounded-md shadow-2xl ${
                isClicked === true ? 'visible' : 'invisible'
              }`}
              onClick={() => {
                setIsClicked(false)
                handleSubmit()
              }}
            >
              <TiTick color="white" className="scale-[1.5]" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
