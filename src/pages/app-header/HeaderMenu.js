import React,{ useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { View } from "react-native";
import {Divider, List, Menu} from "react-native-paper";
import { useTranslation } from "react-i18next";


const HeaderMenu = () => {
    const {i18n} = useTranslation();
    const [showMenu,setShowMenu] = useState(true);

    const MenuButton = () => <Entypo name="menu" size={40} color="#000" style={{paddingRight: "10px",cursor: "pointer"}} onPress={() => setShowMenu(true)} />;

    return(
        <View>
            <Menu visible={showMenu} onDismiss={() => setShowMenu(false)} anchor={<MenuButton />}>
                <View style={{width: "300px"}}>
                    <List.Accordion style={{margin: 0,padding: 0}} title={`Language (${i18n.language})`} left={props => <List.Icon {...props} icon="folder" />}>
                        <List.Item title="English" onPress={() => i18n.changeLanguage("en")} />
                        <Divider />
                        <List.Item title="中文（简体" onPress={() => i18n.changeLanguage("zh-CN")} />
                    </List.Accordion>
                    <Divider />
                    <Menu.Item title="Logout" />
                    <Divider />
                </View>
            </Menu>  
        </View>  
    )
}

export default HeaderMenu;