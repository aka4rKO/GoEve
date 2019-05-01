import pandas as pd 
  
def addRate(userId,eventId,rating):
# Creating the first Dataframe using dictionary 
df1 = pd.read_csv('rating.csv')
  
# Creating the Second Dataframe using dictionary 
df2 = pd.DataFrame({"user-id":[userId], 
                    "event-id":[eventId],  
                    "rating":[rating]}) 
  
# for appending df2 at the end of df1 
df = df1.append(df2, ignore_index = True) 

# print the merged dataframe
print(df)

# converting to a csv file with index = false
df.to_csv('rating.csv', index = False) 