import { useState } from 'react'
import Layout from '../layout/Layout'
import dynamic from 'next/dynamic'
import { getDay } from 'date-fns'
const MainHero = dynamic(() => import('../layout/MainHero'))
const Events = dynamic(() => import('../layout/Events'))
const TodayEvents = dynamic(() => import('../layout/TodayEvents'))

const Index = (props) => {
  const [showModal, setShowModal] = useState(false)
  const now = getDay(new Date(Date.now()))
  const Modal = dynamic(() => import('../layout/Modal'))
  const Register = dynamic(() => import('../layout/Register'))
  const CategoryEvents = dynamic(() => import('../layout/CategoryEvents'))
  const toggleModal = () => setShowModal(!showModal)
  return (
    <Layout {...props} toggleModal={toggleModal}>
      {(!props.uid) && <MainHero/>}
      <CategoryEvents uid={props.uid} />
      {(props.uid && props.todayUserEvent) && <TodayEvents todayUserEvent={props.todayUserEvent} uid={props.uid} now={now} />}
        <div>
          <div className="px-4 py-10 sm:px-6 pb-2">
            <h3 className="text-xl leading-6 font-bold text-gray-800 mt-0 sm:mt-0 md:mt-1">
              Calendario de eventos
            </h3>
            {/* <p className="max-w-2xl text-sm leading-5 text-gray-400">
              Seleciona un dia para ver eventos disponibles
            </p> */}
          </div>
          <Events uid={props.uid} now={now} events={props.events} phoneNumber={props.phoneNumber} />
        </div>
        <Modal showModal={showModal}>
          <Register toggleModal={toggleModal}/>
        </Modal>
    </Layout>
  )
}
export default Index
