import { RNS3 } from "react-native-aws3";

// const options = {
//   keyPrefix: "uploads/",
//   bucket: "your-bucket",
//   region: "us-east-1",
//   accessKey: "your-access-key",
//   secretKey: "your-secret-key",
//   successActionStatus: 201,
// };

export const upload = async (image) => {
  console.log("image :::", image);
  const file = {
    uri: image?.uri,
    name: image?.fileName,
    type: "image/png",
  };
  const options = {
    keyPrefix: "uploads/",
    bucket: "nest-dev-1",
    region: "ap-northeast-2",
    accessKey: "secretkey",
    secretKey: "secretkey",
    successActionStatus: 201,
  };
  return RNS3.put(file, options)
    .then((response) => {
      console.log("response :::", response);
      if (response.status !== 201) throw new Error("Failed to upload image to S3");
      else {
        console.log("Successfully uploaded image to s3. s3 bucket url: ", response.body.postResponse.location);
        // this.setState({
        //   url: response.body.postResponse.location
        // });
        return response.body.postResponse.location;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
