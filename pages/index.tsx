import type { NextPage } from 'next'
import { Feed } from "../components/Feed"
import { Header } from '../components/Header'
import Modal from "../components/Modal"
import MobileHeader from "../components/MobileHeader"
const Home: NextPage = () => {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      < Header />
      {/* further change header mobile to be equal to the one on real instagram web mobile page */}
      <Feed />
      <Modal />
      <MobileHeader />
    </div>
  )
}

export default Home
