import Layout from '../layout/Layout'
import dynamic from 'next/dynamic'

const favoritos = (props) => {
const Favorites = dynamic(() => import('../layout/Favorites'))

  return (
    <Layout {...props}>
        <Favorites  {...props} />
    </Layout>
  )
}
export default favoritos