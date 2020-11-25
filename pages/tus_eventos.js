import Layout from '../layout/Layout'
import dynamic from 'next/dynamic'

const tusEventos = (props) => {
const YourEvents = dynamic(() => import('../layout/YourEvents'))

  return (
    <Layout {...props}>
        <YourEvents  {...props} />
    </Layout>
  )
}
export default tusEventos