import { useSelector } from "react-redux";

function Homepage() {
    const auth = useSelector(state => state.auth);

    return (
        <>
            {
                auth.isLoggedIn &&

                (
                    <div className="homepage-wrapper">
                        <div className="user-details">
                            <div className="username" >
                                User name- {auth.userData.name}
                            </div>
                            <div className="email" >
                                Email- {auth.userData.email}
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );

}

export default Homepage;
