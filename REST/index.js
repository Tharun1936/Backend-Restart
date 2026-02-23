const express = require("express")
const users = require("./MOCK_DATA.json")
const app = express()
const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

app.get("/users", (req,res) =>{
  const html = `
  <ul>
    ${users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join("")}
  </ul>
  `
  res.send(html)
})

app.get("/api/users", (req, res) => {
  res.json(users)
})


app.get("/api/users/:id", (req,res) =>{
  const id = req.params.id
  const user = users.find((user) =>user.id ===id )
  return res.json(user)
})


app.post("/api/users", (req,res) =>{
  const newUser = req.body
  users.push(newUser)
  res.status(201).json(newUser)
})

app 
  .route("/api/users/:id")
  .get((req,res) =>{
    const id = req.params.id
    const user = users.find((user) =>user.id ===id )
    return res.json(user)
    })
  .patch((req,res) =>{
    return res.json({status: "pending"})
  })
  .delete((req,res) =>{
    return res.json({status: "pending"})
  })