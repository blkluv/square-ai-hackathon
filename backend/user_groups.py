import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import DBSCAN
from sklearn.preprocessing import StandardScaler
from sklearn.manifold import TSNE


categories = ['Fruits & Vegetables' ,'Dairy', 'Meat', 'Condiments & Spices', 'Snacks', 'Beverages', 'Cereal', 'Household & Cleaning Supplies'
]

def user_group(sample):
  x = []
  for i in range(len(sample)):
    temp = [0,0,0,0,0,0,0,0]
    for j in range(len(sample[i])):
      if sample[i][j] == []:
        pass
      if(sample[i][j][0] == "Fruits & Vegetables"):
          temp[0] += int(sample[i][j][1])
      elif(sample[i][j][0] == "Dairy"):
          temp[1] += int(sample[i][j][1])
      elif(sample[i][j][0] == "Meat"):
          temp[2] += int(sample[i][j][1])
      elif(sample[i][j][0] == "Condiments & Spices"):
          temp[3] += int(sample[i][j][1])
      elif(sample[i][j][0] == "Snacks"):
          temp[4] += int(sample[i][j][1])
      elif(sample[i][j][0] == "Beverages"):
          temp[5] += int(sample[i][j][1])
      elif(sample[i][j][0] == "Cereal"):
          temp[6] += int(sample[i][j][1])
      elif(sample[i][j][0] == "Household & Cleaning Supplies"):
          temp[7] += int(sample[i][j][1])
    x.append(temp)

  # Standardize the data (scaling) since DBSCAN is distance-based
  scaler = StandardScaler()
  x_scaled = scaler.fit_transform(x)

  # Cluster the x using DBSCAN
  model = DBSCAN(eps=0.5, min_samples=10) # IMPORTANT! - These parameters are very important and should be tuned
  clusters = model.fit_predict(x_scaled)

  # Apply t-SNE to the x_scaled to reduce the dimensions to 3
  tsne = TSNE(n_components=3, perplexity=len(x)-1)
  x_reduced = tsne.fit_transform(x_scaled)

  # Plot the clusters in 2D and label the points along with the row index
  '''plt.figure(figsize=(6, 8))
  plt.scatter(x_reduced[:,0], x_reduced[:,1], c=clusters, cmap='plasma')
  for i, txt in enumerate(x):
       plt.annotate(i, (x_reduced[i,0], x_reduced[i,1]))
  plt.show()'''

  #store coordinates of each point along with cluster it belongs to and also its row index
  points = []
  for i in range(len(x_reduced)):
    points.append([x_reduced[i][0], x_reduced[i][1], x_reduced[i][2], clusters[i]+1, i])

  # print(points)
  return points

sample = [
  [
    [
      "Fruits & Vegetables",
      "3"
    ]
  ],
  [
    [
      "Fruits & Vegetables",
      "3"
    ],
    [
      "Fruits & Vegetables",
      "3"
    ]
  ],
  [
    [
      "Meat",
      "1"
    ],
    [
      "Fruits & Vegetables",
      "1"
    ],
    [
      "Household & Cleaning Supplies",
      "2"
    ]
  ],
  [
    [
      "Meat",
      "1"
    ],
    [
      "Fruits & Vegetables",
      "1"
    ],
    [
      "Household & Cleaning Supplies",
      "2"
    ]
  ],
  [
     [
      "Fruits & Vegetables",
      "1"
    ],
    [
      "Household & Cleaning Supplies",
      "2"
    ]
  ]
]
