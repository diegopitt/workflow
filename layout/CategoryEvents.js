import { useState, useEffect  } from 'react'
import {firebase} from '../lib/firebase-client'
import dynamic from 'next/dynamic'
import { getDay } from 'date-fns'

const CategoryEvents = (props) => {
  const {uid, CategoryId, phoneNumber} = props
  const now = getDay(new Date(Date.now()))
  const [events, setEvents] = useState({})
  const [catID, setCatID] = useState(CategoryId)
  const Event = dynamic(() => import('./Event'))
  useEffect(() => {
    const ref = firebase.database().ref(`/categoryIndex/${catID}/4`)
    const listener = ref.on('value', snapshot => {
      setEvents(snapshot.val())
      console.log(snapshot.val())
      return null
    });
    return () => ref.off('value', listener)
  }, [catID])
  const changeCat = (cat) => {
    setCatID(cat)
  }
  return (
    catID ? 
    <div className="w-full bg-gradient-to-r from-teal-400 to-blue-500">
      <div className="px-4 py-4">
        <button onClick={() => {changeCat(null)}} type="button" className={`bg-white inline-flex justify-center border border-gray-300 focus:outline-none hover:bg-gray-200 text-white font-light py-2 px-2 rounded-full`}>
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
          <span className="px-3 text-gray-400 font-semibold">YOGA</span>
        </button>
      </div>
      <div className="flex flex-wrap">
      { events && Object.keys(events).map(x => <div key={x} className="w-full sm:w-1/2 md:w-1/3 mb-4"><Event isCategory={true} hideIsToday={true} now={now} uid={uid} eventKey={x} phoneNumber={phoneNumber} /></div>)}
      { !events && <div className="flex justify-center w-full mt-10 text-lg font-semibold text-gray-400">No hay eventos para esta fecha</div>}
      </div>
    </div>
    : 
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-400 to-blue-500">
      <div className="px-4 py-6 sm:px-0">
        <div className=" rounded-lg flex">
          <button onClick={() => {changeCat('cat2')}} type="button" className={`bg-white inline-flex font-normal justify-center border border-gray-300 text-gray-400 focus:outline-none hover:bg-gray-200 text-white font-light py-2 px-2 rounded-full`}>
            <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span className="mr-3">Buscar eventos</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CategoryEvents