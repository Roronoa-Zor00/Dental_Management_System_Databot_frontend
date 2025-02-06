import React ,{useState} from 'react';
import {StlViewer} from "react-stl-viewer";
import stlUrl from '../../images/modal.stl';



const Model = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  const style = {
  
    width: '100%',
    height: '100%',
}
  return (
    <div className='images-stl'>
    
        {selectedImage && 
      <div className="child"> <StlViewer
           style={style}
            orbitControls
            shadows
            url={URL.createObjectURL(selectedImage)}
        /></div>
}
      <div className="child">
     <div className='form-wrapper'>
      <input type="file" className="input" onChange={handleImageUpload} />
     </div>
    </div>
    </div>
    
  );
};

export default Model;

