# -*- coding: utf-8 -*-
"""
Created on Wed April 17 2019

@author: Akram Azarm
"""

from Framework.EventData import EventData
from surprise import KNNBasic
import heapq
from collections import defaultdict
from operator import itemgetter
import surprise


def simpleUserCF():
    
    # Load our data set and compute the user similarity matrix
    event = EventData()
    data = event.loadEventData()
    
    trainSet = data.build_full_trainset()
    
    sim_options = {'name': 'cosine',
                   'user_based': True
                   }
    
    model = KNNBasic(sim_options=sim_options)
    model.fit(trainSet)
    
    surprise.dump.dump('models/userCf.pkl', predictions=None, algo=model, verbose=0)
    
    
def SampleTopNRecs(userID, model):
    simsMatrix = model.compute_similarities()
    
    event = EventData()
    data = event.loadEventData()
    
    trainSet = data.build_full_trainset()
    
    # Get top N similar users to our test subject
    # (Alternate approach would be to select users up to some similarity threshold - try it!)
    testUserInnerID = trainSet.to_inner_uid(userID)
    similarityRow = simsMatrix[testUserInnerID]
    
    similarUsers = []
    for innerID, score in enumerate(similarityRow):
        if (innerID != testUserInnerID):
            similarUsers.append( (innerID, score) )
    
    kNeighbors = heapq.nlargest(10, similarUsers, key=lambda t: t[1])
    
    # Get the stuff they rated, and add up ratings for each item, weighted by user similarity
    candidates = defaultdict(float)
    for similarUser in kNeighbors:
        innerID = similarUser[0]
        userSimilarityScore = similarUser[1]
        theirRatings = trainSet.ur[innerID]
        for rating in theirRatings:
            candidates[rating[0]] += (rating[1] / 5.0) * userSimilarityScore
        
    # Build a dictionary of stuff the user has already attended and rated
    attended_rated = {}
    for itemID, rating in trainSet.ur[testUserInnerID]:
        attended_rated[itemID] = 1
        
    # Get top-rated items from similar users:
    pos = 0
    recsEventIds = []
    for itemID, ratingSum in sorted(candidates.items(), key=itemgetter(1), reverse=True):
        if not itemID in attended_rated:
            eventID = trainSet.to_raw_iid(itemID)
            print(event.getEventTitle(int(eventID)), ratingSum)
            recsEventIds.append(int(eventID))
            pos += 1
            if (pos > 9):
                break
            
    return recsEventIds


