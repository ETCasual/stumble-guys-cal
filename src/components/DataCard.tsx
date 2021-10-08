import React, { useState } from 'react'
import Loader from 'react-loader-spinner'

export const DataCard: React.FC<Notion.Data> = ({ fullname, reciept, approval, wnid, uid }) => {
  const [approvalState, setApprovalState] = useState<boolean>(approval)
  const [loading, setLoading] = useState<boolean>(false)
  const [wnidState, setWnid] = useState<string>(wnid ? wnid : null)

  const onSubmit = async (): Promise<void> => {
    const response = await fetch(`/api/${uid}`)

    if (response.ok) {
      setLoading(false)
      const data = await response.json()
      setWnid(data.wnid)
      setApprovalState(true)
    } else {
      alert('There is something wrong, please contact developers')
    }
  }

  return (
    <div className="bg-black bg-opacity-80 flex items-center text-white font-questrial my-2">
      <div className="w-full mx-2 flex flex-col justify-center gap-2">
        <p className="text-4xl font-bold w-full text-center">
          {fullname} {wnidState ? ': ' : null}
          {wnidState}
        </p>
        <div className="flex mx-auto gap-2">
          <p
            className={`text-2xl self-center ${approvalState ? 'text-green-500' : 'text-red-400'}`}
          >
            Current Status: {approvalState ? 'Approved' : 'Not Approved'}
          </p>
          {!approvalState ? (
            <button
              disabled={loading}
              className="bg-green-600 hover:bg-green-400 transition px-5 py-3 rounded-lg text-xl font-montserrat disabled:bg-gray-700"
              onClick={() => {
                setLoading(true)
                onSubmit()
              }}
            >
              {loading ? (
                <Loader type="TailSpin" color="#00BFFF" height={25} width={25} />
              ) : (
                'Approve'
              )}
            </button>
          ) : null}
        </div>
      </div>
      {reciept == 'Free Registration' ? (
        <img
          src={
            'https://thumbs.dreamstime.com/b/vector-rubber-stamp-effect-free-registration-rubber-stamp-effect-free-registration-110345952.jpg'
          }
          alt="Free Registration"
          className="object-cover w-[300px] p-2"
        />
      ) : (
        <img src={reciept} className="object-cover w-[300px] p-2" alt={fullname} />
      )}
    </div>
  )
}
