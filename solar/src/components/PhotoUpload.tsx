'use client';

import { CldUploadButton } from 'next-cloudinary';
import React, { useState } from 'react';
import connectDB from '@/lib/dbConnect';
import mongoose from 'mongoose';

const PhotoUpload: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [publicId, setPublicId] = useState<string | null>(null);

  const handleUpload = async (result: any) => {
    setUploadedImage(result.info.secure_url);
    setPublicId(result.info.public_id);
    console.log(result.info.public_id);

    try {
      await connectDB();
      const db = mongoose.connection;
      const collection = db.collection('images');

      const imageData = {
        public_id: result.info.public_id,
        url: result.info.secure_url,
        uploadedBy: '1234567',
      };

      await collection.insertOne(imageData);
      console.log(imageData);
      console.log('Image data saved to the database');
    } catch (error) {
      console.error('Error saving image data to the database:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const db = await connectDB();
      const collection = db.collection('images');

      await collection.deleteOne({ url: uploadedImage });
      console.log('Image data deleted from the database');

      if (publicId) {
        const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy?public_id=${publicId}&api_key=${apiKey}&api_secret=${apiSecret}`;

        const response = await fetch(url, {
          method: 'DELETE'
        });

        if (response.ok) {
          console.log('Image deleted successfully');
        } else {
          const errorData = await response.json();
          console.error('Failed to delete image:', errorData);
        }
      }
    } catch (error) {
      console.error('Error deleting image data from the database:', error);
    }
  };

  return (
    <div>
      <h2>Upload a Photo</h2>
      <CldUploadButton
        uploadPreset="yhxysssa"
        onUpload={handleUpload}
      />
      {uploadedImage && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={uploadedImage} alt="Uploaded" width="300" height="250" crop="fill" />
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
