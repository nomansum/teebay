
import AppHeader from '../components/Header'

const MainLayout = ({children}) => {
  return (
    <div>
      <AppHeader />
      <div style={{ padding: '20px' }}>
        {children}
      </div>
    </div>
  )
}

export default MainLayout
