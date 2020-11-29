import { useState, useEffect  } from 'react'
import {firebase} from '../lib/firebase-client'
import dynamic from 'next/dynamic'

const TodayEvent = dynamic(() => import('./TodayEvent'))

const TodayEvents = (props) => {
  const {uid, now, todayUserEvent} = props
  const [events, setEvents] = useState(todayUserEvent)
  
  useEffect(() => {
    const ref = firebase.database().ref(`/eventsByUserByDay/${now}/${uid}`)
    const listener = ref.on('value', snapshot => {
      setEvents(snapshot.val())
      return null
    });
    return () => ref.off('value', listener)
  }, [uid])
  return (
    events && 
    <div className="w-full">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-xl leading-6 font-bold text-green-500 mt-1">
          Tus eventos hoy
        </h3>
      </div>
      <div className="flex flex-wrap mt-2">
      { events && Object.keys(events).map(x => 
        <TodayEvent now={now} key={x} eventKey={x} />
      )}
      </div>
    </div>
  )
}

export default TodayEvents