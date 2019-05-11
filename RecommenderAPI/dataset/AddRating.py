import pandas as pd 
  
def addRate(userId,eventId,rating):
# Creating the first Dataframe using dictionary
    
  print("Line 6 says",type(userId))
  print("Line 7 says",type(eventId))
  print("Line 8 says",type(rating))
  if (isinstance(userId, str) or isinstance(eventId, str) or isinstance(rating, str)) and (userId !='' and eventId !='' and rating !=''): 
        df1 = pd.read_csv('./dataset/rating.csv')
        df3 = pd.read_csv('./dataset/rating-neuro.csv')
# Creating the Second Dataframe using dictionary 
        df2 = pd.DataFrame({"user-id":[userId], 
                    "event-id":[eventId],  
                    "rating":[rating]}) 
  
# for appending df2 at the end of df1 
        df = df1.append(df2, ignore_index = True) 
        dff = df3.append(df2, ignore_index = True)
# print the merged dataframe
  #print(df)

# converting to a csv file with index = false
        df.to_csv(r'./dataset/rating.csv', index = False) 
        dff.to_csv(r'./dataset/rating-neuro.csv', index = False)
        print("done")
  else: 
        print("Not Done")
  
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

  


   
    