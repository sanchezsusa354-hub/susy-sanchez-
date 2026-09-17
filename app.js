import express from "express"
import "dotenv/config"
import routerProducto from "./routes/Producto.js"
const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use("/api/producto", routerProducto)



app.listen(PORT, ()=>{
    console.log("servidor corriendo")
})