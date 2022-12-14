import {useDispatch} from "react-redux";
// local
import {getCafe} from "../../../middlewares/dbReq";
import CafeRedactor from "../../../components/Cafe/Redactor";
import {loginUser} from "../../../utils/user/userSlice";
import Layout from "../../../components/Layout";
import auth from "../../../middlewares/auth";
// mui
import Typography from "@mui/material/Typography";

const CafeUpdate = ({user, cafe}) => {
    const dispatch = useDispatch();
    if (user) dispatch(loginUser(user))

    return (
        <Layout>
            <Typography variant={"h4"}>Изменение кафе</Typography>
            <CafeRedactor cafe={cafe}/>
        </Layout>
    )
}

export async function getServerSideProps({req, res, params}) {
    await auth.run(req, res);
    const user = req.user || false
    const cafe = await getCafe(params.id)

    if (!cafe) return {redirect: {destination: '/404', permanent: false}};

    return { props: {user,  cafe} }
}

export default CafeUpdate