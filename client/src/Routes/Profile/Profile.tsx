import FadeIn from "@/components/transitions/FadeIn"
import Layout from "./Layout"
import { Helmet } from "react-helmet"
const Profile = () => {
  return (
    <Layout>
      <Helmet>
        <title>Profile - PlantLY</title>
      </Helmet>
        <FadeIn>
            <div>
                Profile
            </div>
        </FadeIn>
    </Layout>
  )
}

export default Profile