import e from "express"

const express = async () => {
    const app = e()

    const PORT = 3001

    app.listen(PORT)

    console.log(`Auth backend running @ http://localhost:${PORT}`)
}

export default express
