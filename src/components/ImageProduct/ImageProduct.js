import React, { useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function ImageProduct({ src }) {
  // Use useEffect to update the src prop when products change
  useEffect(() => {
    // This will be executed whenever the 'src' prop or 'products' change
    // You can put any logic here to handle changes to the 'src' prop
    // In this example, we don't need to do anything as Avatar component will handle the changes
  }, [src]);

  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <Avatar alt="" src={src} />
    </Stack>
  );
}

export default ImageProduct;
