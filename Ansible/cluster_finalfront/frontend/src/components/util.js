import React, { memo } from "react"




export async function getBackend() {
    const res = await fetch("http://172.26.133.82:30003")
    if(res.status === 200) return "172.26.133.82:30003"
    else {
        const res = await fetch("http://172.26.132.238:30003")
        if(res.status === 200) return "172.26.132.238:30003"
        else {
            const res = await fetch("http://172.26.128.201:30003")
            if(res.status === 200) return "172.26.128.201:30003"
        }
    }
    return "localhost:5000"
}

//export const getBackend = React.memo(getBackend1)