/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import firebase from 'firebase'

import { TeamCard } from '../components/TeamCard'
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
  parsedDoc4
  parsedDoc5
}

const IndexPage: React.FC<IndexPageProps> = ({
  parsedDoc1,
  parsedDoc2,
  parsedDoc3,
  parsedDoc4,
  parsedDoc5,
}) => {
  return (
    <>
      <head>
        <title>Dawn Hui Small Team | Stumble Guys Competition</title>
      </head>
      <div
        className="flex flex-col w-full h-full p-10 bg-local bg-center overflow-hidden"
        style={{
          background:
            "url('https://gmedia.playstation.com/is/image/SIEPDC/fall-guys-ultimate-knockout-hero-01-en-20mar21?$native$')",
        }}
      >
        <div className="grid grid-rows-1 gap-5">
          <TeamCard
            teamName={parsedDoc1.teamName}
            teamScore={parsedDoc1.teamScore}
            teamTag={parsedDoc1.teamTag}
          />
          <TeamCard
            teamName={parsedDoc2.teamName}
            teamScore={parsedDoc2.teamScore}
            teamTag={parsedDoc2.teamTag}
          />
          <TeamCard
            teamName={parsedDoc3.teamName}
            teamScore={parsedDoc3.teamScore}
            teamTag={parsedDoc3.teamTag}
          />
          <TeamCard
            teamName={parsedDoc4.teamName}
            teamScore={parsedDoc4.teamScore}
            teamTag={parsedDoc4.teamTag}
          />
          <TeamCard
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

  const collectionRef4 = fb.firestore().collection('scores').doc('Arjay')
  const doc4 = await (await collectionRef4.get()).data()

  const collectionRef5 = fb.firestore().collection('scores').doc('Jia Yue')
  const doc5 = await (await collectionRef5.get()).data()

  const parsedDoc1 = JSON.parse(JSON.stringify(doc1))
  const parsedDoc2 = JSON.parse(JSON.stringify(doc2))
  const parsedDoc3 = JSON.parse(JSON.stringify(doc3))
  const parsedDoc4 = JSON.parse(JSON.stringify(doc4))
  const parsedDoc5 = JSON.parse(JSON.stringify(doc5))
  return { props: { parsedDoc1, parsedDoc2, parsedDoc3, parsedDoc4, parsedDoc5 } }
}
