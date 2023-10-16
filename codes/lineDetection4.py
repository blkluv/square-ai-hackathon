import cv2

# Load an image from file
image = cv2.imread('image3.jpeg')

# Check if the image was loaded successfully
if image is None:
    print('Error: Unable to load image.')
else:
    # Convert the image to grayscale
    grayscale_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply thresholding to create a binary image
    _, binary_image = cv2.threshold(grayscale_image, 128, 255, cv2.THRESH_BINARY)

    # Display the original, grayscale, and binary images
    # cv2.imshow('Original Image', image)
    # cv2.imshow('Grayscale Image', grayscale_image)
    cv2.imshow('Binary Image', binary_image)

    # Save the binary image to a file
    cv2.imwrite('binary_image.jpg', binary_image)

    # Wait for a key press and then close all windows
    cv2.waitKey(0)
    cv2.destroyAllWindows()

img_75 = cv2.resize(binary_image, None, fx = 0.02, fy = 0.02)
img_75 = cv2.resize(img_75, None, fx = 50, fy = 50)

img_75 = cv2.resize(binary_image, None, fx = 0.02, fy = 0.02)
print(img_75)

resized_image = cv2.resize(img_75, (10, 10), interpolation=cv2.INTER_LINEAR)
print(resized_image)
cv2.imshow('Resized Image', resized_image)


    # Apply thresholding to create a binary image
_, binary_image = cv2.threshold(resized_image, 128, 255, cv2.THRESH_BINARY)
print(binary_image)