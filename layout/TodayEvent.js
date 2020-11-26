import { useState, useEffect  } from 'react'
import {firebase} from '../lib/firebase-client'
import { formatDistanceToNowStrict, format, isAfter, isBefore } from 'date-fns'
import { es } from 'date-fns/locale'

const TodayEvent = (props) => {
  const {eventKey} = props
  const [event, setEvent] = useState(null)
  const [timeLeft, setTimeLeft] = useState(null)
  const [passed, setPassed] = useState(false)
  const [isNow, setIsNow] = useState(false)

  const dayName = () => {
    return format(new Date(Date.now()), "iiii", {locale: es})
  }
  useEffect(() => {
    const ref = firebase.database().ref(`/events/${eventKey}`)
    const listener = ref.on('value', snapshot => {
      setEvent(snapshot.val());
      return null
    });
    return () => ref.off('value', listener)
  }, [eventKey])

  useEffect(() => {
    let interval = setInterval(() => {
      if (!event) return
      const timeStart = event.start.split(":");
      const timeEnd = event.end.split(":");
      if (isAfter(new Date(Date.now()),new Date(new Date(Date.now()).getFullYear(), new Date(Date.now()).getMonth() , new Date(Date.now()).getDate(), timeStart[0], timeStart[1])) && isBefore(new Date(Date.now()),new Date(new Date(Date.now()).getFullYear(), new Date(Date.now()).getMonth() , new Date(Date.now()).getDate(), timeEnd[0], timeEnd[1]))){
        setIsNow(true)
        return
      }
      if (isAfter(new Date(Date.now()),new Date(new Date(Date.now()).getFullYear(), new Date(Date.now()).getMonth() , new Date(Date.now()).getDate(), timeEnd[0], timeEnd[1]))){
        setPassed(true)
        return
      }
      const tL = formatDistanceToNowStrict(
        new Date(new Date(Date.now()).getFullYear(), new Date(Date.now()).getMonth(), new Date(Date.now()).getDate(), timeStart[0], timeStart[1]),
        { addSuffix: true, includeSeconds: false, locale: es }
      )
      setTimeLeft(tL)
    }, 1000)

    return () => clearInterval(interval)
  }, [event])

  return (
    event && <div className="flex">
			<div className="flex block px-4 py-2 sm:px-4 sm:py-2 md:px-6 md:py-2 text-sm">
				<div className="flex-shrink-0 h-14 w-14 sm:h-14 sm:w-14 md:h-18 md:w-18">
					<img className="h-14 w-14 sm:h-14 sm:w-14 md:h-18 md:w-18 rounded-md sm:rounded-md md:rounded-lg w-full h-full object-cover" src={event.img} alt="" />
				</div>
				<div className="ml-4 w-32">
					<div className="text-sm leading-5 font-semibold text-gray-900">{event.title}</div>
					<div className="text-xs leading-5 font-medium text-gray-900">{dayName()}</div>
					{isNow && <div className={`text-green-500 font-semibold text-xs leading-5`}>Ahora</div>}
					{!isNow && <div className={`${passed ? 'text-red-600 font-semibold' : 'text-gray-400'} text-xs leading-5`}>{!passed ? (timeLeft && timeLeft) : 'Finalizado'}</div>}
				</div>
			</div>
		</div>
  )
}

export default TodayEvent