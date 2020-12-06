import { useState, useEffect } from 'react'
import Layout from '../layout/Layout'
import dynamic from 'next/dynamic'
const MainHero = dynamic(() => import('../layout/MainHero'))
const Events = dynamic(() => import('../layout/Events'))
const TodayEvents = dynamic(() => import('../layout/TodayEvents'))
import { firebaseCloudMessaging } from '../lib/webPush'

const Index = (props) => {
  const {today} = props
  const [showModal, setShowModal] = useState(false)
  const Modal = dynamic(() => import('../layout/Modal'))
  const Register = dynamic(() => import('../layout/Register'))
  const CategoryEvents = dynamic(() => import('../layout/CategoryEvents'))
  const toggleModal = () => setShowModal(!showModal)
  useEffect(() => {
    if(props.uid){
      firebaseCloudMessaging.init(props.uid)
    }
  }, [props.uid])
  return (
    <Layout {...props} toggleModal={toggleModal}>
      {(!props.uid) && 
        <>
          <MainHero />
          <CategoryEvents today={today} uid={null} todayEvents={props.todayEvents} />
        </>
      }
      {(props.uid) && <TodayEvents todayUserEvents={props.todayUserEvents} uid={props.uid} today={today} />}
        <div>
          <div className="px-4 py-10 sm:px-6 pb-2">
            <h3 className="text-xl leading-6 font-bold text-gray-700 mt-0 sm:mt-0 md:mt-1">
              Calendario de eventos
            </h3>
          </div>
          <Events uid={props.uid} today={today} todayEvents={props.todayEvents} phoneNumber={props.phoneNumber} />
        </div>
        <Modal showModal={showModal}>
          <Register saveData={false} toggleModal={toggleModal}/>
        </Modal>
    </Layout>
  )
}
export default Index
