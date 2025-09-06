import activeWin from "active-win";
const API_URL = "http://localhost:8000/update";
let last_app = null

setInterval(async()=>{
try {
    const win =await activeWin()
    if(win && win.owner.name !== last_app){
        last_app = win.owner.name
        await fetch(API_URL,{
             method: "POST",
        headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ activeApp: last_app }),
        })
         console.log("Updated:", last_app);
    }
} catch (error) {
    console.error("Error:", error.message);
}
},30000)