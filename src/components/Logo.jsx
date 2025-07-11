import logo from "../assets/logo.png"

const Logo = ({width="100px"}) => {console.log({width});
    return (
        <div><img src={logo} style={{width}}></img></div>
    )
}
export default Logo