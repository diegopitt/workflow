import { useState, useEffect  } from 'react'
import {firebase} from '../lib/firebase-client'
import dynamic from 'next/dynamic'

const TodayEvent = dynamic(() => import('./TodayEvent'))

const TodayEvents = (props) => {
  const {uid, now} = props
  const [allEvents, setEvents] = useState(now)
  
  useEffect(() => {
    const ref = firebase.database().ref(`/eventsByUserByDay/${now}/${uid}`)
    const listener = ref.on('value', snapshot => {
      setEvents(snapshot.val())
      return null
    });
    return () => ref.off('value', listener)
  }, [uid])
  return (
    allEvents && 
    <div className="w-full mt-2">
      <div className="px-4 py-5 sm:px-6 pb-1">
        <h3 className="text-xl leading-6 font-semibold text-green-500 mt-1">
          Eventos para hoy
        </h3>
      </div>
      <div className="flex flex-wrap mt-2">
      { allEvents && Object.keys(allEvents).map(x => 
        <TodayEvent now={now} key={x} eventKey={x} />
      )}
      </div>
    </div>
  )
}

export default TodayEvents