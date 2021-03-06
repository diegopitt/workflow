import { useState, useEffect  } from 'react'
import {firebase} from '../lib/firebase-client'
import moment from 'moment'
import dynamic from 'next/dynamic'

const Events = (props) => {
  const {today, uid, todayEvents, phoneNumber} = props
  const [allEvents, setAllEvents] = useState(todayEvents)
  const [day, setDay] = useState(today)
  let weekDays = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
  const changeDay = (dayOfWeek) => { setDay(dayOfWeek) }
  const Event = dynamic(() => import('./Event'))
  var days = [];
  for (let i = 0; i <= 6; i++) {
    days.push(moment(moment().startOf('week').format()).add(i, 'days').format());
  };

  useEffect(() => {
    const ref = firebase.database().ref(`active/${day}`)
    const listener = ref.on('value', snapshot => {
      snapshot.val() && setAllEvents(snapshot.val());
      return null
    });
    return () => ref.off('value', listener)
  }, [day])

  return (
    <div className="w-full">
      <div className="flex items-center justify-center py-6 md:py-8 px-4 sm:px-6 lg:px-8">
        <div>
          <div className="inline-flex border border-gray-300 rounded-full relative">
          {days.map((value, index) => (
            <button key={index} onClick={(e) => {e.preventDefault(); changeDay(moment(value).day())}} className={`${moment(value).day() === today ? 'bg-teal-400 text-white ' : 'bg-gray-100 '} focus:outline-none ${(moment(value).day() === today) ? 'hover:bg-teal-400' : 'hover:bg-gray-200'} font-light py-2 sm:py-2 md:py-3 px-4 sm:px-4 md:px-9 ${(index === 0) && 'rounded-l-full'} ${(index === 6) && 'rounded-r-full'}`}>
              {(moment(value).day() === day && (moment(value).day() !== today )) && <span className="animate-pulse absolute inline-flex h-1 w-1 sm:h-1 sm:w-1 md:h-1.5 md:w-1.5 rounded-full bg-teal-400 opacity-100 top-1"></span>}
              <span className="block text-xs sm:text-xs md:text-sm font-medium md:font-semibold">{weekDays[index]}</span>
              <span className={`${moment(value).day() === today ? 'font-semibold text-md' : 'text-xs '}`}>{moment(value).format('DD')}</span>
            </button>
          ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap min-h-screen">
      { allEvents && Object.values(allEvents).map(x => <div key={x.key} className="w-full sm:w-1/2 md:w-1/3 mb-4"><Event data={x} todayEvents={todayEvents} hideIsToday={false} today={today} uid={uid} phoneNumber={phoneNumber} /></div>)}
      { !allEvents && <div className="flex justify-center w-full mt-10 text-lg font-semibold text-gray-400">No hay eventos para esta fecha</div>}
      </div>
    </div>
  )
}

export default Events