import cv2
import numpy as np

# Load the image
image = cv2.imread('image2.jpeg')

# Convert the image to grayscale
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Apply Canny edge detection to find edges in the image
edges = cv2.Canny(gray, threshold1=50, threshold2=150, apertureSize=3)

# Use the Hough Line Transform to detect lines in the image
lines = cv2.HoughLinesP(edges, 1, np.pi / 180, threshold=100, minLineLength=200, maxLineGap=10)

if lines is not None:
    for line in lines:
        x1, y1, x2, y2 = line[0]
        cv2.line(image, (x1, y1), (x2, y2), (0, 0, 255), 2)  # Draw the detected lines
        print(f"Line coordinates: ({x1}, {y1}) - ({x2}, {y2})")

# Display the image with detected lines
cv2.imshow('Detected Lines', image)
cv2.waitKey(0)
cv2.destroyAllWindows()
