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
9.
