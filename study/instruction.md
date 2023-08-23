# 13 Aug

1. tsc --init (generating ts configuration file)
2. ![Alt text](./Screenshot%202023-08-13%20185339.png)
3. ![Alt text](image.png)

# 14 Aug (till 17:00)

1. In routes folder, add AdminRoute.ts, index.ts and VendorRoute.ts
2. Add this code in AdminRoute

```
import express from 'express';

const router = express.Router()

router.get('/', (req, res, next) => {
    res.json({message:'Hello from Admin'})
})

export {router as AdminRoute}
```

3. In index.ts(root), `app.use('/admin', AdminRoute)`
4. In AdminRoute, add this line `router.post('/vendor',CreateVendor)`. CreateVendor comes from the controllers.
5. In controller, create AdminController.ts and create CreateVendor, GetVendors and GetVendorById function
6. Create Vendor.dto.ts

```
export interface CreateVendorInput {
    name: string;
    ownerName: string;
    foodType: [string];
    pinCode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
}
```

7. Setup the bodyParser

```
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
```

8. `npm i mongoose @types/mongoose`

# 15 Aug(Till 22 Minutes)

1. Create Vendor.ts inside the models
2. Create interface like this

```
interface VendorDoc extends Document{
    name: string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    salt: string;
    serviceAvailable: boolean;
    coverImages: [string];
    rating: number;
    <!-- foods: any -->
}
```

3. Create VendorSchema like this

```
const vendorSchema = new Schema({
    name: {type: String, required:true};
    ownerName: {type: String, required:true};
    foodType:  {type: [String] };
    pincode: {type: String, required:true};
    address: {type: String, required:true};
    phone: {type: String, required:true};
    email: {type: String, required:true};
    password: {type: String, required:true};
    salt: {type: String, required:true};
    serviceAvailable: {type: Boolean };
    coverImages: {type: [String] };
    rating: {type: String, required:true};
    <!-- foods: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'food'
    }] -->
}, {
    timestamps: true
})

const Vendor = mongoose.model<VendorDoc>('vendor', VendorSchema)
export { Vendor }
```

4. Create the index.ts in config file and add mongouri there.

# 16 August(till 27:00)

1. In the root index.ts file add the mongo connection code

```
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(result => {
    console.log('database connected')
}).catch(err => console.log('err'+ err))
```

2. Modify our CreateVendor function like this
   ![Create vendor](image-2.png)

3. Payload example
   ![Payload example](image-1.png)

# 17 August(completed)

1. Check if vendor existed or not if existed return message accordingly.
   ![email exist](image-3.png)

2. Now we have to encrypt the password also. To do that we use npm i bcrypt @types/bcrypt
3. Create two utility functions GenerateSalt and GeneratePassword in PasswordUtility file.
   ![gen-salt](image-4.png)

4. Store the value in meaning full variable and update the values accordingly.
5. Now Inside the model delete the unnecassarily values like password and salt.
   ![remvoing-extra-fields](image-5.png)

# 21 August(Lecture - 2 (5:30))

1. Return all the vendors in the GetVendor controller
   ![GetVendors](image-6.png)
2. Now return the vendor by ID in getVendorByID controller.
   ![vendorById](image-7.png)

# 22 August(Lecture - 2 ())

1. We will refactor the findVendor code into one function. It will accept an id and email. If email exist then find vendor using email other id.
   ![utility function](image-8.png)
2. Create Vendor Login route inside the vendors instead of admin and create controller accordingly.
3. Create VendorLoginInput interface in vendor dto with email and password types
   ![interface](image-9.png)
