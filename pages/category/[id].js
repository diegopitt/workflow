import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../layout/Layout'
import dynamic from 'next/dynamic'
const Category = (props) => {
  console.log(props)
  const router = useRouter()
  const { id } = router.query
  const [showModal, setShowModal] = useState(false)
  const Modal = dynamic(() => import('../../layout/Modal'))
  const CategoryEvents = dynamic(() => import('../../layout/CategoryEvents'))
  const Register = dynamic(() => import('../../layout/Register'))
  const toggleModal = () => setShowModal(!showModal)
  return (
    <Layout {...props} toggleModal={toggleModal}>
      <div className="bg-indigo-200">
        <CategoryEvents phoneNumber={props.phoneNumber} uid={props.uid} CategoryId={id} />
      </div>
      <Modal showModal={showModal}>
        <Register toggleModal={toggleModal}/>
      </Modal>
    </Layout>
  )
}

export default Category