import { useState, useEffect  } from 'react'
import {firebase} from '../lib/firebase-client'
import moment from 'moment-timezone'

const TodayEvent = (props) => {
  const {data, today} = props
  const [tData, setTData] = useState({
    event: data,
    passed: (moment().isAfter(moment(data.end, 'HH:mm')) ? true : false),
    isNow: (moment().isAfter(moment(data.start, 'HH:mm')) && moment().isBefore(moment(data.end, 'HH:mm'))) ? true : false,
    timeLeft: (!moment().isAfter(moment(data.end, 'HH:mm')) && !(moment().isAfter(moment(data.start, 'HH:mm')) && moment().isBefore(moment(data.end, 'HH:mm')))) ? moment().locale('es').to(moment(data.start, 'HH:mm')) : null,
    dayName: moment().locale('es').day(today).format("dddd")
  })

  useEffect(() => {
    const ref = firebase.database().ref(`/events/${tData.event.key}`)
    const listener = ref.on('value', snapshot => {
      setTData({...tData, event:snapshot.val()})
      return null
    });
    let interval = setInterval(() => {
      setTData({...tData, 
        passed: (moment().isAfter(moment(tData.event.end, 'HH:mm')) ? true : false),
        isNow: (moment().isAfter(moment(tData.event.start, 'HH:mm')) && moment().isBefore(moment(tData.event.end, 'HH:mm'))) ? true : false,
        timeLeft: (!moment().isAfter(moment(tData.event.end, 'HH:mm')) && !(moment().isAfter(moment(tData.event.start, 'HH:mm')) && moment().isBefore(moment(tData.event.end, 'HH:mm')))) ? moment().locale('es').to(moment(tData.event.start, 'HH:mm')) : null,
      })
    }, 1000)
    return () => {
      clearInterval(interval),
      ref.off('value', listener)
    }
  }, [tData.event.key])

  return (
    <div className="flex">
			<div className="flex block px-3 py-2 sm:px-3 sm:py-2 md:px-6 md:py-2 text-sm">
				<div className="flex-shrink-0 h-14 w-14 sm:h-14 sm:w-14 md:h-18 md:w-18">
					<img className="h-14 w-14 sm:h-14 sm:w-14 md:h-18 md:w-18 rounded-xl w-full h-full object-cover" src={tData.event.img} alt="" />
				</div>
				<div className="text-gray-400 ml-4 md:mt-1">
					<p className="text-xs sm:text-xs sm:text-sm leading-5 font-semibold text-gray-900 w-22 sm:w-22 md:w-full truncate">{tData.event.title}</p>
					<div className="text-xs leading-5 font-medium text-gray-900 capitalize">{tData.dayName}</div>
          {tData.passed && <div className={`text-red-600 text-xs leading-5 w-22 sm:w-22 md:w-full truncate`}>Finalizado</div>}
          {tData.isNow && <p className={`text-green-500 font-semibold text-xs leading-5 w-22 sm:w-22 md:w-full truncate`}><span className="animate-pulse inline-flex h-2 w-2 rounded-full bg-green-500 opacity-100 mr-2"></span>Ahora</p>}
          {tData.timeLeft && <p className={`text-xs leading-5 w-22 sm:w-22 md:w-full truncate`}>{tData.timeLeft}</p>}
				</div>
			</div>
		</div>
  )
}

export default TodayEvent