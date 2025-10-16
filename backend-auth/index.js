import express from "./src/config/express"

const main = () => {
    try {
        express()
    } catch (e) {
        console.log("Error starting auth backend", e)
    }
}

main()
