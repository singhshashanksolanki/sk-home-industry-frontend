import * as yup from "yup"

export const registration = yup.object(
    {

        name: yup.string().min(2).max(25).required("Please enter your Username"),
        email:yup.string().email().required("Please enter your E-mail"),
        password:yup.string().required("Please enter your Password"),
        number:yup.string().min(10).max(10).required("Please enter your Number. Ex: 9898989898"),
        confirm:yup.string().required().oneOf([yup.ref("password"),null],"Password must match")

    }
)

export const loginSchemaValidation = yup.object(
    {
        email:yup.string().email().required("Please enter your E-mail"),
        password:yup.string().required("Please enter your Password"),

    }
)

export const resetPasswordEmailSchemaValidation = yup.object(
    {
        email: yup.string().email().required("Please enter your E-mail"),
    }
)

export const resetPasswordSchemaValidation = yup.object(
    {
        password: yup.string().required("Please Enter Your New Password"),
        confirmPassword: yup.string().required().oneOf([yup.ref("password"), null], "Password must match"),
    }
)

export const checkoutAdressValidation = yup.object(
    {
        address:yup.string().min(5).required("Please enter your Shipping Adress"),
        postalCode:yup.string().min(2).required("please enter your Postalcode"),
        city:yup.string().min(2).required("Please enter your Shipping city"),
        country:yup.string().min(2).required("Please enter your Shipping country"),
    }
)


// const [address, setAddress] = useState(shippingAddress.address);
// const [city, setCity] = useState(shippingAddress.city);
// const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
// const [country, setCountry] = useState(shippingAddress.country);