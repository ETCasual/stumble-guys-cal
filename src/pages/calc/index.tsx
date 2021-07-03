/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'
import firebase from 'firebase'
import router, { useRouter } from 'next/router'

import { TeamCard } from '../../components/TeamCard'
import { GetServerSideProps } from 'next'

export const config = {
  apiKey: 'AIzaSyClCzH5emlV0oFozXlZJv7kU0cusR9Bw2M',
  authDomain: 'stumbleguysscorecal.firebaseapp.com',
  projectId: 'stumbleguysscorecal',
  storageBucket: 'stumbleguysscorecal.appspot.com',
  messagingSenderId: '377306190842',
  appId: '1:377306190842:web:3b9551b0ba514085740a43',
}

interface IndexPageProps {
  parsedDoc1
  parsedDoc2
  parsedDoc3
  parsedDoc5
}

const IndexPage: React.FC<IndexPageProps> = ({
  parsedDoc1,
  parsedDoc2,
  parsedDoc3,
  parsedDoc5,
}) => {
  const router = useRouter()
  useEffect(() => {
    const prev = sessionStorage.getItem('prevPath')
    const current = sessionStorage.getItem('currentPath')
    if (prev != '/' || current != '/calc') {
      const pw = prompt('Please Enter password: ')
      if (pw != 'stumbleguysggwp') {
        alert('Wrong Password! Redirecting You Now!')
        router.push('/')
      } else alert('Correct Password! Welcome Back!')
    } else return
  }, [router])
  return (
    <>
      <head>
        <title>Record Scores | Stumble Guys Competition</title>
      </head>
      <div
        className="flex flex-col w-[100vw] lg:w-[100vh] justify-center px-2 py-10 lg:px-10 bg-local bg-center overflow-x-hidden"
        style={{
          background:
            "url('https://gmedia.playstation.com/is/image/SIEPDC/fall-guys-ultimate-knockout-hero-01-en-20mar21?$native$')",
        }}
      >
        <div className="grid grid-rows-1 gap-5">
          <TeamCard
            className="from-[#ff000b] to-[#ecaeb4]"
            teamName={parsedDoc1.teamName}
            teamScore={parsedDoc1.teamScore}
            teamTag={parsedDoc1.teamTag}
          />
          <TeamCard
            className="from-[#ffc20b] to-[#ecd9a9]"
            teamName={parsedDoc2.teamName}
            teamScore={parsedDoc2.teamScore}
            teamTag={parsedDoc2.teamTag}
          />
          <TeamCard
            className="from-[#04c20b] to-[#ecd9a9]"
            teamName={parsedDoc3.teamName}
            teamScore={parsedDoc3.teamScore}
            teamTag={parsedDoc3.teamTag}
          />
          <TeamCard
            className="from-[#04c2b3] to-[#54e5a9]"
            teamName={parsedDoc5.teamName}
            teamScore={parsedDoc5.teamScore}
            teamTag={parsedDoc5.teamTag}
          />
        </div>
      </div>
    </>
  )
}

export default IndexPage

export const getServerSideProps: GetServerSideProps = async () => {
  const fb = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()

  const collectionRef1 = fb.firestore().collection('scores').doc('ET')
  const doc1 = await (await collectionRef1.get()).data()

  const collectionRef2 = fb.firestore().collection('scores').doc('Zheng Xuan')
  const doc2 = await (await collectionRef2.get()).data()

  const collectionRef3 = fb.firestore().collection('scores').doc('Yun Qi')
  const doc3 = await (await collectionRef3.get()).data()

  const collectionRef5 = fb.firestore().collection('scores').doc('Jia Yue')
  const doc5 = await (await collectionRef5.get()).data()

  const parsedDoc1 = JSON.parse(JSON.stringify(doc1))
  const parsedDoc2 = JSON.parse(JSON.stringify(doc2))
  const parsedDoc3 = JSON.parse(JSON.stringify(doc3))
  const parsedDoc5 = JSON.parse(JSON.stringify(doc5))
  return { props: { parsedDoc1, parsedDoc2, parsedDoc3, parsedDoc5 } }
}
