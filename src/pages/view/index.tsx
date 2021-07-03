/* eslint-disable react-hooks/exhaustive-deps */
import firebase from 'firebase'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { config } from '../calc'
import { TeamCard } from '../../components/TeamCard'
import { GrRefresh } from 'react-icons/gr'

const ViewScores: React.FC = () => {
  const fb = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()

  const [loading, setLoading] = useState<boolean>(true)

  const [retrievedData, setRetrievedData] = useState([])

  useEffect(() => {
    const unsubscribe = fb
      .firestore()
      .collection('scores')
      .onSnapshot((snapshot) => {
        if (snapshot.size) {
          const myData = []
          snapshot.forEach((doc) => myData.push({ ...doc.data() }))
          setRetrievedData(myData)
          console.log(myData)
          setLoading(false)
        } else {
          alert('No Data Found')
          setLoading(false)
        }
      })

    return () => {
      unsubscribe()
    }
  }, [fb])

  return loading ? (
    <div className=" flex flex-row w-[100vw] h-[100vh] font-questrial text-4xl items-center text-center justify-center">
      Collecting Data
    </div>
  ) : (
    <>
      <head>
        <title>Scores | Stumble Guys Competition</title>
      </head>
      <div
        className="flex flex-col w-[100vw] lg:h-[100vh]  items-center justify-center px-2 py-10 lg:px-10 bg-local bg-center overflow-x-hidden"
        style={{
          background:
            "url('https://gmedia.playstation.com/is/image/SIEPDC/fall-guys-ultimate-knockout-hero-01-en-20mar21?$native$')",
        }}
      >
        <div className="self-center grid grid-cols-1 gap-3">
          {retrievedData.map((data, i) => (
            <TeamCard
              disabled
              teamName={data.teamName}
              teamScore={data.teamScore}
              teamTag={data.teamTag}
              key={i}
              className={
                i === 0
                  ? 'from-[#ff000b] to-[#ecaeb4]'
                  : i === 1
                  ? 'from-[#ffc20b] to-[#ecd9a9]'
                  : i === 2
                  ? 'from-[#04c20b] to-[#ecd9a9]'
                  : i === 3
                  ? 'from-[#04c2b3] to-[#54e5a9]'
                  : 'from-[#7e3bdb] to-[#a956a9]'
              }
            />
          ))}
          <button
            className="flex flex-row relative items-center border-2 rounded-lg border-blue-700 bg-blue-200 font-questrial p-2"
            onClick={() => window.location.reload()}
          >
            <GrRefresh size={20} />
            <p className="absolute transform -translate-x-1/2 left-1/2">Refresh Scores</p>
          </button>
        </div>
      </div>
    </>
  )
}

export default ViewScores
