const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models"); // from index.js in models and takes the dg
const verifySignUp = require("./middlewares/verifySignUp");
const Role = db.role;

const dbConfig = require("./config/db.config")

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
    .catch(err => {
      console.error("Connection error", err);
      process.exit();
    });


  function initial() {
    const val = Role.estimatedDocumentCount()
    .then((count)=>{
      if ( count === 0) {
        new Role({
          name: "user"
        }).save()
        .then(()=>console.log("added 'user' to roles collection"))
        .catch((err)=>console.log("error ", err))
          
  
        new Role({
          name: "moderator"
        }).save()
          .then(()=>console.log("added 'moderator' to roles collection"))
          .catch((err)=>console.log("error ", err))
  
        new Role({
          name: "admin"
        }).save()
        .then(()=>console.log("added 'admin' to roles collection"))
        .catch((err)=>console.log("error ", err))
      }
    })
    .catch((err)=>console.log(err));
   }




app.get("/", (req, res) => {
  res.json({ message: "Welcome to erp application." });
});

require('./routes/auth.routes')(app);

require('./routes/user.routes')(app);

const productRoutes = require('./routes/product.routes');
app.use("/api", productRoutes)

const categoryRoutes = require('./routes/category.routes');
app.use("/api", categoryRoutes);

const customerRoutes = require('./routes/customer.routes');
app.use('/api', customerRoutes);

const orderRoutes = require('./routes/order.routes');
app.use('/api', orderRoutes);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});