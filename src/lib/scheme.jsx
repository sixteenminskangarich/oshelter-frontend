import * as yup from "yup"

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const ShortStayScheme = yup.object().shape({
    checkIn: yup.string().required("check in date required"),
    checkOut: yup.string().required("check Out date required"),
    numberOfAdult: yup.number().min(0).max(30, "number of adults must not be more than 30").required("number of adults required"),
    numberOfChildren: yup.number().min(0).max(30).required("number of children required")
})

export const RentScheme = yup.object().shape({
    duration: yup.string().required("Duration required"),
    numberOfAdult: yup.number().min(0).max(30).required("number of adults required"),
    numberOfChildren: yup.number().min(0).max(30).required("number of children required")
})

export const BuyScheme = yup.object().shape({
    dateOfAppointment: yup.string().required("Date of appointment required"),
    timeOfAppointment: yup.string().required("Time of appointment required"),
})

export const BookTour = yup.object().shape({
    name: yup.string().required("First & late name required"),
    phone: yup.string().required("Mobile phone required"),
    email: yup.string().email().required("Email required"),
    message: yup.string().required("Message required")
})

export const AgentScheme = yup.object().shape({
    name: yup.string().required("First & late name required"),
    phone: yup.string().required("Phone number required"),
    email: yup.string().email().required("Email address required"),
    type: yup.string().required("Type required")
})

export const PropertyScheme = yup.object().shape({
    propertyTitle: yup.string().required("Property title is required"),
    propertyType: yup.string().required("Property type required"),
    baseProperty: yup.string().required("Base property is required"),
})

export const EventSpaceScheme = yup.object().shape({
    propertyTitle: yup.string().required("Property title is required"),
    propertyType: yup.string().required("Property type required"),
    baseProperty: yup.string().required("Base property is required")
})

export const PropertyDetailsScheme = yup.object().shape({
    location: yup.string().required("Property location is required"),
    longitude: yup.string().required("Longitude is required"),
    latitude: yup.string().required("Latitude location is required"),
    locationLock: yup.number().required("LocationLock is required"),
    gatedCommunity: yup.string().required("Gated community is required"),
    nearestLandmark: yup.string().required("Nearest landmark is required"),
    detailedDescription: yup.string().required("Detailed description is required"),
})

export const ProfileScheme = yup.object().shape({
    name: yup.string().required('Full Name is required'),
	email: yup.string().email('Invalid email address').required('Email is required'),
	gender: yup.string().required('Gender is required'),
	dob: yup.string().required('Date of Birth is required'),
	phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
	occupation: yup.string().required('Occupation is required'),
	address: yup.string().required('Address is required'),
	emergencyNumber: yup.string().required('Emergency Contact is required')
})

export const BankScheme = yup.object().shape({
    bankName: yup.string().required('Bank name is required'),
	bankAccount: yup.string().required('Bank account is required'),
	branch: yup.string().required('Branch is required'),
	swiftCode: yup.string().required('Swift Code is required'),
})

export const ChangePasswordScheme = yup.object().shape({
    currentPassword: yup.string().required('Current password is required'),
    password: yup.string().required('New password is required'),
})

export const BusinessScheme = yup.object().shape({
    business: yup.string().required('Business name is required'),
	registrationNumber: yup.string().required('Registration number is required'),
	city: yup.string().required('City is required'),
	location: yup.string().required('Location is required'),
	country: yup.string().required('Country is required'),
	region: yup.string().required('Region is required'),
	languageIds: yup.array().min(1, 'At least one language is required'),
	description: yup.string().required('Description is required'),
	expertiseIds: yup.array().min(1, 'At least one expertise is required'),
	yearsOfExperienceId: yup.string().required('Years of experience is required'),
})

export const ServiceScheme = yup.object().shape({
    title: yup.string().required('Title is required'),
	price: yup.number().required('Price is required'),
	description: yup.string().required('Description is required'),
	type_of_service_id: yup.string().required('Service Type is required')
})

