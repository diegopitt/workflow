import { useState, useEffect } from 'react'
import { firebase } from '../lib/firebase-client'
import { useUser } from '../lib/userContext'
import { Transition } from '@headlessui/react'
import dynamic from 'next/dynamic'

const Event = (props) => {
  const { saveFavorite, unFavorite, registerEvent, unRegisterEvent, eventWeekDays } = useUser()
  const { data, uid, phoneNumber, isFav, hideIsToday, isCategory, todayEvents, isYourEvent, today, catTitle } = props
  const [eventData, setEventData] = useState(data)
  const [showModal, setShowModal] = useState(false)
  const [hasRegistered, setHasRegistered] = useState(null)
  const [isFavorite, setIsFavorite] = useState(null)
  const [weekCopy, setWeekCopy] = useState(eventWeekDays(data.dayofweek))
  const [todayUserEvents, setTodayUserEvents] = useState(Object.keys(todayEvents))
  const [participants, setParticipants] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const Modal = dynamic(() => import('./Modal'))
  const Register = dynamic(() => import('./Register'))
  const toggleModal = () => setShowModal(!showModal)
  const register = (uid, eventKey, phoneNumber) => {
    registerEvent(uid, eventKey, data, phoneNumber)
    setIsOpen(false)
  }
  const unRegister = (uid, eventKey) => {
    unRegisterEvent(uid, eventKey)
    setIsOpen(false)
  }
  useEffect(() => {
    const ref1 = firebase.database().ref(`events/${data.key}`);
    const ref2 = firebase.database().ref(`eventsByUser/${uid}/${data.key}`);
    const ref3 = firebase.database().ref(`favotitesByUser/${uid}/${data.key}/key`);//fix this?
    const ref4 = firebase.database().ref(`/eventsByUserByDay/${today}/${uid}`);
    const ref5 = firebase.database().ref(`usersByEvent/${data.key}`);
    const listener1 = ref1.on('value', snapshot => {
      setEventData(snapshot.val());
      if (isYourEvent || isFav || isCategory){
        setWeekCopy(eventWeekDays(snapshot.child('dayofweek').val()))
      }
    });
    const listener2 = ref2.on('value', snapshot => {
      setHasRegistered(snapshot.val());
    });
    const listener3 = ref3.on('value', snapshot => {
      setIsFavorite(snapshot.val());
    });
    const listener4 = ref4.on('value', snapshot => {
      snapshot.val() && setTodayUserEvents(Object.keys(snapshot.val()))
    });
    const listener5 = ref5.on('value', snapshot => {
      setParticipants(snapshot.numChildren());
    });
    return () => {
      ref1.off('value', listener1)
      ref2.off('value', listener2)
      ref3.off('value', listener3)
      ref4.off('value', listener4)
      ref5.off('value', listener5)
    };
  }, [data.key]);

  return (
    eventData &&
    <div className="relative max-w-sm rounded overflow-hidden m-5 sm:m-5 md:m-4 lg:m-6">
      {uid &&
        <div className="absolute top-2 right-2 rounded-full">
          <svg onClick={() => isFavorite ? unFavorite(uid, eventData.key) : saveFavorite(uid, eventData.key, eventData)} strokeWidth="2" stroke="rgb(255, 255, 255)" fill={`${isFavorite ? 'rgb(255, 56, 92)' : 'rgba(0, 0, 0, 0.5)'}`} className="h-4 w-4 cursor-default" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="presentation" focusable="false"><path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path></svg>
        </div>}
      <img className="w-full rounded-md" src={eventData.img} alt={eventData.title} />
      <div className="px-2 py-4 bg-white">
        <div><span className="font-bold text-xl mb-2 mr-1">{eventData.title}</span>{(todayUserEvents.includes(eventData.key) && (!hideIsToday)) && <span className="inline-block bg-green-500 text-white ml-1 rounded-full px-2 py-0 text-xs font-semibold mr-2 mb-2">Hoy</span>}</div>
        <div className="font-medium text-xs mb-2 mt-2 text-gray-500">
          {(isYourEvent || isFav || isCategory) && <span className="">{weekCopy + ' '}</span>}
          <span className={`${(!isYourEvent && !isFav && !isCategory) && 'capitalize'}`}>de {eventData.start} a {eventData.end}</span>
        </div>
        <p className="text-gray-700 text-base">{eventData.desc}</p>
        <div className="font-medium text-xs mb-2 mt-2 text-gray-500">{participants} {participants === 1 ? 'Participante' : 'Participantes'}</div>
      </div>
      <div className="px-2 pb-2 relative bg-white">
        {!hasRegistered && <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none outline-none bg-teal-400 text-white text-xs font-medium py-1 px-3 rounded-full">Recordarme</button>}
        {hasRegistered && <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none outline-none bg-green-500 text-xs text-white py-1 px-3 rounded-full">Confirmado</button>}
        {isCategory && <span className="inline-block bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-gray-500 ml-2 lowercase">#{catTitle}</span>}
        <Transition show={isOpen} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" laveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
          {(ref) => (
            <div ref={ref} className={`${hasRegistered ? 'bg-white' : 'bg-white'} absolute -mt-19 left-0 mt-2 rounded-md shadow-lg`}>
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {!hasRegistered && <p onClick={() => !uid ? toggleModal() : register(uid, eventData.key, phoneNumber)} className="block cursor-pointer px-5 py-1 text-sm text-green-600 font-semibold" role="menuitem">Registrate</p>}
                {hasRegistered && <p onClick={() => unRegister(uid, eventData.key)} className="block cursor-pointer px-5 py-1 text-sm text-red-600 font-semibold" role="menuitem">Cancelar</p>}
              </div>
            </div>
          )}
        </Transition>
      </div>
      <Modal showModal={showModal}>
        <Register saveData={true} event={eventData} toggleModal={toggleModal} />
      </Modal>
    </div>
  )
}

export default Event