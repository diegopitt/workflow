import { useState, useEffect  } from 'react'
import {firebase} from '../lib/firebase-client'
import dynamic from 'next/dynamic'

const YourEvents = (props) => {
  const {uid, eventsbyuser, todayEvents, today} = props
  const [allEvents, setEvents] = useState(eventsbyuser)
  const Event = dynamic(() => import('./Event'))

  useEffect(() => {
    const ref = firebase.database().ref(`/eventsByUser/${uid}`)
    const listener = ref.on('value', snapshot => {
      setEvents(snapshot.val())
      return null
    });
    return () => ref.off('value', listener)
  }, [uid])
  
  return (
    <div className="w-full">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-xl leading-6 font-bold text-gray-800 mt-1">
          Eventos en los que participas
        </h3>
        <p className="max-w-2xl text-sm leading-5 text-gray-400">
          Recibiras notificaciones SMS para cada evento registrado
        </p>
      </div>
      <div className="flex flex-wrap min-h-screen">
      { allEvents && Object.keys(allEvents).map(x => <div key={x} className="w-full sm:w-1/2 md:w-1/3 mb-4"><Event isYourEvent={true} todayEvents={todayEvents} hideIsToday={false} today={today} uid={uid} eventKey={x} /></div>)}
      { !allEvents && <div className="flex justify-center w-full mt-10 text-lg font-semibold text-gray-400">No participas en ningun evento</div>}
      </div>
    </div>
  )
}

export default YourEvents