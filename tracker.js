import activeWin from "active-win";
import { getAppIconByPid } from '@lwtlab/node-mac-app-icon';

const API_URL = "https://background-app-tracker.onrender.com/update";
let last_app = null;
let last_switch_time =Date.now()


setInterval(async () => {
    try {
        const win = await activeWin();
        let currentApp = null;
        let iconBase64 = null;

        
        if (win) {
            currentApp = win.owner.name;
            const pid = win.owner.processId;
            
            
            if (pid) {
                try {
                    const iconBuffer = await getAppIconByPid(pid);
                    iconBase64 = iconBuffer.toString('base64');
                    console.log(`Fetched icon for: ${currentApp}`);
                } catch (error) {
                    console.error("Error fetching icon:", error.message);
                }
            }
            if(currentApp !== last_app){

            }
        } else {
           
            currentApp = "Offline";
            iconBase64 = null; 
        }

      
        if (currentApp !== last_app) {
            last_app = currentApp;
            last_switch_time= Date.now()

            const payload = {
                activeApp: last_app,
                icon: iconBase64,
                startTime: last_switch_time
            };

            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            console.log("Updated:", last_app);
        }

    } catch (error) {
        console.error("Error:", error.message);
    }
}, 30000);