# -*- coding: utf-8 -*-
"""
Created on Sat May  4 04:57:09 2019

@author: Amjad and Akram
"""

from collections import defaultdict
import csv
from Framework.EventData import EventData

def SampleTopNRecs(catList):
    
    genres = getGenres()
    
    userGen = {}    
    for i in genres :
        rank =0
        for genre in catList:
            if genre in genres[i]:
                rank +=1
                userGen[str(i)] = rank
                
    recList = sorted(userGen.items(),key=lambda x: x[1], reverse=True)
    recs=[]
    for r in recList:
       recs.append(int(r[0]))
    print(recs[:10]) 
    return recs[:10]
    
# Returns the all the genres after converting them to integer bitfileds 
def getGenres():
    eventsPath = './dataset/event.csv'
    genres = defaultdict(list)
    
    with open(eventsPath, newline='', encoding='ISO-8859-1') as csvfile:
        eventReader = csv.reader(csvfile)
        next(eventReader)  #Skip header line
        for row in eventReader:
            eventID = int(row[0])
            genreList = row[2].split('|')
            genres[eventID] = genreList           
    
    return genres
  
