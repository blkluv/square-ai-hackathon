import cv2
import numpy as np

# Load the image (replace 'your_image.jpg' with your image file)
image = cv2.imread('image4.jpeg')

# Convert the image to grayscale
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Define the size of the grid (10x10) and cell width
grid_size = 10
cell_width = gray_image.shape[1] // grid_size
cell_height = gray_image.shape[0] // grid_size

# Create an empty 10x10 array to store the results
result_array = np.zeros((grid_size, grid_size), dtype=int)


for y in range(grid_size):
    for x in range(grid_size):
        # Define the coordinates of the current grid cell
        x_start = x * cell_width
        y_start = y * cell_height
        x_end = x_start + cell_width
        y_end = y_start + cell_height
        
        # Calculate the sum of pixel values in the current grid cell
        cell_sum = np.sum(gray_image[y_start:y_end, x_start:x_end])
        
        # Check if the sum is greater than 2 million
        if cell_sum > 1500000:
            result_array[y, x] = 1

# x_start = 3 * cell_width
# y_start = 3 * cell_height
# x_end = x_start + cell_width
# y_end = y_start + cell_height

# # Calculate the sum of pixel values in the current grid cell
# cell_sum = np.sum(gray_image[y_start:y_end, x_start:x_end])
# print(cell_sum)

print(result_array)