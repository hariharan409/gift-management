import Entypo from "@expo/vector-icons/Entypo";


const HeaderMenu = () => {

    return(
        <Entypo name="dots-three-vertical" size={20} color="#000" style={{paddingRight: "10px",cursor: "pointer"}} onPress={() => setShowMenu(true)} />      
    )
}

export default HeaderMenu;