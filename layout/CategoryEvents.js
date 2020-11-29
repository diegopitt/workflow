import { useState, useEffect  } from 'react'
import {firebase} from '../lib/firebase-client'
import dynamic from 'next/dynamic'
import { getDay } from 'date-fns'

const CategoryEvents = (props) => {
  const {uid, CategoryId, phoneNumber} = props
  const now = getDay(new Date(Date.now()))
  const [events, setEvents] = useState({})
  const [catID, setCatID] = useState(CategoryId)
  const [catTitle, setCatTitle] = useState('')
  const Event = dynamic(() => import('./Event'))
  useEffect(() => {
    const ref = firebase.database().ref(`/categoryIndex/${catID}`)
    const listener = ref.on('value', snapshot => {
      setEvents(snapshot.val())
      console.log(snapshot.val())
      return null
    });
    return () => ref.off('value', listener)
  }, [catID])
  const changeCat = (cat, title) => {
    setCatID(cat)
    setCatTitle(title)
  }
  return (
    catID ? 
    <div className="w-full bg-gradient-to-r from-teal-400 to-blue-500">
      <div className="px-4 py-4">
        <button onClick={() => {changeCat(null)}} type="button" className={`bg-white inline-flex justify-center border border-gray-300 focus:outline-none hover:bg-gray-200 text-white font-light py-2 px-2 rounded-full`}>
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
          <span className="px-3 text-gray-400 font-normal">{catTitle}</span>
        </button>
      </div>
      <div className="flex flex-wrap">
      { events && Object.keys(events).map(x => <div key={x} className="w-full sm:w-1/2 md:w-1/3 mb-4"><Event todayEvents={props.todayEvents} isCategory={true} hideIsToday={false} now={now} uid={uid} eventKey={x} phoneNumber={phoneNumber} /></div>)}
      </div>
    </div>
    : 
    <div className="bg-gradient-to-r from-teal-400 to-blue-500">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-16 md:flex md:items-center md:justify-between">
        <h2 className="text-3xl text-gray-900 sm:text-4xl">
          <span className="block font-extrabold text-indigo-700">EVENTOS</span>
          <span className="block font-bold text-gray-300">TODOS LOS DIAS</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex">
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => {changeCat(100, 'YOGA')}} type="button" className={`bg-white inline-flex font-normal justify-center border border-gray-300 text-gray-400 focus:outline-none hover:bg-gray-200 text-white font-light py-2 px-2 rounded-full mb-2`}>
                <span className="px-2">YOGA</span>
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
              <button onClick={() => {changeCat(null, 'TAI CHI')}} type="button" className={`bg-white inline-flex font-normal justify-center border border-gray-300 text-gray-400 focus:outline-none hover:bg-gray-200 text-white font-light py-2 px-2 rounded-full mb-2`}>
                <span className="px-2">TAI CHI</span>
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
              <button onClick={() => {changeCat(101, 'NUTRICION')}} type="button" className={`bg-white inline-flex font-normal justify-center border border-gray-300 text-gray-400 focus:outline-none hover:bg-gray-200 text-white font-light py-2 px-2 rounded-full mb-2`}>
                <span className="px-2">NUTRICION</span>
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
              <button onClick={() => {changeCat(102, 'QI GONG')}} type="button" className={`bg-white inline-flex font-normal justify-center border border-gray-300 text-gray-400 focus:outline-none hover:bg-gray-200 text-white font-light py-2 px-2 rounded-full mb-2`}>
                <span className="px-2">QI GONG</span>
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryEvents