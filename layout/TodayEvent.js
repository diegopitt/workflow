import { useState, useEffect  } from 'react'
import {firebase} from '../lib/firebase-client'
import moment from 'moment-timezone'

const TodayEvent = (props) => {
  const {data, today} = props
  const [event, setEvent] = useState(data)
  const [timeLeft, setTimeLeft] = useState(null)
  const [passed, setPassed] = useState(false)
  const [isNow, setIsNow] = useState(false)
  const dayName = () => {
    return moment().locale('es').day(today).format("dddd")
  }
  useEffect(() => {
    const ref = firebase.database().ref(`/events/${event.key}`)
    const listener = ref.on('value', snapshot => {
      setEvent(snapshot.val());
      return null
    });
    return () => ref.off('value', listener)
  }, [event.key])

  useEffect(() => {
    let interval = setInterval(() => {
      if (!event) return
      if (moment().isAfter(moment(event.start, 'HH:mm')) && moment().isBefore(moment(event.end, 'HH:mm'))){
        setIsNow(true)
        return null
      }
      if (moment().isAfter(moment(event.end, 'HH:mm'))){
        setPassed(true)
        return null
      }
      const tL = moment().locale('es').to(moment(event.start, 'HH:mm'))
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
				<div className="ml-4 md:mt-1">
					<div className="text-sm leading-5 font-semibold text-gray-900">{event.title}</div>
					<div className="text-xs leading-5 font-medium text-gray-900 capitalize">{dayName()}</div>
					{isNow && <div className={`text-green-500 font-semibold text-xs leading-5`}>Ahora</div>}
					{!isNow && <div className={`${passed ? 'text-red-600 font-semibold' : 'text-gray-400'} text-xs leading-5`}>{!passed ? (timeLeft && timeLeft) : 'Finalizado'}</div>}
				</div>
			</div>
		</div>
  )
}

export default TodayEvent