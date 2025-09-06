import activeWin from "active-win";
import {getAppIconByPid} from '@lwtlab/node-mac-app-icon'
const API_URL = "https://background-app-tracker.onrender.com/update";
let last_app = null

setInterval(async()=>{
try {
    const win =await activeWin()
    if(win && win.owner.name !== last_app){
        last_app = win.owner.name
        let iconBase64 = null
        const pid = win.owner.processId;
        if(pid){
         try {
               const iconBuffer = await getAppIconByPid(pid);
            iconBase64 = iconBuffer.toString('base64');
            console.log(`Fetched icon for: ${last_app}`);
            console.log(iconBase64)
            
         } catch (error) {
            console.error("Error fetching icon:", error.message);
         }
        }
          const payload = {
        activeApp: last_app,
        icon: iconBase64
      };

        await fetch(API_URL,{
             method: "POST",
        headers: { "Content-Type": "application/json" },
         body: JSON.stringify(payload),
        })
         console.log("Updated:", last_app);
    }
} catch (error) {
    console.error("Error:", error.message);
}
},30000)