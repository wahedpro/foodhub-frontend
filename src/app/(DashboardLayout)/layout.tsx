
const DashboardLayout = ({admin, provider} :{admin : React.ReactNode, provider : React.ReactNode}) => {
  return (
    <div>
        {admin}
        {provider}
    </div>
  )
}

export default DashboardLayout;