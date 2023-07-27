import { useEffect, useState, useRef } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, deleteObject, getDownloadURL } from "firebase/storage";
import Button from 'components/Button';
import styles from './ImageUploader.module.scss';
import classNames from 'classnames/bind';
import { UpLoadIcon, CloseIcon } from "components/ImageList";
import Image from "components/Image";

const cx = classNames.bind(styles);

const ImageUploader = (props) => {
    const { images } = props;
    // State to store uploaded file
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imagesUrl, setImagesUrl] = useState([]);

    const inputRef = useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
    
        // Tạo reference đến tệp hình ảnh trên Firebase
        const imageRef = ref(storage, `images/${file?.name}`);

        // Tải lên hình ảnh lên Firebase
        const uploadTask = uploadBytesResumable(imageRef, file);
    
        // Theo dõi tiến trình tải lên
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
        (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        
        switch (snapshot.state) {
            case 'paused':
            console.log('Upload is paused');
            break;
            case 'running':
            console.log('Upload is running');
            break;
        }
        }, 
        (error) => {
        // Handle unsuccessful uploads
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImagesUrl([...imagesUrl, downloadURL]);
            });
        }
        );
    };

    const handleDeleteImageUpload = (url) => {
        // Create a reference to the file to delete
        const desertRef = ref(storage, url);
        // Delete the file
        deleteObject(desertRef).then(() => {
            // File deleted successfully
            setImagesUrl(imagesUrl.filter(image => image !== url));
            console.log('File deleted successfully');
        }).catch((error) => {
            console.log('Error deleting')
        });
    }

    useEffect(() => { 
        images(imagesUrl); 
    }, [imagesUrl]);

    return (
        <div className={cx('image-uploader')}>
            <div className={cx('btn-upload-file')}>
                <input ref={inputRef} hidden type="file" accept="image/*" onChange={handleImageUpload} />
                <Button 
                    className={cx('btn-choose-image')}
                    type="button"
                    srcLeft={<UpLoadIcon />}
                    content="Choose image"
                    onClick={() => inputRef.current.click()}
                />

                {uploadProgress > 0 && imagesUrl.length !== 0 && <span>Upload Progress: {uploadProgress}%</span>}
            </div>
            <div className={cx('image-show')}>
                { imagesUrl?.map(url => (
                    <div key={url} className={cx('image-item')}>
                        { url && <>
                            <Image src={ url } alt="image-invalid" />
                            <Button 
                                onClick={() => handleDeleteImageUpload(url)}
                                type="button" 
                                comp="component"
                                className={cx('image-item__delete')} 
                                content={<CloseIcon />} 
                            /> 
                        </> }
                    </div>
                )) }
            </div>
        </div>
    );
}

export default ImageUploader;
