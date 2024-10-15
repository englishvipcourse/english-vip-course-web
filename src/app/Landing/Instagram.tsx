import { InstagramEmbed } from "react-social-media-embed";

export default function Instagram(){
    return(
        <div className="flex justify-center mt-10 w-screen h-full">
         <InstagramEmbed url="https://www.instagram.com/englishvipcourse" width={"70%"} height={"100%"}/>
        </div>
    )
}