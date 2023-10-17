import networkx as nx
import matplotlib.pyplot as plt

categories = ['Fruits & Vegetables' ,'Dairy', 'Meat', 'Condiments & Spices', 'Snacks', 'Beverages', 'Cereal', 'Household & Cleaning Supplies'
]

def user_graph(sample):
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
  
  G = nx.Graph()
  for r in x:
    for i in range(len(categories)):
      for j in range(i+1,len(categories)):
        if r[i] > 0 and r[j] > 0:
              #add weight to the edge
          if G.has_edge(categories[i],categories[j]):
            G[categories[i]][categories[j]]['weight'] += 1
          else:
            G.add_edge(categories[i],categories[j], weight = 1)

  #display the graph with weights
  '''pos = nx.spring_layout(G)
  nx.draw(G, pos, with_labels = True)
  edge_labels = nx.get_edge_attributes(G,'weight')
  nx.draw_networkx_edge_labels(G,pos,edge_labels=edge_labels)
  plt.show()'''

  #print the graph
  '''print(G.edges(data=True))'''

  #return graph
  return (G.edges(data=True))

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

user_graph(sample)