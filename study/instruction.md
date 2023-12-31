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

# 22 August(Lecture - 2 (10:05))

1. We will refactor the findVendor code into one function. It will accept an id and email. If email exist then find vendor using email other id.
   ![utility function](image-8.png)
2. Create Vendor Login route inside the vendors instead of admin and create controller accordingly.
3. Create VendorLoginInput interface in vendor dto with email and password types
   ![interface](image-9.png)

# 23 August(Lecture - 2(20:00))

## Session 1

1. Inside the VendorLogin controller, Find user by email, If it null return Login credentials not valid.
2. Create utility function for comparing the password.
3. If user is not null, check if password is valid or not, if valid return user else return error message
   ![Vendor-login](image-8.png)
4. Add new routes and controller for profile.
5. To identify the user in each request we will be using jsonwebtoken.

## Session 2

1. Create new interface Vendor payload with these properties \_id, email, name, foodTypes.
   ![interface](image-9.png)
2. Create generateSignature utility which will return token
   ![signature](image-10.png)
3. While login if password is valid then generate the signature and insteading of returning the user details return the signature.
4. Create Auth.dto.ts and assign it to the vendor payload
   ![Auth Payload](image-11.png)

# 25 August(Lecture - 2 (25:46))

1. Create validateToken utility, in which fetch the Authorization from request.
2. If signature exist and split it on space and jwt.verify with app secret, assign payload to user and return true
3. else false.
   ![validate signature](image-12.png)

4. Create commonAuth middleware in middleware folder.
5. Inside that declare the namespace i.e assign user to AuthPayload
   ![interface](image-13.png)
6. Create Authenticate function, In which call our above validateToken and pass request. If valid then call next() else return not authorized.
   ![Authenticate](image-14.png)
7. Create GetVendorProfile controller, fetch user from request. if user is true then return the vendor. else return vendor not found.
   ![Get Vendor Profile](image-15.png)
8. Test it on postman

# 26 August(Lecture - 2(complete))

1. We can use router.use(Authenticate) now we dont' have to use router.post(path, middleware, controller)
2. Create interface EditVendorInputs, with name, address, phone, foodtypes
   ![EditVendorInput](image-16.png)
3. Now create updateVendorProfile. Extract the field we want to change find the vendor if it is not null update the fields and return the saved result.
   ![UpdateVendorProfile](image-17.png)
4. Create route for above controller like this router.patch('/profile')
5. Create updateVendorService, Similar code to above controller but update the service and return the saved result.

# 28 August(Lecture - 3 (5:00))

1. Create two routes in vendor food and foods and create addFood and getFood controller.
2. Create Food dto and createFoodInput interface
   ![Interface](image-18.png)
3. Create Food Modal, and uncomment the food line from Vendor Modal.
   ![Food-modal](image-19.png)
4. Create Food Schema and export it
   ![food-schema](image-20.png)

# 30 August(Lecture - 3 (10:00))

1. Modify the AddFood controller like this
   ![add-food](image-21.png)
2. When we create vendor pass the food option there.

# 5 September(Lecture - 3 (complete))

## Session - 1

1. Create GetFoods function in vendor controller and create get routes to foods path and test on postman.
   ![getfoods](image-22.png)

2. `npm i multer @types/multer`
3. import multer in vendor routes and configure the destination and filename.
   ![multer](image-23.png)

4. In addFood controller, extract files from req.files and extract out the images from files.
   ![Alt text](image-24.png)

5. In Index js configure the static directory called images
   ![Alt text](image-25.png)
6. Create UpdateVendorCoverImage controller,
   ![Alt text](image-26.png)

7. Just hook up the routes

## Session - 2(l-4(5))

1. Create ExpressApp.ts and Database.ts in services folder.  
   ![ExpressApp](image-27.png)
2. In similar way add refactor the code to Database.ts
   ![Database App](image-28.png)
3. In index.ts, Refactor the code also
   ![Index.ts](image-29.png)

# 6 September (Lecture - 4())

1. Create shooping route file and add in app.use
2. Create the following routes in shoppingRoutes files
   ![routes](image-30.png)
3. In getFoodAvalibilty controller inside the shoppingcontroller file,

- Grab pin code from params
- Find the vendor using pincode and serviceAvailable is true
- sort by rating and descending and populate foods
- If result length greater then zero return status code 200 with results else return 400 with no data found
![Alt text](image-31.png)

4. Create GetTopRestaurants controller
- Reuse the above code
- Just change the limit to 1 and rest is same.
![Alt text](image-32.png)

5. Create GetFoodIn30Mins controller, return all the food which has ready time less than or equal to 30 minutes
![Alt text](image-34.png)

6. Create SearchFood controller, return all the foods only
![Alt text](image-35.png)

7. Create RestaurantById controller, populate the food also
![Alt text](image-36.png)



# 7 September (Lecture - 5)

1. Create Customer route setup in index.js
2. Setup the routes like this signup, login, verify, otp, profile
![user-routes](image-37.png)
3. Create Customer Controller.
![controller](image-38.png)
4. Creat User dto file and install `class-validator class-transformer`
5. Check email @IsEmail from class validator, we don't need to add @IsEmpty to phone and password
![user-dto](image-39.png)
6. In tsconfig, make strictproperty initialization to false and make experimentalDecorators to true.
7. we have to use plainToClass from class-transformer in user controller to validate the customer inputs.
8. Validate the customerInput and store it in inputErrors and If inputErrors length greater than 0 return input errors.
![Alt text](image-40.png)
9. Create User Model, otp_expiry should be a date.
![User Model](image-41.png)
10. Create User Schema inside the model.
![UserSchema](image-42.png)
11. In UserSignUp, generate the salt, and password. Otp should be random number for time being and otp_expiry should be new Date(). Now create the User.
![UserSignUp](image-43.png)
12. Create NotificationUtility in utils
![Generate OTP](image-45.png)
![Explanation](image-44.png)


# 8 September (l-5)

1. Install twilio library and create account on twilio
2. Create onRequestOtp function in utils
![twilio](image-46.png)
3. In generateSignature use AuthPayload instead of VendorPayload
4. Create User payload in user dto
![User payload](image-47.png)
5. Modify Customer Signup
- Send otp to customer
- Generate token
- return 201 and signature and other details as response
![Alt text](image-48.png)

6. Here is updated notificationUtility
![generateOtp](image-49.png)


# 15 September
1. Add support for exisiting customer in Signup User throw error in response
![Alt text](image-50.png)
2. Add authenticate middleware before Customer Verify route.
![Alt text](image-51.png)
3. Extract out the otp and user, check if otp is equal to profile.otp and otp expiry is less than current date and time then only make verified to true and again generate signature and send it to response
![Alt text](image-52.png)
4. If user doesn't exist then send error
![Alt text](image-53.png)
5. Test the route and change expiry condition to >=