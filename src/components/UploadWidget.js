import {useEffect, useRef} from "react";

const UploadWidget = ({childToParent, id}) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "dqgo5axpw",
            uploadPreset: "skHomeIndustryUsers",
            maxFiles: 1

        }, (error, result) => { 
            if (!error && result && result.event === "success") { 
              console.log('Done! Here is the image info: ', result.info.secure_url);
              childToParent(result.info.secure_url);
            }
          })
    }, [])
    return(
        <>
            {/* <button onClick={() => widgetRef.current.open()} className="form-control mt-3">
                Upload Image
            </button> */}
            <i onClick={() => widgetRef.current.open()} className="uploadCamera fad fa-camera"></i>
        </>
    )
}

export default UploadWidget