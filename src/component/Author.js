import NavBar from "./NavBar";
import { UilGithub } from '@iconscout/react-unicons'
import { UilLinkedin } from '@iconscout/react-unicons'

const Author = () => {
    return (
        <div>
            <div className="resturant-menu-navbar">
                <NavBar />
            </div>
            <div className="author-container">
                <h1>ArushiGupta</h1>
               
                <p>{<UilLinkedin />}<a href="https://www.linkedin.com/in/arushi-gupta-773906204/" target="_blank"><b>LinkedIn</b></a></p>
            </div>
        </div >
    );
};

export default Author;
