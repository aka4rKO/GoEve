import pandas as pd 
  
def addRate(userId,eventId,rating):
# Creating the first Dataframe using dictionary 
  isThere1 = False
  isThere2 = False
  isList = []
# Creating the first Dataframe using dictionary 
  df1 = pd.read_csv('./dataset/rating.csv')
  df3 = pd.read_csv('./dataset/rating-neuro.csv')
  
  for index, row in df3.iterrows(): 
      print(row['event-id'], row['user-id']) 
      if str(row['event-id']) == str(eventId) and str(row['user-id']) == str(userId):
          row['rating'] = rating
          isThere1 = True
          isList.insert(1,"updated")
  for index, row in df1.iterrows(): 
      print(row['event-id'], row['user-id']) 
      if str(row['event-id']) == str(eventId) and str(row['user-id']) == str(userId):
          row['rating'] = rating
          isThere2 = True
          isList.insert(0,"updated")
# Creating the Second Dataframe using dictionary 
        
  if isThere1 != True: 
     isList.insert(1,"added")        
     df2 = pd.DataFrame({"user-id":[userId], 
                          "event-id":[eventId],  
                          "rating":[rating]})  
     
     dff = df3.append(df2, ignore_index = True)
     dff.to_csv(r'./dataset/rating-neuro.csv', index = False)
  else:
     df3.to_csv(r'./dataset/rating-neuro.csv', index = False) 
     
  
  if isThere2 != True:
     df2 = pd.DataFrame({"user-id":[userId], 
                          "event-id":[eventId],  
                          "rating":[rating]}) 
     isList.insert(0,"added")
     df = df1.append(df2, ignore_index = True)
     df.to_csv(r'./dataset/rating.csv', index = False)
  else:
     df1.to_csv(r'./dataset/rating.csv', index = False)
  return tuple(isList)
    
def addManyRate(userIds,eventIds,ratings):
  # converting the string recieved by the json to a list by splitting 
  if isinstance(userIds, str) or isinstance(eventIds, str) or isinstance(ratings, str):
     userIds = userIds.replace('[','').replace(']','').split(',') 
     eventIds = eventIds.replace('[','').replace(']','').split(',') 
     ratings = ratings.replace('[','').replace(']','').split(',') 
     print(len(userIds))
  # Creating the first Dataframe using dictionary 
  df1 = pd.read_csv('./dataset/rating.csv')
  df3 = pd.read_csv('./dataset/rating-neuro.csv')
  # titles of the csv files
  col_titles = ('user-id', 'event-id','rating')
  
  # stores all data in away to convert to an 3*3 matrix
  data =[]
  
  # algo to fill the data list accordingly
  for i in range(0,len(userIds)):
      data.append(userIds[i])
      data.append(eventIds[i])
      data.append(ratings[i])
      
  # Reshaped data and convert to numpy array
  rdata = pd.np.array(data).reshape((len(data) // 3, 3)) 
  
  df2 =pd.DataFrame(rdata, columns=col_titles)
  
  # for appending df2 at the end of df1 
  df = df1.append(df2, ignore_index = True)
  dff = df3.append(df2, ignore_index = True)
  
  # print the merged dataframe
  print(df)

# converting to a csv file with index = false
  df.to_csv(r'./dataset/rating.csv', index = False)
  dff.to_csv(r'./dataset/rating-neuro.csv', index = False) 
  print("done")

  


   
    