export const RegisterScheme = yup.object().shape({
    name: yup.string().required('Name is required'),
	email: yup.string().email('Invalid email format').required('Email is required'),
	gender: yup.string().required('Gender is required'),
	password: yup.string().required('Password is required'),
	phone: yup.string().required('Phone number is required'),
	termsAndConditions: yup.bool().oneOf([true], 'You must accept the terms and conditions'),
})

export const PropertyDeveloperScheme = yup.object().shape({
    name: yup.string().required('Name is required'),
    registration: yup.string().required('Registration number is required'),
    mobile: yup.string().required('Mobile number is required'),
    address: yup.string().required('Address is required'),
    yearsOfExperience: yup.string().required('Years of experience is required'),
})

export const PropertyDeveloperPhotoScheme = yup.object().shape({
    development: yup.string().required('Type of development number is required'),
    photo: yup.mixed().required('Photo field is required')
    .test('fileFormat', 'Only Picures files are allowed', value => {
        if (value) {
        const supportedFormats = ['jpg', 'png', 'jpeg'];
        return supportedFormats.includes(value.name.split('.').pop());
        }
        return true;
    })
    .test('fileSize', 'File size must not be more than 3MB', 
    value => {
        if (value) {
        return value.size <= 3145728;
        }
        return true;
    }),
})

export const PropertyDeveloperDirector = yup.object().shape({
    directorName: yup.string().required('First director name is required'),
    directorMobile: yup.string().required('Phone number is required'),
    directorRole: yup.string().required('First director role is required'),
    directorEmail: yup.string().required('Email address is required'),
    directorAddress: yup.string().required('Director address is required'),

    secondDirectorName: yup.string().required('Second director name is required'),
    secondDirectorMobile: yup.string().required('Phone number is required'),
    secondDirectorRole: yup.string().required('Second director role is required'),
    secondDirectorEmail: yup.string().required('Email address is required'),
    secondDirectorAddress: yup.string().required('Director address is required'),
})

export const PropertyTypeScheme = yup.object().shape({
    type: yup.string().required('Property type is required'),
})

export const PropertyAgencyScheme = yup.object().shape({
    name: yup.string().required('Name is required'),
    registration: yup.string().required('Registration number is required'),
    mobile: yup.string().required('Mobile number is required'),
    address: yup.string().required('Address is required'),
    yearsOfExperience: yup.string().required('Years of experience is required'),
})

export const PropertyAgencyLogo = yup.object().shape({
    photo: yup.mixed().required('Photo field is required')
    .test('fileFormat', 'Only Picures files are allowed', value => {
        if (value) {
        const supportedFormats = ['jpg', 'png', 'jpeg'];
        return supportedFormats.includes(value.name.split('.').pop());
        }
        return true;
    })
    .test('fileSize', 'File size must not be more than 3MB', 
    value => {
        if (value) {
        return value.size <= 3145728;
        }
        return true;
    }),
})

export const PropertyOwnerScheme = yup.object().shape({
    name: yup.string().required('Name is required'),
    occupation: yup.string().required('Registration number is required'),
    mobile: yup.string().required('Mobile number is required'),
    address: yup.string().required('Address is required'),
    gps: yup.string().required('GPS is required'),
    emergency: yup.string().required('Emergency contact is required'),
})

export const PropertyAgentScheme = yup.object().shape({
    name: yup.string().required('Name is required'),
    license: yup.string().required('License number is required'),
    mobile: yup.string().required('Mobile number is required'),
    address: yup.string().required('Address is required'),
    gps: yup.string().required('GPS is required'),
    yearsOfExperience: yup.string().required('Years of experience is required'),
})

export const PropertyAgentDirectorScheme = yup.object().shape({
    directorName: yup.string().required('Director name is required'),
    directorMobile: yup.string().required('Phone number is required'),
    directorRole: yup.string().required('First director role is required'),
    directorEmail: yup.string().required('Email address is required'),
    directorAddress: yup.string().required('Director address is required')
})

export const BookEventSpaceScheme = yup.object().shape({
    dateOfAppointment: yup.string().required("Date of event is required"),
    startTime: yup.string().required("Start time of event is required"),
    endTime: yup.string().required("End time of event is required")
})