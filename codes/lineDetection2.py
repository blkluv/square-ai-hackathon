import cv2

# Load the image
image = cv2.imread('image4.jpeg')

# Convert the image to grayscale
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Save the grayscale image
cv2.imwrite('grayscale_image.jpg', gray_image)

gray_image = cv2.imread('grayscale_image.jpg', cv2.IMREAD_GRAYSCALE)

# height, width = gray_image.shape
# flag = 0
# # Traverse the image array
# found = False
# x_coord, y_coord = None, None
# marked_image = gray_image.copy()

# # Traverse the image array
# for y in range(height):
#     for x in range(width):
#         # Get the grayscale intensity at the current pixel
#         pixel_value = gray_image[y, x]
        
#         if pixel_value < 100:
#             # Mark the pixel with a red circle
#             cv2.circle(marked_image, (x, y), 5, (0, 0, 255), -1)  # Red circle

# # Save the marked image
# cv2.imwrite('marked_image.jpg', marked_image)


# print(gray_image.shape)

# Create a blank white image
# image = np.ones((n, n), dtype=np.uint8) * 255
n,n2 = gray_image.shape
# Calculate the size of each grid cell
cell_size = n // 10

# Draw horizontal grid lines
for i in range(1, 10):
    y = i * cell_size
    cv2.line(image, (0, y), (n, y), (0, 0, 0), 1)

# Draw vertical grid lines
for i in range(1, 10):
    x = i * cell_size
    cv2.line(image, (x, 0), (x, n), (0, 0, 0), 1)

# Save or display the image
cv2.imwrite('grid_image.jpg', image)
cv2.imshow('Grid Image', image)
cv2.waitKey(0)
cv2.destroyAllWindows()
# In this code, we create a blank white image and then draw horizontal and vertical lines to create a 10x10 grid. You can adjust the n variable to specify the dimensions of the image. The grid lines are drawn in black, and the resulting image is saved as 'grid_image.jpg' and displayed for visualization.

# Make sure to adjust the value of n to your desired image size.





